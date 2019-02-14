//Require in Gulp and other dependencies
const gulp = require('gulp'),
postcss = require('gulp-postcss');


// define often reused variables
var index = "./app/index.html";
var all_styles = "./app/assets/styles/**/*.css";
var main_style = "./app/assets/styles/style.css";
var temp_styles = './app/temp/styles';


//create all functions for gulp to run
function html(done) {
    console.log('Html task is running');
    done();
}

function js(done) {
    console.log('JS task is running');
    done();
}

function css(done) {
    gulp.src(main_style)
    .pipe()
    .pipe(gulp.dest(temp_styles));
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
gulp.task('watch', gulp.parallel(watch_index, watch_css));


