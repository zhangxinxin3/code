var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var url = require('url');
var fs = require('fs');
var data = require('./data.json');
gulp.task('server', function() {
    return gulp.src('public')
        .pipe(server({
            port: 9090,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == '/favicon.ico') {
                    return res.end('');
                }
                if (pathname == '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'public/index.html')));
                } else if (pathname == '/list') {
                    res.end(JSON.stringify({ "code": 1, "data": data }));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'public', pathname)));
                }
            }
        }))
})