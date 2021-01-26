import React from 'react';
import './App.css';
import GameList from "./features/gamesList/GameList";
import {Layout} from "antd";
import Menu from "./app/Menu";

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
