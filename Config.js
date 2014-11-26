var elixir = require('laravel-elixir');

var config = {
    requireModules: false,
    configFile:     false,
    sourcemap:      false,
    style:          elixir.config.production ? "compressed" : "expanded",
    image:          elixir.config.baseDir   + 'images',
    font:           elixir.config.baseDir   + 'fonts',
    sass:           elixir.config.assetsDir + 'scss',
    css:            elixir.config.cssOutput,
    js:             elixir.config.jsOutput
};

config.mergeConfig = function(userOptions) {
   if (! userOptions) return this;

   for (option in this) {
       if (userOptions.hasOwnProperty(option)) {
           this[option] = userOptions[option];
       }
   }

   return this;
};

module.exports = config;
