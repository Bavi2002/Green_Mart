const express = require('express');
const router = express.Router();
const packagingMaterialsController = require('../controller/packMatController');

router.post('/', packagingMaterialsController.uploadImage, packagingMaterialsController.createPackagingMaterial);
router.get('/', packagingMaterialsController.getAllPackagingMaterials);
router.put('/:id', packagingMaterialsController.uploadImage, packagingMaterialsController.updatePackagingMaterial);
router.delete('/:id', packagingMaterialsController.deletePackagingMaterial);

module.exports = router;
