# Upgrading to Webpacker with React on Rails

# Upgrade webpack (v4) and it's all loaders

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

# Upgrade React on Rails to latest (11.0.7 at the moment)
see the docs https://github.com/shakacode/react_on_rails/blob/master/docs/basics/upgrading-react-on-rails.md

# Integrating Webpacker
same docs https://github.com/shakacode/react_on_rails/blob/master/docs/basics/upgrading-react-on-rails.md#integrating-webpacker

# Move assets from rails to be handled by the webpack/er

Suppose we have this structure of assets:
```
assets
   |__ scripts
            |__main.js
            |__facebook_sdk.js
   |__ styles
           |__
```

## Global bundle for rails assets
- Copy all assets from `app/assets` to `client/app/assets`
- Create `index.js` entry files for js and css assets:

**js entry example (app/assets/scripts/index.js)**

```
...
import './main';
import './facebook_sdk';
...
```

**css entry example (index.scss)**

```
...
@import "views/layout";
@import "views/faq";
...
```

Then somewhere in the bundles' folder create `index.js` which will include these bundles

(e.g. `app/bundles/global/index.js`)
```
// styles
import 'app/assets/styles/index.scss';

// scripts
import 'app/assets/scripts/index.js'
```

Then create an entry in the webpack config
```
...
entries: {
  ...
  'rails-bundle': path.resolve(__dirname, 'app/bundles/global/index.js'),
  ...
}
```

# Import images from current directory and subdirectories
index.js:
```
function importAll(r) {
    return r.keys().map(r);
}

importAll(require.context('./', true, /\.(png|jpe?g|svg|gif|ico)$/));
```


# If it needs to create symlinks assets to public folder
i.e.



```
+  new ManifestPlugin({
+    publicPath: output.publicPath,
+    writeToFileEmit: true,
+    map: function(options) {
+      if(options.path.indexOf('public-saas-images') !== -1) {
+        const source = path.join(path.resolve('..', 'public'), options.path);
+        const target = path.join(path.resolve('..', 'public'), 'saas', options.name);
+
+        if(fs.existsSync(target)) {
+          return options;
+        }
+
+        const sourceFolderPath = path.join(path.resolve('..','public'), path.dirname(options.path));
+        const targetFolderPath = path.join(path.resolve('..','public','saas'), path.dirname(options.name));
+
+        utils.mkdirP(sourceFolderPath);
+        utils.mkdirP(targetFolderPath);
+        
+        fs.symlinkSync(target, source);
+      }
+      return options;
+    }
```

Create index.js for css that will include all the css files same as in application.css
Create index.js for js that will include all the js files same as in application.js
Create entry in webpack config entry section
Replace stylesheet_link_tag, javascript_link_tag with stylesheet_pack_tag, javascript_pack_tag
