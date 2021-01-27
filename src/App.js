import React from 'react';
import {Layout} from "antd";

import GameList from "./features/gamesList/GameList";
import Menu from "./app/menu/Menu";

import './App.css';

const { Content} = Layout;

function App() {
    return (
        <div className="App">
            <Layout className='Layout'>
                <Menu/>
                <Layout>
                    <Content>
                        <GameList/>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
