import React from 'react';
import '../App.css';
type BirdProps = {
    birdFlightPos: number;
}

const Bird: React.FC<BirdProps> = ({ birdFlightPos }) => {
    return (
        <div
            className={"bird"}
            style={{
                position: 'absolute',
                top: 0 + birdFlightPos,
                left: 500,
            }}
        />
    )
};

export default Bird;
