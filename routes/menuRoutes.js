
const express = require('express');
const menuItem = require('../models/MenuItem');
const logToFile = require('../logs/logger');
const router = express.Router();
const mongoose = require('mongoose');


// Add new Menu Item 
router.post('/', async (req, res) => {
    try {
        logToFile("Incoming data for /menuItem endpoint.");
        const newMenuItem = new menuItem(req.body);
        const savedMenuItem = await newMenuItem.save();
        logToFile("Data saved successfully: " + JSON.stringify(savedMenuItem));
        res.status(200).json(savedMenuItem);
    } catch (err) {
        logToFile("Error saving menu item: " + err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all Menu Items
router.get('/', async (req,res) => {
    try {
        logToFile("Incoming data for /getmenuItem endpoint.");
        const getmenuItem = await menuItem.find();
        logToFile("Data retrieved successfully: " + JSON.stringify(getmenuItem));
        res.status(200).json(getmenuItem);

    } catch (err) {
        logToFile("Error getting menu item : " + err.message);
        res.status(500).json({error : 'Internal server Error'});
    }

});

// Updated Menu Item 

router.put('/:id', async (req,res) => {
    try {
        const updateMenuItem = req.params.id;
    const updatedMenuItemData = req.body;

    const response =  await menuItem.findByIdAndUpdate(updateMenuItem,updatedMenuItemData, {
        new: true, runValidators: true,
    })
    if (!response) {
        return res.status(404).json({error : 'Person not found'});
    }

    logToFile(' Data Updated  successfully ');
        res.status(200).json(response)
    } catch (error) {
        logToFile("Error getting Person : " + err.message);
        res.status(500).json({error : 'Internal server Error'});
    }
});

// Delete Menu Item  from DB
router.delete('/:id', async (req, res) => {
    try {
        const deleteMenuItemById = req.params.id;
        console.log("Request to delete menu item with ID:", deleteMenuItemById);

        // Attempt to delete the menu item by ID
        const response = await menuItem.findByIdAndDelete(deleteMenuItemById);
        
        if (!response) {
            return res.status(404).json({ error: `Menu Item not found with id: ${deleteMenuItemById}` });
        }

        logToFile("Data deleted successfully", response);
        res.status(200).json({ message: "Menu item deleted successfully", data: response });

    } catch (error) {
        logToFile("Error deleting menu item from database", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;