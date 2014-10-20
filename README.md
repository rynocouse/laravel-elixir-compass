laravel-elixir-compass
======================

## Usage
This is a simple compass wrapper for Laravel Elixir that was ported from: [laravel-elixir-stylus](https://github.com/JeffreyWay/laravel-elixir-stylus)
Add it to your Elixir-enhanced Gulpfile, like so:

```
var elixir = require('laravel-elixir');

require('laravel-elixir-compass');

elixir(function(mix) {
   mix.compass();
});
```

This will scan your `resources/assets/scss` directory for all files. Instead, if you only want to compile a single file, you may do:

```
mix.stylus("bootstrap.scss");
```

Finally, if you'd like to output to a different directory than the default `public/css`, then you may override this as well.

```
mix.stylus("bootstrap.scss", "public/css/foo/bar/");
```
