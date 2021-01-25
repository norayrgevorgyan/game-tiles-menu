import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchGamesList, selectActiveGames, selectStatus} from "./gamesListSlice";
import {Col, Row} from "antd";
import GameTile from "../../assets/GameTyle";

const GameList = () => {

    const selectedGames = useSelector(selectActiveGames);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGamesList())
        }
    }, [status, dispatch]);

    console.log(selectedGames, status)
    return (
        <Row gutter={[2, 2]}>
            <Col span={12}>
                {selectedGames.filter(({top}) => top).map(game =>
                    <GameTile image={game.img} top={game.top} key={game.id}/>)}
            </Col>
            <Col span={12}>
                {selectedGames.filter(({top}) => !top).map(game =>
                    <div>{game.name}</div>)}
            </Col>
        </Row>
    )
};

export default GameList;