const express = require("express");
const {
    getAllDeliveryPersons,
    createDeliveryPerson,
    updateDeliveryPerson,
    deleteDeliveryPerson,
    getDeliveryPersonsCount,
    getDeliveryPersonById
} = require("../controller/DeliPerController");

const router = express.Router();

// Get all delivery persons
router.get("/get", getAllDeliveryPersons);

// Create a new delivery person
router.post("/create", createDeliveryPerson);

// Update a delivery person
router.put("/update", updateDeliveryPerson);

// Delete a delivery person
router.delete("/delete/:id", deleteDeliveryPerson);

// Get the count of delivery persons
router.get("/count", getDeliveryPersonsCount);

// Get a delivery person by ID
router.get("/:id", getDeliveryPersonById);

module.exports = router;
