const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
hexrgba = require('postcss-hexrgba'),
browserSync = require('browser-sync').create(),
mixins = require('postcss-mixins');

var all_styles = "./app/assets/styles/**/*.css";
var main_style = "./app/assets/styles/style.css";
var temp_styles = './app/temp/styles';

function css(done) {
    gulp.src(main_style)
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .pipe(gulp.dest(temp_styles));
    browserSync.reload();
    done();
}

function watch_css() {
    gulp.watch(all_styles, css);
}

gulp.task('css', css);