import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Checkbox, Divider} from "antd";

import {checkCategories, selectCategories} from '../../features/gamesList/gamesListSlice';
import {ALL_GAMES} from '../../consts';

const CategorieCheckBoxes = () => {

    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    const [checkedList, setCheckedList] = useState(categories);
    const checkAll = useMemo(() => checkedList.length === categories.length, [checkedList, categories.length]);
    const indeterminate = useMemo(() => !!checkedList.length && checkedList.length < categories.length, [checkedList, categories.length]);

    const onChange = list => {
        setCheckedList(list);
    };

    useEffect(() => {
        dispatch(checkCategories(checkedList.length === categories.length ? [ALL_GAMES] : checkedList))
    }, [checkedList, dispatch, categories.length]);

    return (
        <div className="checkBoxes-wrapper">
            <Checkbox indeterminate={indeterminate} onChange={(e) => onChange(e.target.checked ? categories : [])}
                      checked={checkAll}>
                Check all
            </Checkbox>
            <Divider className="divider"/>
            <Checkbox.Group options={categories} value={checkedList} onChange={onChange}/>
        </div>
    );
};

export default CategorieCheckBoxes;