import React from "react";
import {Col} from "antd";

import placeholderLarge from '../../../assets/placeholder/large/placeholder.jpg'
import placeholderSmall from '../../../assets/placeholder/small/placeholder.jpg'

import '../../../assets/styles/_gameTile.css'

const GameTile = ({img, top, name}) => {
    const path = (top ? img.large : img.small);
    let imageSrc;
    let showName = false;
    try {
        imageSrc = require(`../../../assets${path}`).default;
    } catch (e) {
        imageSrc = top ? placeholderLarge : placeholderSmall;
        showName = true;
    }
    return (
        <Col className='image-wrapper'>
            <img src={imageSrc}/>
            {showName && <div className='image-label'>{name}</div>}
        </Col>
    )
};

export default GameTile;