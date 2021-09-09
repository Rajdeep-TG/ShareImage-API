const express = require('express');
const request = require('request');
const shareimage = require('shareimage');
const PORT = process.env.PORT

const app = express();

app.listen(PORT, () => {
    console.log("Success")
})

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
