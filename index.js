const express = require('express')
const path = require('path')
const app = express()
var cors = require('cors')
require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json({limit: '50mb'}));
// app.use(express.static(path.join(__dirname, 'uploads')))


// import routes
const AuthRoutes = require('./src/auth/routes')
// const TaatooRoutes = require('./src/tatoos/routes')


app.use(cors())
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + 'uploads')); //Serves resources from public folder


// inint server connection
    const port = process.env.PORT || 5301;
    app.listen(port, () => {
      console.log(`working on ${port}`)
    })

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      console.log("Route: ",req.url)
           next();
    });

// routes....................................................................

app.use("/api/auth", AuthRoutes) 
// app.use("/api/taatoos", TaatooRoutes) 


app.use((req, res, error) => {
  res.status(404).send("No Route Found")
})