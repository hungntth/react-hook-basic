import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};
TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('');

    function hanldValueChange(e) {
        console.log(e.target.value);
        setValue(e.target.value)
    }

    function hanldSumit(e) {
        e.preventDefault();
        if (!onSubmit) return;

        const formValues = {
            title: value,
        };
        onSubmit(formValues)
    }

    return (
        <form onSubmit={hanldSumit}>
            <input type="text" value={value} onChange={hanldValueChange} />
        </form>
    );
}

export default TodoForm;