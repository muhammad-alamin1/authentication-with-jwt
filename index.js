require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// import middleware and routes
const applicationMiddleware = require('./middleware/appMiddleware');
const rootRouter = require('./routes/rootRoute');
const { notFound, commonDefaultErrorHandler } = require('./middleware/errorMiddleware');
const userRouter = require('./routes/userRoute');

// setup view engine
app.set('view engine', 'ejs');

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

// use middleware 
app.use(applicationMiddleware);

// use routes 
app.use('/user', userRouter);
app.use('/', rootRouter);

// 404
app.use(notFound);

// default error handler
app.use(commonDefaultErrorHandler);

// mongodb uri
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.twhvb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// database connect with mongoose
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("DB Connection successfully");
    // listen port 
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`listening on port http://localhost:${port}`);
    })
});