const rootGetController = (req, res) => {
    res.render('index', {
        title: 'Home'
    })
}


module.exports = {
    rootGetController,
}