// routes/returnRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const returnController = require('../controller/returnController');

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// Define the routes
router.post('/returns', upload.single('image'), returnController.createReturnRequest);
router.get('/getReturns', returnController.getAllReturns);
router.put('/returns/:id', returnController.updateReturnRequest);
router.delete('/returns/:id', returnController.deleteReturnRequest);

module.exports = router;
