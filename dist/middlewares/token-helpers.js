"use strict";
var jwt = require('jsonwebtoken');
module.exports = {
    checkToken: function (req, res, next) {
        var authorizationHeader = req.headers['authorization'] || req.headers['x-access-token'];
        var token = authorizationHeader &&
            authorizationHeader.startsWith('Bearer ') &&
            authorizationHeader.slice(7, authorizationHeader.length);
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res
                        .status(400)
                        .json({ success: false, message: 'Token is not valid' });
                }
                req.decoded = decoded;
                next();
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }
};
