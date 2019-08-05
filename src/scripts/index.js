import '../styles/index.scss';

import { DEVICES } from './constants';
import { debounce, isValidUrl, enhanceUrl, getParameterByName } from './helpers';
import { state, cssVar } from './state';
import * as Sticky from 'sticky-js';
import { getAlternativeURL } from './amp-canonical-detector';

// REFERENCES
const $container = document.getElementById('diff-container');
const $inputLeft = document.getElementById('input-url-left');
const $inputRight = document.getElementById('input-url-right');
const $ampDetectButton = document.getElementById('mode-amp-detect');
const $selectDevice = document.getElementById('select-device');
const $left = document.getElementById('frame-left');
const $right = document.getElementById('frame-right');
const $contentLeft = document.getElementById('content-left');
const $contentRight = document.getElementById('content-right');
const $shiftLeft = document.getElementById('shift-left');
const $shiftRight = document.getElementById('shift-right');
const $swipeHandle = document.getElementById('compare-handle');
const $groupOverlay = document.getElementById('group-overlay');
const $groupOpacity = document.getElementById('group-opacity');

// STICKY
const stickyShift = new Sticky('.shift-section', {
    wrap: true,
    marginTop: 200
});
const stickyConfig = new Sticky('.config-section', {
    wrap: true,
    marginTop: 0,
    stickyClass: 'config-section--sticky'
});

/**
 * Swipe handle
 * Inspired by: https://glitch.com/~amp-visual-compare
 */
function setSwipeMode(active) {
    active = active || false;
    if (active) {
        const handleStartPosition = parseInt(cssVar('diff-site-width')) / 2;
        cssVar('swipe-handle-position', handleStartPosition);
    }
}
$swipeHandle.addEventListener('mousedown', swipeHandleDown);

function swipeHandleDown(e) {
    e.preventDefault();
    state('handleDrag', true);
    window.addEventListener('mousemove', swipeHandleMove);
    window.addEventListener('mouseup', swipeHandleUp);
}

function swipeHandleUp() {
    state('handleDrag', false);
    window.removeEventListener('mousemove', swipeHandleMove);
    window.removeEventListener('mouseup', swipeHandleUp);
}

function swipeHandleMove(e) {
    if (!state('handleDrag')) return false;
    e = e || window.event;
    var rect = $left.getBoundingClientRect();
    var x = (e.pageX - rect.left) - window.pageXOffset;
    // respect bounds
    x = Math.max(0, x);
    x = Math.min(cssVar('diff-site-width'), x);
    // adapt positioning
    cssVar('swipe-handle-position', x);
}


// URL INPUTS
const setShareableURL = function () {
    const url1 = encodeURIComponent($inputLeft.value);
    const url2 = encodeURIComponent($inputRight.value);
    window.history.pushState(
        {},
        document.title,
        `${location.protocol}//${location.host}${location.pathname}?url1=${url1}&url2=${url2}`
    );
};

$inputLeft.addEventListener('input', (event) => {
    debounce(() => {
        let url = event.target.value;
        url = enhanceUrl(url);
        if (isValidUrl(url)) {
            event.target.value = url;
            $contentLeft.src = url;
            setShareableURL();
        }
    }, 700)();
});

$inputRight.addEventListener('input', (event) => {
    debounce(() => {
        let url = event.target.value;
        url = enhanceUrl(url);
        if (isValidUrl(url)) {
            event.target.value = url;
            $contentRight.src = url;
            setShareableURL();
        }
    }, 700)();
});

// AMP DETECTION
$ampDetectButton.addEventListener('click', function () {
    var checkAmp = this.classList.toggle('mode-switch--amp');
    if (checkAmp && (isValidUrl($inputLeft.value) || isValidUrl($inputRight.value))) {

        const value = isValidUrl($inputLeft.value) ? $inputLeft.value : $inputRight.value;
        const target = isValidUrl($inputLeft.value) ? $inputRight : $inputLeft;

        getAlternativeURL(value, 'amp-html')
            .then(url => {
                target.value = url;
                target.dispatchEvent(new Event('input'));
                this.classList.remove('mode-switch--amp');
            })
            .catch(error => {
                return getAlternativeURL(value, 'canonical');
            })
            .then(url => {
                target.value = url;
                target.dispatchEvent(new Event('input'));
                this.classList.remove('mode-switch--amp');
            })
            .catch(error => {
                this.classList.remove('mode-switch--amp');
                alert('AMP or canonical pendant was not found.');
            });
    }
});

// DARK MODE
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
});

// CONFIG TOGGLES
document.getElementById('mode-side-by-side').addEventListener('click', () => {
    $container.classList.remove('diff-container--mode-overlay');
    $groupOverlay.classList.add('disabled');
    $groupOpacity.classList.add('disabled');
    stickyConfig.update();
});

document.getElementById('mode-overlay').addEventListener('click', () => {
    $container.classList.add('diff-container--mode-overlay');
    $groupOverlay.classList.remove('disabled');
    if (!$container.classList.contains('diff-container--mode-swipe')) {
        $groupOpacity.classList.remove('disabled');
        stickyConfig.update();
    }
});

document.getElementById('mode-swipe').addEventListener('click', () => {
    $container.classList.add('diff-container--mode-swipe');
    $right.classList.remove('diff-frame--mode-blend');
    $groupOpacity.classList.add('disabled');
});

document.getElementById('mode-blend').addEventListener('click', () => {
    $right.classList.add('diff-frame--mode-blend');
    $container.classList.remove('diff-container--mode-swipe');
    $groupOpacity.classList.remove('disabled');
});

document.getElementById('mode-onion').addEventListener('click', () => {
    $right.classList.remove('diff-frame--mode-blend');
    $container.classList.remove('diff-container--mode-swipe');
    $groupOpacity.classList.remove('disabled');
});

// DEVICE SELECT DROPDOWN
$selectDevice.options.length = 0;
while ($selectDevice.firstChild) {
    $selectDevice.removeChild($selectDevice.firstChild);
}

for (let i = 0; i < DEVICES.length; i++) {
    $selectDevice.options[$selectDevice.options.length] = new Option(
        DEVICES[i].name,
        i,
        DEVICES[i].name === 'iPhone 6/7/8',
        DEVICES[i].name === 'iPhone 6/7/8'
    );
}

$selectDevice.addEventListener('change', (event) => {
    const index = event.target.value;
    cssVar('diff-site-width', DEVICES[index].width);
    cssVar('diff-site-device-height', DEVICES[index].height);
    stickyConfig.update();
});

document.getElementById('select-opacity').addEventListener('input', (event) => {
    cssVar('diff-site-opacity-right', event.target.value);
});

// SHIFT BUTTONS
const updateShiftValue = function ($target, cssVarKey) {
    $target.value = cssVar(cssVarKey);
};

document.getElementById('button-shift-up-left').addEventListener('click', () => {
    cssVar('diff-site-shift-left', parseInt(cssVar('diff-site-shift-left'), 10) - 1);
    updateShiftValue($shiftLeft, 'diff-site-shift-left');
});

document.getElementById('button-shift-down-left').addEventListener('click', () => {
    cssVar('diff-site-shift-left', parseInt(cssVar('diff-site-shift-left'), 10) + 1);
    updateShiftValue($shiftLeft, 'diff-site-shift-left');
});

$shiftLeft.addEventListener('input', () => {
    cssVar('diff-site-shift-left', parseInt($shiftLeft.value) || 0);
});

document.getElementById('button-shift-up-right').addEventListener('click', () => {
    cssVar('diff-site-shift-right', parseInt(cssVar('diff-site-shift-right'), 10) - 1);
    updateShiftValue($shiftRight, 'diff-site-shift-right');
});

document.getElementById('button-shift-down-right').addEventListener('click', () => {
    cssVar('diff-site-shift-right', parseInt(cssVar('diff-site-shift-right'), 10) + 1);
    updateShiftValue($shiftRight, 'diff-site-shift-right');
});

$shiftRight.addEventListener('input', () => {
    cssVar('diff-site-shift-right', parseInt($shiftRight.value) || 0);
});

// update URLs on site load
const url1 = getParameterByName('url1');
const url2 = getParameterByName('url2');
if (url1) $inputLeft.value = url1;
if (url2) $inputRight.value = url2;

// auto-detect AMP/canonical with getamp parameter
const getAmp = getParameterByName('getamp');
if (getAmp) $ampDetectButton.click();

$inputLeft.dispatchEvent(new Event('input'));
$inputRight.dispatchEvent(new Event('input'));