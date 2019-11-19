import isURL from 'validator/lib/isURL';
import { settings } from './state';

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
 * Checks if a page can be embedded into an iframe.
 * 
 * @param {string} url URL that will be checked for headers that disallow embedding in iframes
 * @returns {Object} object with atribute 'isIframeable' true if page is iframeable, false if not, and null if it can not be determined. Attribute 'status' informs about type of errors.
 */
export async function canEmbedInIframe(url) {
    try {
        const checkURL = settings.get('isIframeableAPI').replace('%s', encodeURIComponent(url));
        const response = await fetch(checkURL);
        console.log('canEmbed response', response);
        const data = await response.json();
        return data && typeof data.isIframeable !== 'undefined' ? data : {
            status: 0,
            isIframeable: null
        };
    } catch (error) {
        return {
            status: 0,
            isIframeable: null
        };
    }
}

/**
 * Returns a proxy URL for a given url that is not iframeable.
 * 
 * @param {string} url The URL to built the proxy call for
 */
export function getProxyURL(url) {
    return settings.get('iframeProxyAPI').replace('%s', encodeURIComponent(url));
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
