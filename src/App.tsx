import { useEffect, useState, useRef } from 'react';
import './App.css';
import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";

const App = () => {
  const [birdFlight, setBirdFlightPosition] = useState(80);
  const [gameHeight, setGameHeight] = useState(0);
  const [gameWidth, setGameWidth] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [obstaclePosition, setObstaclePosition] = useState(0);
  const [obstacleOneHeight, setObstacleOneHeight] = useState(50);
  const birdInterval = useRef<any>(null);
  const obstaclesInterval = useRef<any>(null);
  const gameViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGameHeight(gameViewRef.current?.clientHeight || 0);
    setGameWidth(gameViewRef.current?.clientWidth || 0);
    setObstaclePosition(gameViewRef.current?.clientWidth || 0);
  }, []);

  useEffect(() => {
    birdInterval.current = setInterval(() => {
      setBirdFlightPosition((prevState) => prevState + 30);
    }, 300);
  }, []);

  useEffect(() => {
    obstaclesInterval.current = setInterval(() => {
      setObstaclePosition((prevState) => prevState - 80);
    }, 500);
  }, []);

  useEffect(() => {
    gameEnd && alert("gameEnd");
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
        setBirdFlightPosition((prevState) => prevState - 60);
      }
    })
  }, [])

  return (
    <div className={"container"}>
      <div
        className={"gameView"}
        ref={gameViewRef}>
        <Bird birdFlightPos={birdFlight} />
        <Obstacles obstaclePosition={obstaclePosition} obstacleHeight={obstacleOneHeight} />
      </div>
    </div>
  );
}

export default App;
