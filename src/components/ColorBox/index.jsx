import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

ColorBox.propTypes = {

};

function getRandomColor() {
    const COLOR_LIST = ['red', 'blue', 'green'];
    const randomIndex = Math.trunc(Math.random() * 3);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {
    const initColor = localStorage.getItem('box_color') || 'deeppink';
    const [color, setColor] = useState(initColor);

    function handleBoxClick() {
        const newColor = getRandomColor();
        setColor(newColor);
    }
    return (
        <div
            className='color-box'
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >
            <br />
        </div>
    );
}

export default ColorBox;