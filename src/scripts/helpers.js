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
 * Prepare a URL for use in iframe src attribute.
 * 
 * @param {string} url URL to check and prepare for iframe source
 * @author https://glitch.com/edit/#!/amp-visual-compare
 */
export function enhanceUrl(url) {
    if (!url) return url;
    if (url.indexOf('http') != 0) url = 'https://' + url;
    if (url.indexOf('https') != 0) url = url.replace('http://', 'https://');
    return url;
};

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
  