const http = require('http');


var args = parseInt(process.argv.slice(2, 3));
var interval = parseInt(process.argv.slice(3, 4));
if (!args || !interval) {
    args = 10000;
    interval = 1000;
}

console.log(args);
console.log(interval);

http.createServer(function (req, resp) {
    resp.writeHead(200, {
        'Content-Type': 'text/  html; charset=UTF-8',
        'Transfer-Encoding': 'chunked'
    });
    showtime(resp);
    new Promise(function (resolve, reject) {
        setTimeout(() => {
            resp.end(new Date().toISOString() + " end ")
        }, args)
    })

}).listen(3000);


function showtime(resp) {
    return new Promise(function (resolve, reject) {
        sendData(resp);
        setTimeout(() => {
            showtime(resp);
        }, interval)
    }).catch();

}

function sendData(resp) {
    if (resp != null) {
        resp.write(" " + new Date().toISOString());
    }
}

