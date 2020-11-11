const express = require('express');
const logger = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const { request } = require('http');
const { response } = require('express');

const app = express()
app.set('view engine',"ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    methodOverride((req,res) => {
        if (req.body && typeof req.body === "object" && "_method" in req.body){
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
)

const PORT = 3000
const ADDRESS = 'localhost';

app.listen(PORT,ADDRESS, () => {
    console.log(`Server listening on http://${ADDRESS}:${PORT}`)
})