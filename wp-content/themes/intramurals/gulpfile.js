// WordPress Starterkit Gulpfile
// (c) Blue State Digital

// TASKS
// ------
// `gulp`: watch, compile styles and scripts; Browserify
// `gulp build`: default compile task


// PLUGINS
// --------
var autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    browserSync = require('browser-sync').create(),
    cache = require('gulp-cache'),
    chug = require('gulp-chug'),
    concat = require('gulp-concat'),
    del = require('del'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    minifycss = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    p = require('./package.json'),
    path = require('path'),
    pixrem = require('gulp-pixrem'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    styleguide = require('sc5-styleguide'),
    sourcemaps = require('gulp-sourcemaps'),
    sourcestream = require('vinyl-source-stream'),
    uglify = require('gulp-uglify');


// VARIABLES
// ----------
var dist = 'assets/',
    appRoot = '/wp-content/themes/bsdstarter/assets/',
    source = 'src/';


// ERROR HANDLING
// ---------------
function handleError() {
    this.emit('end');
}

// BUILD SUBTASKS
// ---------------

// Styles
gulp.task('styles_dev', function() {
    return gulp.src([
        source+'scss/style.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: ['node_modules']}))
        .on('error', handleError)
        .on('error', notify.onError())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('styles', function() {
    return gulp.src([
        source+'scss/style.scss'
    ])
    .pipe(sass({includePaths: ['node_modules']}))
        .on('error', handleError)
        .on('error', notify.onError())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(gulp.dest('./'));
});


// Script Linter
gulp.task('lint', function() {
    return gulp.src(source+'js/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Browserify
gulp.task('browserify', function() {
    return browserify(source+'js/main.js')
        .bundle()
        .pipe(sourcestream('bundle.js'))
        .pipe(gulp.dest(dist+'js'));
});


// Scripts
gulp.task('scripts', ['lint', 'browserify'], function() {
    return gulp.src([
        source+'js/vendor/_*.js',
        dist+'js/bundle.js'
    ])
    .pipe(babel({
			presets: ['es2015'],
      compact: true
		}))
    .pipe(concat('source.dev.js'))
    .pipe(gulp.dest(dist+'js'))
    .pipe(rename('source.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist+'js'))
    .pipe(browserSync.stream({match: '**/*.js'}));
});


// Clean
gulp.task('clean', function(cb) {
    del([dist+'js/source.dev.js', dist+'js/source.js'], cb);
});


// Images
gulp.task('images', function() {
    return gulp.src(source+'img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(dist+'img'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Generate Styleguide
gulp.task('styleguide:generate', function() {
  return gulp.src([source + 'scss/_*.scss'])
    .pipe(styleguide.generate({
      title: 'Styleguide',
      rootPath: dist + 'styleguide',
      appRoot: appRoot + 'styleguide',
      overviewPath: 'styleguide-overview.md',
      extraHead: ''
    }))
    .pipe(gulp.dest(dist + 'styleguide'))
});

// Apply styles to styleguide
gulp.task('styleguide:applystyles', function() {
  return gulp.src(source + 'scss/style.scss')
    .pipe(sass({includePaths: ['node_modules']}))
      .on('error', handleError)
      .on('error', notify.onError())
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(dist + 'styleguide'))
});

// Update reference screenshots
gulp.task('backstopjs:reference', function() {
    gulp.src('./node_modules/backstopjs/gulpfile.js')
    .pipe(chug({
        tasks: ['reference']
    }));
});

// Test current screenshots against reference
gulp.task('backstopjs:test', function() {
    gulp.src('./node_modules/backstopjs/gulpfile.js')
    .pipe(chug({
        tasks: ['test']
    }));
});


// BUILD TASKS
// ------------

// Build styleguide
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

// Watch
gulp.task('default', function() {

    browserSync.init({
    proxy: '[YOUR URL]',
        port:3001,
        ghostMode: {
            scroll: true
        },
        open:false
    });

    // Watch .scss files
    gulp.watch(source+'scss/**/*.scss', ['styles_dev', 'styleguide']);

    // Watch .js files
    gulp.watch(source+'js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch(source+'img/**/*', ['images']);

    // Watch templates, JS, and CSS, reload on change
    gulp.watch([
            'bsdstarter/**/*',
        ], { dot: true })
        .on('change', browserSync.reload);
});

// Build
gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'styleguide');
    //gulp.start('styles', 'scripts', 'styleguide', 'backstopjs:test');
});
