import React from "react";
import {Col, Tooltip} from "antd";
import {useDispatch} from "react-redux";
import {changeFavouriteStatus} from "../../gamesList/gamesListSlice";

import placeholderLarge from '../../../assets/placeholder/large/placeholder.jpg'
import placeholderSmall from '../../../assets/placeholder/small/placeholder.jpg'
import favouriteActive from '../../../assets/icons/icon-favorites-active.svg'
import favouriteNoActive from '../../../assets/icons/icon-favorites-noactive.svg'

import '../../../assets/styles/_gameTile.css'

const GameTile = ({img, top, name, favourite, id}) => {

    const dispatch = useDispatch();
    const path = (top ? img.large : img.small);
    const favouriteImgSrc = (favourite ? favouriteActive : favouriteNoActive);
    const tooltipTitle = favourite ? "Remove from favourite" : "Add to favourite";
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
            <img src={imageSrc} alt={name}/>
            {showName && <div className={`image-label ${top ? 'image-label-lg' : 'image-label-sm'}`}>{name}</div>}
            <Tooltip title={tooltipTitle} color='red'>
                <img className='favourite-image' src={favouriteImgSrc} alt='favourite' onClick={() => dispatch(changeFavouriteStatus(id))}/>
            </Tooltip>
        </Col>
    )
};

export default GameTile;
