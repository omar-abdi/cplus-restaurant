import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import storeOrders from "../zustand/orderers";
import storeUser from "../zustand/user";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = storeUser();
  const {
    cartItems,
    createOrder,
    creatingOrder,
    orderError,
  } = storeOrders();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setOrderSuccess(false);

    const order = await createOrder();

    if (order) {
      setOrderSuccess(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {orderSuccess && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          Order-kaaga si guul leh ayaa loo sameeyay! Mahadsanid.
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Cart-kaagu waa madhan yahay</p>
          <Link
            to="/meals"
            className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Eeg Meals
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.product}-${item.itemModel}`}
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
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            {!user && (
              <p className="text-amber-600 mt-3 text-sm">
                Si aad order u sameyso, fadlan{" "}
                <Link to="/login" className="underline font-semibold">
                  soo gal
                </Link>
                .
              </p>
            )}

            {orderError && (
              <p className="text-red-500 mt-3">
                {orderError}
              </p>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={creatingOrder}
              className="w-full mt-4 bg-black text-white py-3 rounded-lg disabled:opacity-50"
            >
              {creatingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;