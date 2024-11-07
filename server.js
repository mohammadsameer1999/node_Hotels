const express = require('express')
const db =  require('./db')
// const { logToFile } = require('./logger');
const logger = require('./logs/logger');
const fs =  require('fs')
const app = express()
const  bodyParser = require('body-parser');
const person = require('./models/Person');
const menuItem = require('./models/MenuItem');
const personRoutes = require('./routes/personRoutes');
const menuRoutes =  require('./routes/menuRoutes');
require('dotenv').config();

app.use(bodyParser.json());

app.use(express.urlencoded ({extended : false}));
app.use((req,res,nextstep) => {
    console.log("Middleware one response is here ...");
    nextstep();
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

// Person Routes 
app.use('/person', personRoutes);

// Menu Routes
app.use('/menuItem',menuRoutes)


// this is my 2nd middleware 
app.use((req,res, next) => {
    fs.appendFile("log.txt",`\n${Date.now} : ${req.method} ${req.path}\n ` , (err,data) => {
        console.log("2nd middleware response is here ...");
        next();

    });
  
} )

// app.get('/person', async (req, res) => {
//     try {
//         console.log("data is Comming:" );
//         const getPerson = await person.find();  // Fetch all persons from the database

//         console.log('Data retrieved successfully:', getPerson);
//         res.status(200).json(getPerson); // Use status 200 for successful retrieval
//     } catch (err) {
//         console.log("Error retrieving person:", err); // Corrected 'err' to 'error'
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// get person search  from workType the database 




const PORT  =  process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log("server is running on port 3000")
})