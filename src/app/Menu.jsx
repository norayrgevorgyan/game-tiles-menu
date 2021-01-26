import React, {useState, useEffect} from 'react';
import {Layout, Menu as AntMenu, Input, Checkbox, Divider, Badge, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";

import {
    setFilter,
    selectCategories,
    checkCategories,
    selectStatus,
    selectFavouritesCount
} from "../features/gamesList/gamesListSlice";
import {STATUS_SUCCEEDED} from "./consts";

const {Sider} = Layout;
const {SubMenu} = AntMenu;


const Menu = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const favouritesCount = useSelector(selectFavouritesCount);

    const Categories = () => {

        const categories = useSelector(selectCategories);
        const [checkedList, setCheckedList] = useState(categories);
        const [indeterminate, setIndeterminate] = useState(false);
        const [checkAll, setCheckAll] = useState(true);

        const onChange = list => {
            setCheckedList(list);
            setIndeterminate(!!list.length && list.length < categories.length);
            setCheckAll(list.length === categories.length);
        };

        const onCheckAllChange = e => {
            setCheckedList(e.target.checked ? categories : []);
            setIndeterminate(false);
            setCheckAll(e.target.checked);
        };

        useEffect(() => {
            dispatch(checkCategories(checkedList.length === categories.length ? ["All games"] : checkedList))
        }, [checkedList]);

        return (
            <div style={{margin: '4px', padding: "8px", background: 'white'}}>
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                </Checkbox>
                <Divider style={{margin: "12px 0"}}/>
                <Checkbox.Group options={categories} value={checkedList} onChange={onChange}/>
            </div>
        );
    };
    return (
        <Sider collapsible={false}>
            <AntMenu theme="dark" mode="inline">
                <div style={{padding: '8px', marginBottom: "4px"}}>
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
                <Space style={{height: '20px', padding: '8px', marginBottom: "4px"}}>
                    <span>Favourites</span> <Badge count={favouritesCount}/>
                </Space>
                <SubMenu title='Categories' disabled={status !== STATUS_SUCCEEDED}>
                    <Categories/>
                </SubMenu>
            </AntMenu>
        </Sider>
    )
};

export default Menu;
