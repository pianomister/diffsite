import { storage } from './storage';

const STATE = {
    fallbackLeftURL: './demo_left.html',
    fallbackRightURL: './demo_right.html',
    handleDrag: false
};

const SETTINGS_DEFAULT = {
    showAboveTheFoldLine: false,
    isIframeableAPI: 'https://iframe-proxy.glitch.me/is-iframeable/%s',
    isIframeableAPIEnabled: true
};

let SETTINGS = {};

export const state = (key, value) => {
    if (value !== undefined) STATE[key] = value;
    return STATE[key];
};

class Settings {

    constructor() {
        const storedSettings = storage.getJSON('settings');
        if (storedSettings) {
            SETTINGS = Object.assign({}, SETTINGS_DEFAULT, storedSettings);
        }
    }

    get(key) {
        return SETTINGS[key];
    }

    set(key, value) {
        SETTINGS[key] = value;
        storage.setJSON('settings', SETTINGS);
    }
}

export const settings = new Settings();