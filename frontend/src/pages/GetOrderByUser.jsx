import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  Package,
  ShoppingBag,
  MapPin,
  Phone,
} from "lucide-react";
import storeUser from "../zustand/user";

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount || 0));

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-sky-50 text-sky-700",
  preparing: "bg-violet-50 text-violet-700",
  ready: "bg-indigo-50 text-indigo-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-rose-50 text-rose-700",
};

const GetOrderByUser = () => {
  const { user } = storeUser();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?._id) return;

    const getOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/order/user/${user._id}`,
          {
            withCredentials: true,
          }
        );

        setOrders(response.data.orders || []);
      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Failed to retrieve your orders"
        );
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [user?._id]);

  // User ma login-gareyn
  if (!user) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <ShoppingBag className="mx-auto text-orange-500" size={40} />

        <h2 className="mt-4 text-xl font-bold text-slate-900">
          Login required
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Please login to view your orders.
        </p>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-3xl bg-white shadow-sm">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-rose-600">
          Unable to load orders
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6">

      {/* Header */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 shadow-lg">
              <ShoppingBag size={21} />
            </div>

            <p className="text-sm font-semibold text-orange-400">
              My account
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              My Orders
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Track and review your restaurant orders.
            </p>
          </div>

          {/* Total */}
          <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Total orders
            </p>

            <p className="mt-1 text-3xl font-bold">
              {orders.length}
            </p>
          </div>
        </div>
      </div>

      {/* No orders */}
      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
            <Package size={27} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {orders.map((order) => (
            <article
              key={order._id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >

              {/* Order header */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Order
                  </p>

                  <h2 className="mt-1 font-bold text-slate-900">
                    #{order._id?.slice(-6).toUpperCase()}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays size={14} />

                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                    statusStyles[order.status] ||
                    statusStyles.pending
                  }`}
                >
                  {order.status || "pending"}
                </span>
              </div>

              {/* Order content */}
              <div className="p-5 sm:p-6">

                {/* Customer */}
                <div className="mb-5 rounded-2xl bg-slate-50 p-4">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {user.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        Your order
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">

                    {user.address && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={15} />
                        {user.address}
                      </div>
                    )}

                    {user.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={15} />
                        {user.phone}
                      </div>
                    )}

                  </div>
                </div>

                {/* Items */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">
                      Ordered items
                    </h3>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {order.items?.length || 0} items
                    </span>
                  </div>

                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                      >

                        <div className="flex items-center gap-3">

                          <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-orange-100 px-2 text-xs font-bold text-orange-600">
                            {item.quantity}x
                          </span>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {item.name}
                            </p>

                            {item.itemModel && (
                              <p className="text-xs text-slate-400">
                                {item.itemModel}
                              </p>
                            )}
                          </div>

                        </div>

                        <p className="font-bold text-slate-800">
                          {formatMoney(
                            item.price * item.quantity
                          )}
                        </p>

                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-orange-50 px-5 py-4">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">
                      Order total
                    </p>

                    <p className="mt-1 text-2xl font-bold text-orange-600">
                      {formatMoney(order.totalPrice)}
                    </p>
                  </div>

                  <ShoppingBag
                    size={24}
                    className="text-orange-400"
                  />
                </div>

              </div>
            </article>
          ))}

        </div>
      )}
    </section>
  );
};

export default GetOrderByUser;