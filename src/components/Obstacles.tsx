import React from 'react'

type ObstaclesProps = {
    obstaclePosition: number;
    obstacleHeight: number;
}
const Obstacles: React.FC<ObstaclesProps> = ({ obstaclePosition, obstacleHeight }) => {
    return (
        <>
            <div
                className={"obstacle"}
                style={{
                    height: `${obstacleHeight}%`,
                    top: 0,
                    left: obstaclePosition
                }}
            />
            <div
                className={"obstacle"}
                style={{
                    height: `${100 - obstacleHeight}%`,
                    width: 80,
                    top: 100,
                    left: obstaclePosition
                }}
            />
        </>
    )
}

export default Obstacles;
