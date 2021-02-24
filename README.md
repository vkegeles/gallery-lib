# gallery-lib

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/gallery-lib.svg)](https://www.npmjs.com/package/gallery-lib) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i -s git+https://github.com/vkegeles/gallery-lib.git
npm install --save gallery-lib
```

## Parameters

feedArray(type:Array) - array of images
image format: {
"title": "Title of image",
"url": "http://url/to/image.jpg",
"date": "Thu, 12 Jul 2012 03:27:00 -0400"
},

feedPath(type:String) - path to json file of array of images(format is the same) inside public folder

If there is both parameters feedArray and feedPath, library will use feedArray source

search(type:Boolean, default:true) - show a search box
pagination (type:Boolean, default:true) - show a pagination component in the gallery
results-per-page (type:Number, default:10) - number of results on each page of the gallery
sorting (type:Boolean, default:true) - allow the user to sort by the images elements by title or date ASC/DESC
auto-rotate-time (type:Number default:4) - Time for image slideshow mode in seconds

## Usage

```jsx
import React, { Component } from 'react';

import MyGallery from 'gallery-lib';
import 'gallery-lib/dist/index.css';

class Example extends Component {
  render() {
    return (
      <MyGallery
        feedPath='data/feed.json'
        search={false}
        results-per-page={20}
        pagination={true}
        auto-rotate-time={3}
      />
    );
  }
}
```

## License

MIT © [vkegeles](https://github.com/vkegeles)
