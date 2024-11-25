const DeliveryPerson = require("../models/DeliPersonModel");

// Get all delivery persons
const getAllDeliveryPersons = async (req, res) => {
    try {
        const data = await DeliveryPerson.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch delivery persons" });
    }
};

// Create a new delivery person
const createDeliveryPerson = async (req, res) => {
    const deliveryPerson = new DeliveryPerson(req.body);
    try {
        await deliveryPerson.save();
        res.send({ success: true, message: "Delivery person created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to create delivery person" });
    }
};

// Update a delivery person
const updateDeliveryPerson = async (req, res) => {
    const { id, ...rest } = req.body;
    try {
        const existingPerson = await DeliveryPerson.findById(id);
        if (!existingPerson) {
            return res.status(404).json({ success: false, message: "Delivery person not found" });
        }
        await DeliveryPerson.updateOne({ _id: id }, rest);
        res.send({ success: true, message: "Updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to update delivery person" });
    }
};

// Delete a delivery person
const deleteDeliveryPerson = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await DeliveryPerson.deleteOne({ _id: id });
        if (data.deletedCount === 0) {
            return res.status(404).send({ success: false, message: "Delivery person not found" });
        }
        res.send({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to delete delivery person" });
    }
};

// Get the count of delivery persons
const getDeliveryPersonsCount = async (req, res) => {
    try {
        const deliveryPersons = await DeliveryPerson.find({});
        res.status(200).json({
            count: deliveryPersons.length,
            data: deliveryPersons
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch count" });
    }
};

// Get a delivery person by ID
const getDeliveryPersonById = async (req, res) => {
    const id = req.params.id;
    try {
        const deliveryPerson = await DeliveryPerson.findById(id);
        if (!deliveryPerson) {
            return res.status(404).send({ success: false, message: "Delivery person not found" });
        }
        res.send({ success: true, message: "Delivery person fetched successfully", data: deliveryPerson });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getAllDeliveryPersons,
    createDeliveryPerson,
    updateDeliveryPerson,
    deleteDeliveryPerson,
    getDeliveryPersonsCount,
    getDeliveryPersonById
};
