import React from 'react';
import '../App.css';
type BirdProps = {
    birdFlightPos: number;
    birdStartPosition: number;
}

const Bird: React.FC<BirdProps> = ({ birdFlightPos, birdStartPosition }) => {
    return (
        <div
            className={"bird"}
            style={{
                position: 'absolute',
                top: 0 + birdFlightPos,
                left: birdStartPosition + 40,
            }}
        />
    )
};

export default Bird;
