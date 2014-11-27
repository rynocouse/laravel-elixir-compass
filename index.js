var elixir = require('laravel-elixir'),
    gulp = require("gulp"),
    compass = require('gulp-compass'),
    notify = require('gulp-notify'),
    _ = require('underscore');

elixir.extend("compass", function(src, outputDir, options) {

    var config = this,
        defaultOptions = {
            config_file: false,
            sourcemap:   false,
            modules:     false,
            style:       config.production ? "compressed" : "expanded",
            image:       config.baseDir   + 'images',
            font:        config.baseDir   + 'fonts',
            sass:        config.assetsDir + 'scss',
            css:         outputDir || config.cssOutput,
            js:          config.jsOutput
        };

    options = _.extend(defaultOptions, options);
    src = this.buildGulpSrc(src, options.sass, '**/*.scss');

    gulp.task('compass', function() {
        var onError = function(err) {
            notify.onError({
                title:    "Laravel Elixir",
                subtitle: "Compass Compilation Failed!",
                message:  "Error: <%= error.message %>",
                icon: __dirname + '/../laravel-elixir/icons/fail.png'
            })(err);

            this.emit('end');
        };

        var success = function() {
            return {
                title: 'Laravel Elixir',
                subtitle: 'Compass Compiled!',
                icon: __dirname + '/../laravel-elixir/icons/laravel.png',
                message: ' '
            }
        };

        return gulp.src(src)
            .pipe(compass({
                require: options.modules,
                config_file: options.config_file,
                style: options.style,
                css: options.css,
                sass: options.sass,
                font: options.font,
                image: options.image,
                javascript: options.js,
                sourcemap: options.sourcemap
            })).on('error', onError)
            .pipe(gulp.dest(options.css))
            .pipe(notify(success()));
    });

    this.registerWatcher('compass', options.sass + '/**/*.scss');
    return this.queueTask("compass");

});
