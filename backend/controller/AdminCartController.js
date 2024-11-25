const Order = require('../models/cartItems'); // Correct model import

const posToCart = async (req, res) => {
  const { cartItems, totalAmount, totalQuantity, couponCode } = req.body;

  if (!cartItems || cartItems.length === 0) {
    console.log("No items in cart");
    return res.status(400).json({ message: "No items in cart" });
  }

  try {
    console.log("Received cart data:", req.body);

    // Create a new order document
    const newOrder = new Order({
      products: cartItems.map(item => ({ // Ensure we use 'products'
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.cartQuantity, // Ensure this matches the schema
        imageUrl: item.imageUrl,
        totalAmount: item.price * item.cartQuantity
      })),
      totalAmount: totalAmount,
      totalQuantity: totalQuantity,
      couponCode: couponCode
    });

    // Save the order document to the database
    const savedOrder = await newOrder.save();

    return res.status(200).json({ message: "Order created successfully", savedOrder });
  } catch (err) {
    console.error("Error during checkout:", err);
    return res.status(500).json({ message: 'Failed to checkout', error: err });
  }
};


const getFromCart = async (req, res) => {
  try {
    const cartItems = await Order.find();
    console.log("Fetched cart items:", cartItems); // Log the cart items
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart items', error });
  }
};

module.exports = { getFromCart, posToCart };
