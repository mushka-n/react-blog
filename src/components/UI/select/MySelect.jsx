import React from 'react';

const MySelect = ({options, defaultValue, value, onChange, disabledTitle}) => {
    return (
        <select
            value = {value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{disabledTitle}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {defaultValue} {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;