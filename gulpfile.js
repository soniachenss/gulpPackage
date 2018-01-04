//���빤�߰� require('node_modules���Ӧģ��')
var gulp = require('gulp'), //���ذ�װgulp���õ��ĵط�
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    base64 = require('gulp-base64');


// ���ű�
gulp.task('lint', function() {
    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//����һ��testLess�����Զ����������ƣ�
gulp.task('Less', function () {
    gulp.src('src/less/*.less') //��������Ե��ļ�
        .pipe(less()) //��������õ�ģ��
        .pipe(minify())
        .pipe(gulp.dest('src/css'));
});
//ѹ��css

//����Ԥ�����ļ�
gulp.task('watch',function(){
    gulp.watch('src/less/*.less',['Less']);
});

//ѹ��html
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//���HTMLע��
        collapseWhitespace: false,//ѹ��HTML
        collapseBooleanAttributes: false,//ʡ�Բ������Ե�ֵ <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//ɾ�����пո�������ֵ <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//ɾ��<script>��type="text/javascript"
        removeStyleLinkTypeAttributes: true,//ɾ��<style>��<link>��type="text/css"
        minifyJS: true,//ѹ��ҳ��JS
        minifyCSS: true//ѹ��ҳ��CSS
    };
    gulp.src('dist/Portal/media.html')
        .pipe(htmlmin(options))
        .pipe(rename('basicmin.html'))
        .pipe(gulp.dest('dist/Portal'));
});


//ѹ��ͼƬ
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

gulp.task('default',['Less']); //����Ĭ������ elseTaskΪ�������񣬸�ʾ��û�ж���elseTask����

//gulp.task(name[, deps], fn) ��������  name���������� deps�������������� fn���ص�����
//gulp.src(globs[, options]) ִ����������ļ�  globs��������ļ�·��(�ַ��������ַ�������)
//gulp.dest(path[, options]) ��������ļ�����·��