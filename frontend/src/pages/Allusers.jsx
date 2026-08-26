import { useEffect, useMemo, useState } from "react";
import { Mail, MapPin, Phone, Search, ShieldCheck, UsersRound } from "lucide-react";
import storeUser from "../zustand/user";

const getInitials = (name) =>
  (name || "?")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Allusers = () => {
  const { getAllUsers, loading, error } = storeUser();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };

    loadUsers();
  }, [getAllUsers]);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;

    return users.filter((user) =>
      [user.name, user.email, user.phone, user.address]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [search, users]);

  return (
    <section className="mx-auto max-w-7xl space-y-6 pb-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-6 py-7 text-white shadow-xl sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-950/30"><UsersRound size={21} /></div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-200">Restaurant dashboard</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">All users</h1>
            <p className="mt-2 text-sm text-slate-300">View your registered customers and administrators.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-sm"><p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Registered users</p><p className="mt-1 text-2xl font-bold">{users.length}</p></div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="font-bold text-slate-900">User directory</h2><p className="mt-1 text-sm text-slate-500">{filteredUsers.length} users shown</p></div>
        <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-400 sm:max-w-sm"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email or phone..." className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" /></label>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">Loading users...</div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{error}</div>
      ) : filteredUsers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">No users found.</div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.4fr_1.4fr_1.2fr_1.7fr_0.7fr] gap-4 border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 lg:grid"><span>User</span><span>Email</span><span>Phone</span><span>Address</span><span>Role</span></div>
          <div className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <article key={user._id} className="grid gap-4 px-5 py-5 transition hover:bg-slate-50 lg:grid-cols-[1.4fr_1.4fr_1.2fr_1.7fr_0.7fr] lg:items-center lg:px-6">
                <div className="flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm font-bold text-white">{getInitials(user.name)}</span><div className="min-w-0"><p className="truncate font-bold text-slate-800">{user.name}</p><p className="mt-0.5 text-xs text-slate-400">Joined {new Date(user.createdAt).toLocaleDateString()}</p></div></div>
                <p className="flex items-center gap-2 break-all text-sm text-slate-600"><Mail size={15} className="shrink-0 text-slate-400 lg:hidden" />{user.email}</p>
                <p className="flex items-center gap-2 text-sm text-slate-600"><Phone size={15} className="shrink-0 text-slate-400 lg:hidden" />{user.phone || "—"}</p>
                <p className="flex items-start gap-2 text-sm text-slate-600"><MapPin size={15} className="mt-0.5 shrink-0 text-slate-400 lg:hidden" />{user.address || "—"}</p>
                <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${user.isAdmin ? "bg-violet-50 text-violet-700" : "bg-emerald-50 text-emerald-700"}`}>{user.isAdmin && <ShieldCheck size={14} />}{user.isAdmin ? "Admin" : "Customer"}</span>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Allusers;
