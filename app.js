const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const app = express();
const db = require('./config/db.config');
const utils = require('./shared/utils');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
// const swaggerOptions = {
//     swaggerOptions: {
//         authAction: { authentication: { name: "authentication", schema: { type: "apiKey", in: "header", name: "Authorization", description: "" }, value: "Bearer <JWT>" } }
//     }
// };
/*
 *  MIDLEWARES
 */
db.connect();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Pass the global passport object into the configuration function
require('./config/passport')(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());

/*
 *  ROUTES MIDLEWARES
 */
app.use('/', require('./routes/home.routes'));
// PRIVATE ROUTES
app.use('/transaction', utils.authenticate(), require('./routes/private/transaction.routes'));
// PUBLIC ROUTES
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api/user', require('./routes/public/users.routes'));
app.use('/api/consolidated', require('./routes/public/consolidated.routes'));
app.all('*', (req, res, next) => {
    res.status(404).json({ error: '404 Not Found' });
});

app.use(logErrors);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function errorHandler(err, req, res, next) {
    res.status(500);
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    if (!err.status) err.status = 500;
    res.status(err.status).json({ error: err.inner ? err.inner : err });
}


module.exports = app;
