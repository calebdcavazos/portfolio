//Require in Gulp and other dependencies
const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
hexrgba = require('postcss-hexrgba'),
browserSync = require('browser-sync').create();


// define often reused variables
const index = "./app/index.html",
all_styles = "./app/assets/styles/**/*.css",
main_style = "./app/assets/styles/style.css",
temp_styles = './app/temp/styles';


//create all functions for gulp to run
function html(done) {
    browserSync.reload();
    done();
}

function js(done) {
    console.log('JS task is running');
    done();
}

function startBrowser(done) {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
}

function css(done) {
    gulp.src(main_style)
    .pipe(postcss([cssImport, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', function() {
        this.emit('end');
    })
    .pipe(gulp.dest(temp_styles));
    browserSync.reload();
    done();
}

function watch_index() {
    gulp.watch(index, html);
}

function watch_css() {
    gulp.watch(all_styles, css);
}


//define gulp tasks
gulp.task('html', html);
gulp.task('js', js);
gulp.task('css', css);
gulp.task('default', gulp.parallel(html, js));
gulp.task('watch', gulp.parallel(watch_index, watch_css, startBrowser));