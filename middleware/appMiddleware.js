const express = require('express');
const morgan = require('morgan');

const applicationMiddleware = [
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
]

module.exports = applicationMiddleware;