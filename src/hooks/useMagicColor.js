import React, { useEffect, useRef, useState } from 'react';

function randomColor(currentColor) {
    const COLOR_LIST = ['red', 'green', 'yellow', 'blue', 'black'];

    const currentIndex = COLOR_LIST.indexOf(currentColor);
    let newIndex = currentIndex;

    while (currentIndex === newIndex) {
        newIndex = Math.trunc(Math.random() * 3)
    }

    const randomIndex = Math.trunc(Math.random() * 3);
    return COLOR_LIST[randomIndex];
}

function useMagicColor() {
    const [color, setColor] = useState('transparent');
    const colorRef = useRef('transparent');


    useEffect(() => {
        const colorInterval = setInterval(() => {
            const newColor = randomColor();
            setColor(newColor);

            colorRef.current = newColor;
        }, 1000);

        return () => {
            clearInterval(colorInterval);
        }
    }, [])

    return color;
}

export default useMagicColor;