const Payment = require('../Models/payment');
const { v4: uuidv4 } = require('uuid');

// Handle payment submission
const submitPayment = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    telephone,
    address,
    city,
    paymentMethod = 'Not specified', // Default value if not provided
    discount = 0,                   // Default value if not provided
    packagingCharge = 0,           // Default value if not provided
    deliveryCharge = 0,             // Default value if not provided
    totalAmount,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !telephone || !address || !city || !totalAmount) {
    return res.status(400).json({ message: 'All fields except paymentMethod, discount, packagingCharge, and deliveryCharge are required.' });
  }

  // Create a unique payment ID
  const paymentId = uuidv4();

  try {
    const payment = new Payment({
      paymentId,
      firstName,
      lastName,
      email,
      telephone,
      address,
      city,
      paymentMethod,
      discount,
      packagingCharge,
      deliveryCharge,
      totalAmount,
    });

    await payment.save();
    return res.status(201).json({ message: 'Payment submitted successfully', paymentId });
  } catch (error) {
    console.error('Error saving payment:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Failed to submit payment', error: error.message });
  }
};



// Get payment details by payment ID
const getPaymentDetails = async (req, res) => {
  const { paymentId } = req.params;

  // Validate if paymentId is provided
  if (!paymentId) {
    return res.status(400).json({ message: 'Payment ID is required.' });
  }

  try {
    // Find the payment by paymentId
    const payment = await Payment.findOne({ paymentId });

    // If payment doesn't exist, return an error
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    // Return the payment details
    return res.status(200).json({ payment });
  } catch (error) {
    console.error('Error retrieving payment details:', error);
    return res.status(500).json({ message: 'Failed to retrieve payment details', error: error.message });
  }
};

const updatePaymentDetails = async (req, res) => {
  const { paymentId } = req.params;
  const updateData = req.body;

  // Validate if paymentId is provided
  if (!paymentId) {
    return res.status(400).json({ message: 'Payment ID is required.' });
  }

  try {
    // Find the payment by paymentId and update
    const payment = await Payment.findOneAndUpdate({ paymentId }, updateData, { new: true });

    // If payment doesn't exist, return an error
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    // Return the updated payment details
    return res.status(200).json({ message: 'Payment details updated successfully', payment });
  } catch (error) {
    console.error('Error updating payment details:', error);
    return res.status(500).json({ message: 'Failed to update payment details', error: error.message });
  }
};
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({});
    return res.status(200).json({ 
      message: 'Payments retrieved successfully',
      count: payments.length,
      payments 
    });
  } catch (error) {
    console.error('Error retrieving all payments:', error);
    return res.status(500).json({ message: 'Failed to retrieve payments', error: error.message });
  }
};


module.exports = {
  submitPayment,getPaymentDetails,updatePaymentDetails,getAllPayments,
};
