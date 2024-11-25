const mongoose = require('mongoose');
const Cart = require('../models/CartModel');

// Controller to handle saving cart information
const checkoutCart = async (req, res) => {
    let { userId, items, subtotal, discount, total } = req.body;

    try {
        // Validate that userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        // Ensure userId is cast to ObjectId
        userId = new mongoose.Types.ObjectId(userId);

        const newCart = new Cart({
            userId,
            items,
            subtotal,
            discount,
            total
        });

        await newCart.save();
        res.status(201).json({ message: 'Cart saved successfully!' });
    } catch (error) {
        console.error('Error during cart checkout:', error);
        res.status(500).json({ message: 'Failed to save cart' });
    }
};

// In your CartController.js
const getCartDetails = async (req, res) => {
    const { userId } = req.params; // Assume userId is passed as a URL parameter

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId'); // Populate product details if necessary
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ success: true, data: cart });
    } catch (error) {
        console.error('Error fetching cart details:', error);
        res.status(500).json({ message: 'Failed to fetch cart details' });
    }
};




module.exports = {
    checkoutCart,
    getCartDetails
};
