// Include gulp
const gulp = require('gulp');

// Include plugins
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

// Define paths
const paths = {
    src: {
        js: 'src/js/*.js' // All JS files in src/js folder and subfolders
    },
    dest: {
        js: 'dest/js' // Output folder for concatenated JS files
    }
};

// Task to concatenate JS files
function concatJS() {
    return gulp.src(paths.src.js)
        .pipe(concat('bundle.js')) // Concatenate files into bundle.js
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(paths.dest.js)); // Output to dest/js folder
}

function compileSass() {
    return gulp.src('src/scss/*.scss') // Path to your SCSS files
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCss())
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest('dest/css')); // Output directory for CSS files
  }

function minifyHTML() {
    return gulp.src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'));
}

// Watch task: watch JS files for changes
function watch() {
    gulp.watch(paths.src.js, concatJS);
    gulp.watch('src/scss/*.scss', compileSass);
}

// Exports
exports.default = gulp.series(minifyHTML, compileSass, concatJS, watch);
