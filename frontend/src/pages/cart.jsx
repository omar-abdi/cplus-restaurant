import storeOrders from "../zustand/orderers";

const Cart = () => {
  const { cartItems } = storeOrders();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-semibold">
                    {item.name}
                  </h2>

                  <p>${item.price}</p>

                  <p>
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-bold">
                ${item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between">
            <h2 className="text-xl font-bold">
              Total
            </h2>

            <p className="text-xl font-bold">
              ${totalPrice}
            </p>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Place Order
          </button>

        </div>
      )}
    </div>
  );
};

export default Cart;