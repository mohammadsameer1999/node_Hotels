const express = require('express');
const router = express.Router();
const person = require('../models/Person');
const logToFile = require('../logs/logger');
module.exports = router;


router.post('/', async (req, res) => {
    try {
        logToFile('Incoming request body:', req.body); // Log the incoming request body
        const newPerson = new person(req.body);
        const savedPerson = await newPerson.save();
        logToFile('Data saved successfully:', savedPerson);
        res.status(200).json(savedPerson);
    } catch (err) {
        logToFile("Error saving person:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/', async (req, res) => {
    try {
        logToFile("data is Comming:" );
        const getPerson = await person.find();  // Fetch all persons from the database

        logToFile('Data retrieved successfully:', getPerson);
        res.status(200).json(getPerson); // Use status 200 for successful retrieval
    } catch (err) {
        logToFile("Error retrieving person:", err); // Corrected 'err' to 'error'
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:workType', async (req, res) => {
    try {
        logToFile("data is comming:");
        const workType =  req.params.workType;
        console.log("data for worktype:", workType)
        if (workType == 'Chef' || workType == 'Manager' || workType == 'worker') {
            const response  =  await person.find({work:workType});
            console.log("data is response  type :", response)
            logToFile(' Data reterived successfully ');
            res.status(200).json(response);
        } else {
            res.status(404).json({error : 'Invalid Work Type'});
        }
    } catch (err) {
        logToFile("Error getting Person : " + err.message);
        res.status(500).json({error : 'Internal server Error'});
            
    
    
    }
    router.put('/:id', async (req,res) => {
        try {
        const personId =  req.params.id;
        const updatedPersonData = req.body;

        const response = await person.findByIdAndUpdate(personId,updatedPersonData, {
            new: true, runValidatiors: true,
        });
        if (!response) {
            return res.status(404).json({error : 'Person not found'});
        }

        logToFile(' Data Updated  successfully ');
            res.status(200).json(response)
        

        } catch (err) {
            logToFile("Error getting Person : " + err.message);
        res.status(500).json({error : 'Internal server Error'});
        }

    });
});
module.exports = router;