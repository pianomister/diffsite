import '../styles/index.scss';
import {debounce, enhanceUrl} from './helpers';
import {state, cssVar} from './state';




const $container = document.getElementById('diff-container');
const $left = document.getElementById('frame-left');
const $right = document.getElementById('frame-right');
const $contentLeft = document.getElementById('content-left');
const $contentRight = document.getElementById('content-right');
const $shiftLeft = document.getElementById('shift-left');
const $shiftRight = document.getElementById('shift-right');
const $swipeHandle = document.getElementById('compare-handle');
const $groupOverlay = document.getElementById('group-overlay');
const $groupOpacity = document.getElementById('group-opacity');



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
document.getElementById('input-url-left').addEventListener('input', (event) => {
    debounce(() => {
        event.target.value = enhanceUrl(event.target.value);
        $contentLeft.src = event.target.value;
    }, 700)();
});

document.getElementById('input-url-right').addEventListener('input', (event) => {
    debounce(() => {
        event.target.value = enhanceUrl(event.target.value);
        $contentRight.src = event.target.value;
    }, 700)();
});


document.getElementById('mode-side-by-side').addEventListener('click', () => {
    $container.classList.remove('diff-container--mode-overlay');
    $groupOverlay.classList.add('disabled');
    $groupOpacity.classList.add('disabled');
});

document.getElementById('mode-overlay').addEventListener('click', () => {
    $container.classList.add('diff-container--mode-overlay');
    $groupOverlay.classList.remove('disabled');
    if (!$container.classList.contains('diff-container--mode-swipe')) {
        $groupOpacity.classList.remove('disabled');
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

document.getElementById('select-device').addEventListener('change', (event) => {
    cssVar('diff-site-width', event.target.value);
});

document.getElementById('select-opacity').addEventListener('input', (event) => {
    cssVar('diff-site-opacity-right', event.target.value);
});


// SHIFT BUTTONS
const updateShiftValue = function($target, cssVarKey) {
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

document.getElementById('shift-left').addEventListener('input', () => {
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

document.getElementById('shift-right').addEventListener('input', () => {
    cssVar('diff-site-shift-right', parseInt($shiftRight.value) || 0);
});