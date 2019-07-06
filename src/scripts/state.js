const STATE = {
    overlay: false,
    mode: null,
    handleDrag: false
};

export const cssVar = function (name, value) {
    if (name[0] != '-') name = `--${name}`; //allow passing with or without --
    if (value !== undefined) document.documentElement.style.setProperty(name, value);
    return getComputedStyle(document.documentElement).getPropertyValue(name);
};

export const state = (key, value) => {
    if (value !== undefined) STATE[key] = value;
    return STATE[key];
};
