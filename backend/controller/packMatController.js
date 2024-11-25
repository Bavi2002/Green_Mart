const PackagingMaterial = require('../models/packageMatModel');
const multer = require("multer");
const path = require("path");

// Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

// Create a new packaging material
exports.createPackagingMaterial = async (req, res) => {
    try {
        const material = new PackagingMaterial({
            packagingMaterial: req.body.packagingMaterial,
            internalMeasurement: req.body.internalMeasurement,
            weightLimit: req.body.weightLimit,
            description: req.body.description,
            features: req.body.features ? req.body.features.split(', ') : [],
            uploadImage: req.file ? `http://localhost:3000/images/${req.file.filename}` : null,
        });

        await material.save();
        res.status(201).send(material);
    } catch (error) {
        res.status(400).send({ error: 'Failed to add packaging material.' });
    }
};

// Get all packaging materials
exports.getAllPackagingMaterials = async (req, res) => {
    try {
        const materials = await PackagingMaterial.find();
        res.status(200).send(materials);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update packaging material
exports.updatePackagingMaterial = async (req, res) => {
    try {
        const updates = {
            packagingMaterial: req.body.packagingMaterial,
            internalMeasurement: req.body.internalMeasurement,
            weightLimit: req.body.weightLimit,
            description: req.body.description,
            features: Array.isArray(req.body.features) ? req.body.features : req.body.features.split(',').map(feature => feature.trim()),
        };

        if (req.file) {
            updates.uploadImage = `http://localhost:3000/images/${req.file.filename}`;
        }

        const material = await PackagingMaterial.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!material) {
            return res.status(404).send({ message: 'Packaging material not found' });
        }

        res.status(200).send(material);
    } catch (error) {
        console.error('Error updating packaging material:', error);
        res.status(400).send({ error: 'Failed to update packaging material' });
    }
};

// Delete packaging material
exports.deletePackagingMaterial = async (req, res) => {
    try {
        const material = await PackagingMaterial.findByIdAndDelete(req.params.id);
        if (!material) {
            return res.status(404).send();
        }
        res.status(200).send({ message: 'Material deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Use multer middleware
exports.uploadImage = upload.single('uploadImage');
