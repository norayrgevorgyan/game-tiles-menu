import React from 'react';
import {Layout, Menu as AntMenu, Input, Badge, Space} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {SearchOutlined} from '@ant-design/icons';

import {
    setFilter,
    selectStatus,
    selectFavouritesCount
} from '../../features/gamesList/gamesListSlice';

import {STATUS_SUCCEEDED} from '../../consts';
import CategorieCheckBoxes from "./CategorieCheckBoxes";

import '../../assets/styles/_menu.css';

const {Sider} = Layout;
const {SubMenu} = AntMenu;


const Menu = () => {

    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const favouritesCount = useSelector(selectFavouritesCount);


    return (
        <Sider collapsible={false}>
            <AntMenu theme="dark" mode="inline">
                <div className='menu-item-wrapper'>
                    <Input
                        onChange={(e) => dispatch(setFilter(e.target.value.toLowerCase()))}
                        allowClear
                        placeholder='Search games...'
                        suffix={<SearchOutlined style={{
                            fontSize: 16,
                            color: '#1890ff',
                        }}/>}
                    />
                </div>
                <div className='menu-item-wrapper'>
                    <Space className='space'>
                        <span>Favourites</span> <Badge count={favouritesCount}/>
                    </Space>
                </div>
                <SubMenu title='Categories' disabled={status !== STATUS_SUCCEEDED}>
                    <CategorieCheckBoxes/>
                </SubMenu>
            </AntMenu>
        </Sider>
    )
};

export default Menu;
