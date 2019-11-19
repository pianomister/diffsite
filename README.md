# diffsite
Tool to visually compare two versions of a website.

## Credits
Inspired by
- http://diffee.me/
- https://glitch.com/~amp-visual-compare
- https://antoinebr.github.io/compareAMP/
- https://help.github.com/en/articles/rendering-and-diffing-images#viewing-differences

## Feature wishlist / backlog
- Add configurable iframe proxy in advanced settings
- Add fallback to screenshots via puppeteer
- Back-to-top button

## Development
Project based on [webpack-starter](https://github.com/wbkd/webpack-starter).

### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
