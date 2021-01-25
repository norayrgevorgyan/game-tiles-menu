import React from "react";
import {Image} from "antd";
import srcImage from './imgs/large/aquarium.jpg'

const GameTile = ({image, top}) => {
    const src = '.' + (top ? image.large : image.small)
    console.log(src)
    return (
        <Image src='./imgs/large/aquarium.jpg'/>
    )
};

export default GameTile;