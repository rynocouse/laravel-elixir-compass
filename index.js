var elixir = require('laravel-elixir'),
    gulp = require("gulp"),
    compass = require('gulp-compass'),
    notify = require('gulp-notify'),
    config = require('./Config');

elixir.extend("compass", function(src, userConfig) {

    config.mergeConfig(userConfig);
    src = this.buildGulpSrc(src, config.sass, '**/*.scss');

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
                require: config.requireModules,
                config_file: config.configFile,
                style: config.style,
                css: config.css,
                sass: config.sass,
                font: config.font,
                image: config.image,
                javascript: config.js,
                sourcemap: config.sourcemap
            })).on('error', onError)
            .pipe(gulp.dest(config.css))
            .pipe(notify(success()));
    });

    this.registerWatcher('compass', config.sass + '/**/*.scss');
    return this.queueTask("compass");

});
