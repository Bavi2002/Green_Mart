const mongoose = require('mongoose');

const packagingMaterialSchema = new mongoose.Schema({
    packagingMaterial: String,
    internalMeasurement: String,
    weightLimit: String,
    description: String,
    features: [String],
    uploadImage: String,
});

const PackagingMaterial = mongoose.model('PackagingMaterial', packagingMaterialSchema);

module.exports = PackagingMaterial;
