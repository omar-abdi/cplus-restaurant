import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  UserRound,
  Utensils,
} from "lucide-react";
import storeUser from "../zustand/user";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-sky-50 text-sky-700 border-sky-200",
  preparing: "bg-violet-50 text-violet-700 border-violet-200",
  ready: "bg-indigo-50 text-indigo-700 border-indigo-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount || 0));

const getInitials = (name) =>
  (name || "?")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Notice = ({ title, message, error, loading }) => (
  <div className="flex min-h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
    <div>
      <div
        className={`mx-auto h-10 w-10 rounded-full border-4 ${
          error
            ? "border-rose-100 border-t-rose-500"
            : "border-orange-100 border-t-orange-500"
        } ${loading ? "animate-spin" : ""}`}
      />

      <h2 className="mt-4 text-lg font-bold text-slate-900">
        {title}
      </h2>

      <p
        className={`mt-1 text-sm ${
          error ? "text-rose-600" : "text-slate-500"
        }`}
      >
        {message}
      </p>
    </div>
  </div>
);

const GetOrders = () => {
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
          "http://localhost:5000/api/order/all",
          {
            withCredentials: true,
          }
        );

        setOrders(response.data.orders || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Failed to retrieve orders"
        );
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [user?._id]);

  if (!user) {
    return (
      <Notice
        title="Login required"
        message="Please login to view orders."
      />
    );
  }

  if (loading) {
    return (
      <Notice
        title="Loading orders"
        message="Orders are being retrieved..."
        loading
      />
    );
  }

  if (error) {
    return (
      <Notice
        title="Unable to load orders"
        message={error}
        error
      />
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-6 pb-10">

      {/* ================= HEADER ================= */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-6 py-7 text-white shadow-xl sm:px-8">

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/30">
              <ShoppingBag size={21} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Restaurant Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Customer Orders
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              Monitor customer information, ordered items,
              payments and order status from one place.
            </p>
          </div>

          {/* Total */}
          <div className="min-w-[170px] rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Orders
            </p>

            <p className="mt-1 text-3xl font-bold">
              {orders.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Customer orders
            </p>
          </div>

        </div>
      </div>

      {/* ================= EMPTY ================= */}
      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
            <Package size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            New customer orders will appear here.
          </p>

        </div>
      ) : (

        /* ================= ORDERS ================= */
        <div className="space-y-5">

          {orders.map((order) => (

            <article
              key={order._id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >

              {/* ================= ORDER TOP ================= */}
              <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <Package size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Order
                    </p>

                    <h2 className="text-lg font-bold text-slate-900">
                      #{order._id?.slice(-6).toUpperCase()}
                    </h2>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <CalendarDays size={13} />

                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </div>
                  </div>

                </div>

                <span
                  className={`w-fit rounded-full border px-4 py-2 text-xs font-bold capitalize ${
                    statusStyles[order.status] ||
                    statusStyles.pending
                  }`}
                >
                  {order.status || "pending"}
                </span>

              </div>

              {/* ================= MAIN CONTENT ================= */}
              <div className="grid lg:grid-cols-[320px_1fr]">

                {/* ================= CUSTOMER ================= */}
                <div className="border-b border-slate-100 bg-slate-50/70 p-5 lg:border-b-0 lg:border-r sm:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white shadow-md shadow-orange-200">
                      {getInitials(order.user?.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Customer
                      </p>

                      <h3 className="truncate text-base font-bold text-slate-900">
                        {order.user?.name || "Unknown customer"}
                      </h3>
                    </div>

                  </div>

                  <div className="mt-6 space-y-3">

                    {/* Phone */}
                    <div className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200/70">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                        <Phone size={15} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Phone
                        </p>

                        <p className="truncate text-sm font-medium text-slate-700">
                          {order.user?.phone || "No phone"}
                        </p>
                      </div>

                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3 rounded-xl bg-white p-3 ring-1 ring-slate-200/70">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                        <MapPin size={15} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Delivery Address
                        </p>

                        <p className="mt-0.5 text-sm font-medium text-slate-700">
                          {order.user?.address || "No address"}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* ================= ORDER DETAILS ================= */}
                <div className="p-5 sm:p-6">

                  <div className="mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                      <Utensils
                        size={17}
                        className="text-orange-500"
                      />

                      <h3 className="text-sm font-bold text-slate-800">
                        Ordered Items
                      </h3>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {order.items?.length || 0} items
                    </span>

                  </div>

                  {/* Items */}
                  <div className="space-y-2">

                    {order.items?.map((item) => (

                      <div
                        key={item._id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3"
                      >

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-orange-100 px-2 text-xs font-bold text-orange-600">
                         quantity   {item.quantity} 
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-slate-800">
                              {item.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {item.itemModel} ·{" "}
                              {formatMoney(item.price)} each
                            </p>

                          </div>

                        </div>

                        <p className="shrink-0 text-sm font-bold text-blue-900">
                          {formatMoney(
                            item.price * item.quantity
                          )}
                        </p>

                      </div>

                    ))}

                  </div>

                  {/* Total */}
                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 px-5 py-4">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-700">
                        Order Total
                      </p>

                      <p className="mt-1 text-2xl font-bold text-orange-600">
                        {formatMoney(order.totalPrice)}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                      <ChevronRight size={19} />
                    </div>

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>
      )}

    </section>
  );
};

export default GetOrders;