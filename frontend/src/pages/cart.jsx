
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import storeOrders from "../zustand/orderers";
import storeUser from "../zustand/user";

const Cart = () => {
  const navigate = useNavigate();

  const { user } = storeUser();

  const {
    cartItems,
    updateQuantity,
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
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-gray-500">
            Shopping Cart
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your meals before placing your order.
          </p>
        </div>

        {/* Success Message */}
        {orderSuccess && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
              ✓
            </div>

            <div>
              <p className="font-semibold">
                Order placed successfully!
              </p>

              <p className="mt-1 text-sm text-green-600">
                Order-kaaga si guul leh ayaa loo sameeyay. Mahadsanid!
              </p>
            </div>
          </div>
        )}

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 text-center shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
              🛒
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-md text-gray-500">
              Wax meal ah weli kuma darin cart-kaaga. Browse meals-ka
              oo dooro waxa aad rabto.
            </p>

            <Link
              to="/meals"
              className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 hover:shadow-lg"
            >
              Browse Meals
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* Cart Items */}
            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={`${item.product}-${item.itemModel}`}
                  className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex gap-4">

                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
                    />

                    {/* Content */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>

                        <p className="whitespace-nowrap text-base font-bold text-gray-900 sm:text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">
                          Quantity
                        </span>

                        <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product,
                                item.itemModel,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity === 1}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-gray-700 transition hover:bg-white hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            −
                          </button>

                          <span className="flex h-8 min-w-10 items-center justify-center text-sm font-bold text-gray-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product,
                                item.itemModel,
                                item.quantity + 1
                              )
                            }
                            aria-label={`Increase ${item.name} quantity`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-gray-700 transition hover:bg-white hover:shadow-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4 text-sm">

                  <div className="flex justify-between text-gray-500">
                    <span>Items</span>
                    <span>{cartItems.length}</span>
                  </div>

                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span className="font-medium text-green-600">
                      Free
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">
                        Total
                      </span>

                      <span className="text-2xl font-bold text-gray-900">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Login Message */}
                {!user && (
                  <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
                    <p className="font-medium">
                      Login required
                    </p>

                    <p className="mt-1">
                      Si aad order u sameyso, fadlan{" "}
                      <Link
                        to="/login"
                        className="font-bold underline underline-offset-2"
                      >
                        soo gal
                      </Link>
                      .
                    </p>
                  </div>
                )}

                {/* Error */}
                {orderError && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {orderError}
                  </div>
                )}

                {/* Place Order */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={creatingOrder}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {creatingOrder ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-gray-400">
                  Secure checkout • Fast delivery
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

