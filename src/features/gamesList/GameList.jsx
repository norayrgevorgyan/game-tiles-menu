import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchGamesList, selectActiveGames, selectStatus} from "./gamesListSlice";
import {Col, Row, Spin} from "antd";
import GameTile from "./components/GameTyle";
import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED} from "../../app/consts";

const GameList = () => {

    const selectedGames = useSelector(selectActiveGames);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === STATUS_IDLE) {
            dispatch(fetchGamesList())
        }
    }, [status, dispatch]);

    return (
        <Row gutter={6} justify='center'>
            {status === STATUS_LOADING ?
                <Col>
                    <Spin size='large' tip='Loading...'/>
                </Col> :
                status === STATUS_SUCCEEDED ?
                    <>
                        <Col span={12}>
                            <Row gutter={[3, 3]} justify='center'>
                                {selectedGames.filter(({top}) => top).map(game =>
                                    <GameTile {...game} key={game.id}/>)}
                            </Row>
                        </Col>
                        < Col span={12}>
                            < Row gutter={[3, 3]} justify='center'>
                                {selectedGames.filter(({top}) => !top).map(game =>
                                    <GameTile {...game} key={game.id}/>)}
                            </Row>
                        </Col>
                    </>
                    : <div>Some Error on data loading</div>}
        </Row>
    )
};

export default GameList;
