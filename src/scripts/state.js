const STATE = {
    fallbackLeftURL: './demo_left.html',
    fallbackRightURL: './demo_right.html',
    handleDrag: false
};

const SETTINGS = {
    aboveTheFoldLine: false
};

export const state = (key, value) => {
    if (value !== undefined) STATE[key] = value;
    return STATE[key];
};

