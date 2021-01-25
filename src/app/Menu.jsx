import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu as AntMenu, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

const {Sider} = Layout;
const {Item, SubMenu} = AntMenu;
const {Search} = Input;


const Menu = () => {

    return (
        <Sider collapsible={false}>
            <AntMenu theme="dark" mode="inline">
                <div style={{padding: '8px'}}>
                    <Input
                        allowClear
                        placeholder='Search games...'
                        suffix={<SearchOutlined style={{
                            fontSize: 16,
                            color: '#1890ff',
                        }}/>}
                    />
                </div>
                <SubMenu title='Settings'>
                    <Item>
                        <span>submenu</span>
                    </Item>
                </SubMenu>
            </AntMenu>
        </Sider>
    )
};

export default Menu;
