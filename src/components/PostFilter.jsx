import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange = {e => setFilter({...filter, query: e.target.value})}
                placeholder={"Search.."}/>

            <MySelect
                value={filter.sort}
                onChange={e => setFilter({...filter, sort: e})}
                defaultValue={"Sort by"}
                options={[
                    {value:'title',name:"title"},
                    {value:'body',name:"description"}
                ]}
                disabledTitle = "Sorting"
            />
        </div>
    );
};

export default PostFilter;