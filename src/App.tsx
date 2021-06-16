import { useEffect, useState, useRef } from 'react';
import './App.css';
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";
import GameEndView from './components/GameEndView';
const App = () => {
  const [birdFlight, setBirdFlightPosition] = useState(80);
  const [gameHeight, setGameHeight] = useState(0);
  const [gameWidth, setGameWidth] = useState(0);
  const [birdStartPosition, setBirdStartPosition] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(0);
  const [obstacleOneHeight, setObstacleOneHeight] = useState(50);
  const [gameStart, setGameStart] = useState(true);
  const birdInterval = useRef<any>(null);
  const obstaclesInterval = useRef<any>(null);
  const gameViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInitialValue();
  }, []);

  const setInitialValue = () => {
    setGameHeight(gameViewRef.current?.clientHeight || 0);
    setGameWidth(gameViewRef.current?.clientWidth || 0);
    setObstaclePosition(gameViewRef.current?.clientWidth || 0);
    setBirdStartPosition(gameViewRef.current?.offsetLeft || 0)
  }
  useEffect(() => {
    if (gameStart) {
      birdInterval.current = setInterval(() => {
        setBirdFlightPosition((prevState) => prevState + 30);
      }, 300);
    }
  }, [gameStart]);

  useEffect(() => {
    const topObstacleHeight = (gameHeight * obstacleOneHeight) / 100;
    const bottomObstacleHeight = (gameHeight * (100 - obstacleOneHeight)) / 100;

    if (birdFlight < topObstacleHeight && obstaclePosition < 140 && obstaclePosition !== 0) {
      clearInterval(birdInterval.current);
      clearInterval(obstaclesInterval.current);
      setGameEnd(true);
      setGameStart(false);
    }
    if ((700 - birdFlight) < bottomObstacleHeight && obstaclePosition < 140 && obstaclePosition !== 0) {
      clearInterval(birdInterval.current);
      clearInterval(obstaclesInterval.current);
      setGameEnd(true);
      setGameStart(false);
    }
  }, [obstaclePosition, birdFlight, gameHeight, obstacleOneHeight]);

  useEffect(() => {
    if (gameStart) {
      obstaclesInterval.current = setInterval(() => {
        setObstaclePosition((prevState) => prevState - 80);
      }, 500);
    }
  }, [gameStart]);

  useEffect(() => {
    gameEnd && setGameEnd(true);
  }, [gameEnd]);

  useEffect(() => {
    if ((birdFlight > gameHeight) && gameHeight !== 0) {
      setGameEnd(true);
      clearInterval(birdInterval.current);
      clearInterval(obstaclesInterval.current);
    }
  }, [birdFlight, gameHeight])

  useEffect(() => {
    if (obstaclePosition < 0 && gameWidth !== 0) {
      setObstacleOneHeight(Math.floor(Math.random() * (70 - 30 + 1) + 30))
      setObstaclePosition(gameWidth);
    }
  }, [obstaclePosition, gameWidth]);

  useEffect(() => {
    window.onkeypress = ((e) => {
      if (e.key === ' ') {
        !gameEnd && setBirdFlightPosition((prevState) => prevState - 60);
      }
      console.log(e.key);
      if (e.key === 'Enter') {
        setGameStart(true);
        setGameEnd(false);
        setInitialValue();
      }
    })
  }, [gameEnd])

  return (
    <div className={"container"}>
      {
        gameEnd &&
        <GameEndView />
      }
      <div
        className={"gameView"}
        ref={gameViewRef}>
        <Bird birdFlightPos={birdFlight} birdStartPosition={birdStartPosition} />
        <Obstacles obstaclePosition={obstaclePosition} obstacleHeight={obstacleOneHeight} />
      </div>
    </div>
  );
}

export default App;
