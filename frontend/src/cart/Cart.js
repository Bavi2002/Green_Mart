import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Cart = () => {
  const context = useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  if (!context) {
    console.error("CartContext is not available");
    return null;
  }

  const { cartItems, setCartItems } = context;

  const calculateDiscountedPrice = (price, discount) => {
    return (price - price * (discount / 100)).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const itemPrice =
          item.discount > 0
            ? calculateDiscountedPrice(item.price, item.discount) *
              item.quantity
            : item.price * item.quantity;
        return total + parseFloat(itemPrice);
      }, 0)
      .toFixed(2);
  };

  const handleIncreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCartItems);
  };

  const discount = 0;
  const delivery = 0;
  const subtotal = calculateTotal();

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId"); // Example of getting userId from localStorage
    console.log("Retrieved userId:", userId);
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId, // Now sending actual user ID
          items: cartItems.map((item) => ({
            productId: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal: subtotal,
          discount: discount,
          total: subtotal - discount,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Cart saved:", data);
        navigate("/itemdetails", {
          state: {
            items: cartItems.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total: (item.price * item.quantity).toFixed(2),
            })),
            subtotal: subtotal,
            discount: discount,
            total: subtotal - discount,
          },
        });
      } else {
        console.error("Error saving cart:", data.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        My Shopping Cart
      </h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Description</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Quantity</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Remove</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item._id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={`http://localhost:3000/Images/${item.image}`}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                        marginRight: "10px",
                      }}
                    />
                    {item.name} <br />
                  </div>
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    style={{ marginRight: "5px" }}
                  >
                    +
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    style={{ marginLeft: "5px" }}
                  >
                    -
                  </button>
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    style={{ color: "red" }}
                  >
                    Remove
                  </button>
                </td>
                <td style={{ padding: "10px" }}>
                  £{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                Your cart is empty
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <p>Subtotal: Rs{subtotal}</p>
        <h3>Total: Rs{subtotal}</h3>
        <button
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
            marginLeft: "10px",
          }}
          onClick={handleCheckout} // Call handleCheckout on click
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
