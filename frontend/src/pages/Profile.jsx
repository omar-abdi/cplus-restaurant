
import { Mail, User, ShieldCheck } from "lucide-react";
import storeUser from "../zustand/user";

const Profile = () => {
  const { user } = storeUser();

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Please login
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            You need to login to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const initials = (user.name || "U")
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="mx-auto max-w-4xl px-4 pb-10">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[3px] text-orange-500">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View your personal account information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Top banner */}
        <div className="h-32 bg-gradient-to-r from-slate-950 via-slate-900 to-orange-600" />

        {/* Profile content */}
        <div className="px-6 pb-7 sm:px-8">
          {/* Avatar */}
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-orange-400 to-orange-600 text-2xl font-bold text-white shadow-lg">
              {initials}
            </div>

            {user.isAdmin && (
              <div className="flex w-fit items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 ring-1 ring-orange-200">
                <ShieldCheck size={15} />
                Administrator
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-slate-900">
              {user.name || "Unknown User"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Cplus Restaurant customer
            </p>
          </div>

          {/* Information */}
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                  <User size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {user.name || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                  <Mail size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email Address
                  </p>

                  <p className="mt-1 truncate font-semibold text-slate-800">
                    {user.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account status */}
          <div className="mt-5 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-4">
            <div>
              <p className="text-sm font-bold text-emerald-800">
                Account Status
              </p>

              <p className="mt-0.5 text-xs text-emerald-600">
                Your account is active
              </p>
            </div>

            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
              Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

