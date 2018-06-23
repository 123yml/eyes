const gulp = require('gulp'),
	// minifyCss = require('gulp-clean-css'),
	// uglify = require("gulp-uglify"),
	// babel = require('gulp-babel'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass');

/*gulp.task('css',function(){
	gulp.src('src/css/*.css')
		.pipe(minifyCss())
		.pipe(gulp.dest('src/css/'));
});

gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(babel({
			presets:['env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('src/js/'));
});*/

//启动服务器
gulp.task('connect',function(){
	connect.server({
		root:'dist',
		livereload:true
	});
});

//复制html到dist目录下，让html页面重新加载
gulp.task('html',function(){
	gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist/'))
		.pipe(connect.reload());//浏览器自动刷新
});

//复制js到dist目录下，让js页面重新加载
gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());//浏览器自动刷新
});

//复制lib到dist目录下
gulp.task('copy-lib',function(){
	gulp.src('src/lib/**/*.*')
		.pipe(gulp.dest('dist/lib'))
});

//复制img到dist目录下
gulp.task('copy-img',function(){
	gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('dist/img'))
});

//复制mock到dist目录下
gulp.task('copy-moke',function(){
	gulp.src('src/img/**/*.*')
		.pipe(gulp.dest('dist/mock'))
});
gulp.task('copy',['copy-lib','copy-img','copy-moke']);

//编译*.scss文件为*.css
gulp.task('sass',function(){
	gulp.src('src/sass/*.scss')
		.pipe(sass({outPutStyle:'expanded'}))
		.pipe(gulp.dest('dist/css/'))
		.pipe(connect.reload());
});

//监事文件修改
gulp.task('watch',function(){
	gulp.watch('src/sass/*.scss',['sass']); 
	gulp.watch('src/**/*.html',['html']);

});

//定制默认（缺省）任务
gulp.task('default',['html','js','sass','copy','connect','watch']);