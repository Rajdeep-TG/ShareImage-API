const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const request = require('request');
const shareimage = require('shareimage');
const PORT = process.env.PORT || 8080

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/v1/image', (req, res) => {
    const image = shareimage.get(req.query)
    request({
            url: image,
            encoding: null
        },
        (err, resp, buffer) => {
            if (!err && resp.statusCode === 200) {
                res.set("Content-Type", resp.headers['content-type']);
                res.header({
                    'X-Powered-By': "ShareImage",
                    "X-Cloud-Name": req.query.cloudName,
                    'X-Image-Id': req.query.imagePublicID,
                })
                res.send(resp.body);
            }
        });
})

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}!`);
})