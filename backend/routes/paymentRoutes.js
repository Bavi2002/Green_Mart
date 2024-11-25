const express = require('express');
const router = express.Router();
const { submitPayment, getPaymentDetails, updatePaymentDetails,getAllPayments  } = require('../Controller/paymentController');

// POST route for submitting payment
router.post('/submit-payment', submitPayment);

// GET route for retrieving payment details by paymentId
router.get('/payment/:paymentId', getPaymentDetails);

router.put('/payment/:paymentId',updatePaymentDetails)


router.get('/payments', getAllPayments);

module.exports = router;
