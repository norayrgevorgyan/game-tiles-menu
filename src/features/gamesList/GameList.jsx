import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchGamesList, selectActiveGames, selectStatus} from "./gamesListSlice";
import {Col, Row} from "antd";
import GameTile from "./components/GameTyle";

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
        <Row gutter={6}>
            <Col span={12}>
                <Row gutter={[3, 3]} justify='center'>
                    {selectedGames.filter(({top}) => top).map(game =>
                        <GameTile {...game} key={game.id}/>)}
                </Row>
            </Col>
            <Col span={12}>
                <Row gutter={[3, 3]} justify='center'>
                    {selectedGames.filter(({top}) => !top).map(game =>
                        <GameTile {...game} key={game.id}/>)}
                </Row>
            </Col>
        </Row>
    )
};

export default GameList;