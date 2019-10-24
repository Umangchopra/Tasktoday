require('./config/config');
// require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


const createcontrollerrouter = require('./routes/createcontrollerrouter');


var app = express();
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api', createcontrollerrouter);



// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else {
        console.log(err);
    }
});

app.use(cors({
    origin:['http://localhost:4200/employees/all-employees','http://localhost:3000/api/createlogin'],
    credentials:true
}));

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));