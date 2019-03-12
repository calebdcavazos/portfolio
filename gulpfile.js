//Require in Gulp and other dependencies
const gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
hexrgba = require('postcss-hexrgba'),
browserSync = require('browser-sync').create(),
webpack = require('webpack'),
modernizr = require('gulp-modernizr');


// define often reused variables
const index = "./app/index.html",
allStyles = "./app/assets/styles/**/*.css",
allJs = "./app/assets/scripts/**/*.js",
mainStyle = "./app/assets/styles/style.css",
tempStyles = './app/temp/styles';


//create all functions for gulp to run
function html(done) {
    browserSync.reload();
    done();
}

function js(done) {
    webpack(require('./webpack.config.js'), function(err, stats) {
        if(err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        browserSync.reload();
    })
    done();
  }

  function runModernizr(done) {
    gulp.src([allStyles, allJs])
    .pipe(modernizr({
        "options": [
            "setClasses"
        ]
    }))
    .pipe(gulp.dest('./app/temp/scripts'));
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
    gulp.src(mainStyle)
    .pipe(postcss([cssImport, cssvars, nested, hexrgba, autoprefixer]))
    .on('error', function() {
        this.emit('end');
    })
    .pipe(gulp.dest(tempStyles));
    browserSync.reload();
    done();
}

function watchIndex() {
    gulp.watch(index, html);
}

function watchCss() {
    gulp.watch(allStyles, css);
}

function watchJs() {
    gulp.watch(allJs, gulp.parallel(js, runModernizr));
}




//define gulp tasks
gulp.task('html', html);
gulp.task('js', js);
gulp.task('css', css);
gulp.task('modernizr', runModernizr);
gulp.task('default', gulp.parallel(html, js));
gulp.task('watch', gulp.parallel(watchIndex, watchCss, watchJs, startBrowser));