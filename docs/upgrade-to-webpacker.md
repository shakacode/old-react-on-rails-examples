# Upgrading to Webpacker with React on Rails

## Upgrade webpack (v4) and it's all loaders (optional)

Replace ExtractTextPlugin with MiniCssExtractPlugin

> Since webpack v4 the extract-text-webpack-plugin should not be used for css. Use mini-css-extract-plugin instead.


in the plugins section:
```
plugins: [
  ...
  new MiniCssExtractPlugin({ filename: '[name]-bundle.css' }),
];
```

in the rules section:
```
test: /\.s?css/,
use: [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      minimize: true,
      modules: true,
      importLoaders: 3,
      localIdentName: cssModuleName,
    },
```

## Upgrade React on Rails to latest, at least > 11.0.8
see the docs https://github.com/shakacode/react_on_rails/blob/master/docs/basics/upgrading-react-on-rails.md

## Integrating Webpacker
same docs https://github.com/shakacode/react_on_rails/blob/master/docs/basics/upgrading-react-on-rails.md#integrating-webpacker

## Move assets from rails to the webpack

Suppose we have this structure of assets:
```
/app/assets/javascripts/main.js
/app/assets/javascripts/facebook_sdk.js
/app/assets/stylesheets/views/layout.css
/app/assets/stylesheets/views/faq.css
```

It's better to move all these assets to the client folder to be sure that we do not process any assets through the rails.
And it is even more convenient to store all the resources in one place.


- Move all assets from `/app/assets` to `/client/app/assets/rails-assets`
- Create `index.js` entry files for js and css assets:

**js entry example (/client/app/assets/rails-assets/javascripts/index.js)**

```
...
import './main';
import './facebook_sdk';
...
```

**css entry example (/client/app/assets/rails-assets/stylesheets/index.css)**

```
...
import "views/layout";
import "views/faq";
...
```

Then somewhere in the bundles' folder create `index.js` which will include these bundles

(e.g. `/client/app/bundles/rails-assets/index.js`)
```
// styles
import 'app/assets/rails-assets/stylesheets/index.css';

// scripts
import 'app/assets/rails-assets/javascripts/index.js'
```

Then create an entry in the webpack config
```
...
entries: {
  ...
  'rails-assets': path.resolve(__dirname, 'app/bundles/rails-assets/index.js'),
  ...
}
```

## In case if we have many images in the rails assets and the directory with images contains subdirectories

The problem is the saving full path to the images in `manifest.json` for rails images. The thing is that the ManifestPlugin uses only the file's name as the key. To solve that we can use name option in `url-loader` to add full path to the image name.

For example:

in rules:
```
const railsImagesPath = "client/app/assets/rails-assets/images";

const isImageFromRailsAssets = function(path) {
  return path.indexOf(railsImagesPath) !== -1;
};


// example args:
// substring = client/app/assest/rails-assets/images
// path      = /var/www/mysite.com/client/app/assets/rails-assets/images/subfolder/logo.png
// returns    = index of -----------------------------------------------^
const getStartSubstringIndex = function(path, substring) {
  return path.lastIndexOf(substring) + substring.length + 1;
};

...

test: /\.(jpe?g|png|gif|svg|ico)$/,
use: [{
   loader: 'url-loader',
   options: {
     publicPath: '/assets/',
     name: function(file) {
       if(isImageFromRailsAssets(file)) {

         // returns relative path to the image in `rails-assets` images folder
         // for example it may return: `/subfolder/logo.png`
         const filePath = path.parse(file.substr(getStartSubstringIndex(file, railsImagesPath)));

         // returns relative path to the image plus hashed name of image
         // for example: `subfolder/logo-123.png`
         return path.join(filePath.dir, '[name]-[hash].[ext]');
       } else {
         return '[name]-[hash].[ext]';
       }
     },
     // We can't use limit in this case, because we need to generate all assets as files,
     // not data urls
     limit: 1,
     publicPath: output.publicPath,
     regExp: fileLoaderRegExp,
   },
}],
```

Also, if we have many images we can use this code snippet to import all images in subdirectories:

**images entry (/client/app/assets/rails-assets/images/index.js)**
```
// Reference: https://webpack.js.org/guides/dependency-management/#context-module-api
function importAll(r) {
    return r.keys().map(r);
}

importAll(require.context('./', true, /\.(png|jpe?g|svg|gif|ico)$/));
```

References on `require.context`: [Webpack Docs](https://webpack.js.org/guides/dependency-management/#context-module-api) and [Webpack Wiki](https://github.com/webpack/docs/wiki/context)
