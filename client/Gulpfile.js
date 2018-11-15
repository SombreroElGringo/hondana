const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const child = require('child_process');
const fs = require('fs');

const sass_files = './src/**/*.scss';

gulp.task('sass', function(){
	gulp.src(sass_files)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./src'));
});

gulp.task('server', function() {
	var server = child.spawn('npm', ['start']);
	var log = fs.createWriteStream('server.log', {flags: 'a'});
	server.stdout.pipe(log);
	server.stderr.pipe(log);
});

gulp.task('watch', ['sass'], function(){
	gulp.watch(sass_files, ['sass']);
});

gulp.task('default', ['server', 'watch']);