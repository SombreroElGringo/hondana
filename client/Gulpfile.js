const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const sass_files = './src/**/*.scss';

gulp.task('sass', function(){
	gulp.src(sass_files)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./src'));
});

gulp.task('watch', ['sass'], function(){
	gulp.watch(sass_files, ['sass']);
});

gulp.task('default', ['watch']);