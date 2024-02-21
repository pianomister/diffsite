export const DEFAULT_IHEIGHT = 8200

export function isValidUrl (url) {
  const enhancedUrl = enhanceUrl(url)
  if (enhancedUrl === '') return false
  return enhancedUrl.indexOf('localhost') !== -1 || checkValidUrl(enhancedUrl)
}

function enhanceUrl (url) {
  if (!url) return url
  if (url.indexOf('http') !== 0) url = 'https://' + url
  return url
};

function checkValidUrl (url) {
  if (url.indexOf('localhost') !== -1) return false
  if (url.indexOf('fantasia.test') !== -1) return false

  try {
    // eslint-disable-next-line no-unused-vars
    const validURL = new URL(url)
    return true
  } catch (e) {
    return false
  }
}
