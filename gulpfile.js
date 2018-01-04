//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    base64 = require('gulp-base64');


// 检查脚本
gulp.task('lint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//定义一个testLess任务（自定义任务名称）
gulp.task('Less', function () {
    gulp.src('src/less/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(minify())
        .pipe(gulp.dest('src/css'));
});
//压缩css

//监听预编译文件
gulp.task('watch',function(){
    gulp.watch('src/less/*.less',['Less']);
});

//压缩html
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('dist/Portal/media.html')
        .pipe(htmlmin(options))
        .pipe(rename('basicmin.html'))
        .pipe(gulp.dest('dist/Portal'));
});


//压缩图片
gulp.task('build', function () {
    return gulp.src('src/css/*.min.css')
        .pipe(base64({
            baseDir: 'public',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8*1024, // bytes
            debug: true
        }))
        .pipe(gulp.dest('src/css'));
});

gulp.task('default',['Less']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径