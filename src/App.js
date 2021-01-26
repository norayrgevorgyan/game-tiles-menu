import React from 'react';
import {Layout} from "antd";

import GameList from "./features/gamesList/GameList";
import Menu from "./app/Menu";

import './App.css';

function App() {
    return (
        <div className="App">
            <Layout style={{minHeight: '100vh'}}>
                <Menu/>
                <Layout>
                    <Layout.Content>
                        <GameList/>
                    </Layout.Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
