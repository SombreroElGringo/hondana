const {parallel, src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const child = require('child_process');
const fs = require('fs');

const sass_files = ['./src/**/*.scss'];


function task_sass(){
	return src(sass_files)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(dest('./src'));
}


function task_server() {
	var server = child.spawn('npm', ['start']);
	var log = fs.createWriteStream('server.log', {flags: 'a'});
	server.stdout.pipe(log);
	server.stderr.pipe(log);
}

function task_watch(){
	watch(sass_files, task_sass);
}

exports.sass = task_sass;
exports.server = task_server;
exports.watch = parallel(task_sass, task_watch);
exports.default = parallel(task_server, task_watch);
