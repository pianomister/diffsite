/**
 * ALL CREDITS FOR THIS FILE GO TO antoinebr
 * https://github.com/Antoinebr/compare-amp
 */

import isURL from 'validator/lib/isURL';

/**
 * @name corsFree
 * @description return a HTML page content by bypassing CORS
 * @param {string|url} sourceURL the URL to 'descorsify"
 * @returns {promise|erorr} will return a promise or error 
 */

const corsFree = function (sourceURL) {
    return new Promise((resolve, reject) => {
        //Using cors-anywhere API to fetch the URL without origin issues
        fetch(`https://cors-anywhere.herokuapp.com/${sourceURL}`, {
            mode: 'cors'
        })
        .then((fetchedPage) => {
            if (!fetchedPage.ok) return reject(new Error(`We received an invalid response when trying to get a CORS free version of ${sourceURL}`));
            resolve(fetchedPage.text());
        })
        .catch(error => reject(error));
    });
};



/**
 * @name searchForLinkRelValue
 * @summary will parse a HTML page as string and return the first link rel="${}" It will only work on front-end ( DOMParser only exists in navigator)
 * @param {string} fetchedPage 
 * @param {string} linkRelType 
 * @returns {url || false} the URL of false 
 */
const searchForLinkRelValueInHTML = (HTMLasString, linkRelType) => {

    if (typeof HTMLasString !== "string" && typeof linkRelType !== "string") {
        throw new Error(`We expected a string as HTMLasString and linkRelType we got HTMLasString : ${typeof sourceURL} linkRelType ${typeof linkRelType}`);
    }

    const parser = new DOMParser();

    const htmlDocument = parser.parseFromString(HTMLasString, "text/html");

    const linkRel = htmlDocument.documentElement.querySelector(`link[rel="${linkRelType}"`);

    if (linkRel === null) return false;

    const href = linkRel.getAttribute("href");

    if (href === null) return false;

    return href;
};



/**
 * @name getAlternativeURL
 * @summary return the AMP URL from the cannonical URL or the opposite (this function should be used on front-end only)
 * @param {string} sourceURL URL ( could be the cannonical URL or the AMP url)
 * @param {string} linkRelType the linkRelType amp-html,canonical...
 * @returns {Promise || error} the promise will contain the alternative URL 
 */
export const getAlternativeURL = function (sourceURL, linkRelType) {

    return new Promise((resolve, reject) => {

        if (typeof sourceURL !== "string") {
            return reject(Error(`We expected a string as sourceURL we got ${typeof sourceURL}`));
        }

        if (!isURL(sourceURL)) {
            return reject(Error(`We expected an URL we got ${sourceURL}`));
        }

        if (typeof linkRelType !== "string") {
            return reject(Error(`We expected a string as linkRelType we got ${typeof linkRelType}`));
        }

        corsFree(sourceURL)
            .then((fetchedPage) => {
                const alternativeURL = searchForLinkRelValueInHTML(fetchedPage, linkRelType);

                if (!alternativeURL) {
                    return reject(new Error(`We couldn't find a valid alternativeURL`));
                }

                resolve(alternativeURL);
            });
    });
};