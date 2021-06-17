import React from 'react'

type GameEndViewProps = {
    score: number;
}
const GameEndView: React.FC<GameEndViewProps> = ({ score }) => {

    return (
        <div style={{
            position: 'absolute',
            top: "50%",
            zIndex: 1
        }}>
            <h2>Thank you for playing.... Your score is {score}<br /> Press Enter to restart</h2>
        </div>
    )
}

export default GameEndView;
