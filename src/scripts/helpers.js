import isURL from 'validator/lib/isURL';

/**
 * Generic debounce for events
 * 
 * @returns {function} method containing debounce code as requested 
 * @author http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 */
export function debounce(func, threshold, execAsap) {
    let timeout;

    return function debounced() {
        let obj = this, args = arguments;
        function delayed() {
            if (!execAsap)
                func.apply(obj, args);
            timeout = null;
        };

        if (timeout)
            clearTimeout(timeout);
        else if (execAsap)
            func.apply(obj, args);

        timeout = setTimeout(delayed, threshold || 100);
    };
};

/**
 * 
 * @param {string} name Name of the CSS variable to get or set the value for
 * @param {string} [value] Content to be set for CSS variable with given name. If left empty, this function returns the value for name.
 */
export const cssVar = function (name, value) {
    if (name[0] != '-') name = `--${name}`; //allow passing with or without --
    if (value !== undefined) document.documentElement.style.setProperty(name, value);
    return getComputedStyle(document.documentElement).getPropertyValue(name);
};

/**
 * Prepare a URL for use in iframe src attribute.
 * 
 * @param {string} url URL to check and prepare for iframe source
 * @author https://glitch.com/edit/#!/amp-visual-compare
 */
export function enhanceUrl(url) {
    if (!url) return url;
    if (url.indexOf('http') != 0) url = 'https://' + url;
    return url;
};

/**
 * Check if a given URL is considered valid.
 * 
 * @param {string} url URL to check for validity
 * @author https://glitch.com/edit/#!/amp-visual-compare
 */
export function isValidUrl(url) {
    return url.indexOf('localhost') != -1 || url.indexOf('http://localhost') === 0 || isURL(url);
}

/**
 * Extracts value from URL query parameter.
 * 
 * @param {string} name parameter name to extract value for
 * @param {string} url (optional) URL to extract parameters from
 * @author https://glitch.com/edit/#!/amp-visual-compare
 */
export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
  