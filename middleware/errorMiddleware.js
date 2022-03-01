const notFound = (req, res, next) => {
    res.render('404', {
        title: 'Not Found',
    })
}

const commonDefaultErrorHandler = (err, req, res, next) => {
    if (res.headersSend) {
        return next(err)
    }
    return res.render('500', {
        title: 'Error'
    })
}


module.exports = {
    notFound,
    commonDefaultErrorHandler
}