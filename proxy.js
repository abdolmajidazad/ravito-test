var express = require('express');
var httpProxy = require('http-proxy');
var bodyParser = require('body-parser');
// var fs = require('fs');

var ip = require('ip');
// var server = express();
var app = express();
const fs = require('fs');
const key = fs.readFileSync('./ssl/code.key');
const cert = fs.readFileSync('./ssl/code.crt');
var proxyOptions = {
    changeOrigin: true
};
var apiProxy =null;
var myArgs = process.argv.slice(2);
const https = require('https');
const http = require('http');
var server =null
if(myArgs && myArgs.length && myArgs[0]==='https'){
    console.log("myArgs[0]", myArgs[0])
    server = https.createServer({ key, cert }, app);
    apiProxy = httpProxy.createServer({
        changeOrigin: true,
        ssl: {
            key: fs.readFileSync('./ssl/code.key', 'utf8'),
            cert: fs.readFileSync('./ssl/code.crt', 'utf8')
        },
        target:'http://localhost:9000',
        secure: true
    });
}else{
    server = http.createServer(app);
    apiProxy = httpProxy.createProxyServer(proxyOptions);
}
server.listen('9000', function(){
    if(myArgs && myArgs.length && myArgs[0]==='https'){
        console.log(`Charkhoneh Proxy server listening on https://${ip.address()}:9000`);

    }else{
        console.log(`Charkhoneh Proxy server listening on http://${ip.address()}:9000`);

    }
});
// var

httpProxy.prototype.onError = function (err) {
    console.log(err);
};
app.all("/*", function (req, res) {
    if (req['url'].startsWith('/ws/')) {
        try {
            if (req['url'].startsWith('/ws/resource/')) {
            } else {

                if(myArgs && myArgs.length && myArgs[0]==='https'){
                    apiProxy.web(req, res, {target: 'http://www.raavito.com'});
                }else{
                    apiProxy.web(req, res, {target: 'http://www.raavito.com:8280'});
                }


            }
        } catch (error) {
        }
    } else {
        console.log("req['url']", `http://${req.get('host').split(":")[0]}:8000`+ req['url'])
        apiProxy.web(req, res, {target: `http://${req.get('host').split(":")[0]}:3000`});
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
