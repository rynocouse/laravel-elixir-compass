var elixir = require('laravel-elixir'),
    gulp = require("gulp"),
    compass = require('gulp-compass'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    gulpif = require('gulp-if');

elixir.extend("compass", function(src, output) {

    var config = this;
    var baseDir = config.preprocessors.baseDir + 'scss';
    src = this.buildGulpSrc(src, baseDir, '**/*.scss');

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

        return gulp.src(src)
            .pipe(compass({
                css: output || config.cssOutput,
                sass: baseDir
            })).on('error', onError)
            .pipe(autoprefixer())
            .pipe(gulpif(config.production, minify()))
            .pipe(gulp.dest(output || config.cssOutput))
            .pipe(notify({
                title: 'Laravel Elixir',
                subtitle: 'Compass Compiled!',
                icon: __dirname + '/../laravel-elixir/icons/laravel.png',
                message: ' '
            }));
    });

    this.registerWatcher('compass', baseDir + '/**/*.scss');
    return this.queueTask("compass");

});