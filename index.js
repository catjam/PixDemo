var Monitor = require('page-monitor');

var url = 'http://localhost:9000/html/?module=md-agent-card&style=standard&theme=standard&data=standard';
var monitor = new Monitor(url, {
    page: {
        viewportSize: {
            width: 1200,
            height: 800
        },
        settings: {
            resourceTimeout: 20000,
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3642.0 Safari/537.36'
        }
    },
    render: {
        format: 'jpeg',     // @see http://phantomjs.org/api/webpage/method/render.html
        quality: 70,        // @see http://phantomjs.org/api/webpage/method/render.html
        ext: 'jpg',         // the same as format, if not specified
        delay: 12000,        // delay(ms) before screenshot.
        timeout: 60 * 1000  // render timeout, max waiting time
    },
});
monitor.capture(function(code){
    console.log(monitor.log); // from phantom
    console.log('done, exit [' + code + ']');
});

// var monitor = new Monitor(url, options);
// monitor.on('debug', function (data) {
//     console.log('[DEBUG] ' + data);
// });
// monitor.on('error', function (data) {
//     console.error('[ERROR] ' + data);
// });
// monitor.diff(1546880256569, 1546913712413, function(code){
//     console.log(monitor.log.info); // diff result
//     console.log('[DONE] exit [' + code + ']');
// });