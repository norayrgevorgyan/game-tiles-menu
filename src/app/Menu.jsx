import React, {useContext, useState, useEffect} from 'react';
import {Layout, Menu as AntMenu, Input, Checkbox, Divider} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";

import {setFilter, selectCategories, checkCategories} from "../features/gamesList/gamesListSlice";

const {Sider} = Layout;
const {SubMenu} = AntMenu;


const Menu = () => {
    const dispatch = useDispatch();

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
            dispatch(checkCategories(checkedList.length === categories.length ? ["All Games"] : checkedList))
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
                <div style={{padding: '8px'}}>
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
                <SubMenu title='Categories'>
                    <Categories/>
                </SubMenu>
            </AntMenu>
        </Sider>
    )
};

export default Menu;
