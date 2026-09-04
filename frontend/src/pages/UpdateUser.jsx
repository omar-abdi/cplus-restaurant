import { useEffect, useState } from "react";
import { ArrowLeft, Save, ShieldCheck, UserRound } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api.js";

const emptyForm = { name: "", email: "", phone: "", address: "", isAdmin: false };

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const response = await API.get("/user/all");
        const user = response.data.users?.find((item) => item._id === id);

        if (!user) {
          setError("User not found.");
          return;
        }

        setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "", address: user.address || "", isAdmin: Boolean(user.isAdmin) });
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load user details.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await API.put(`/user/${id}`, form);
      setSuccess("User updated successfully.");
      setTimeout(() => navigate("/dashboard/users"), 800);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update user.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="rounded-3xl bg-white p-12 text-center text-slate-500 shadow-sm">Loading user details...</div>;

  return (
    <section className="mx-auto max-w-3xl space-y-6 pb-8">
      <Link to="/dashboard/users" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-orange-500"><ArrowLeft size={17} /> Back to all users</Link>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-6 py-7 text-white sm:px-8"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500"><UserRound size={21} /></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-orange-200">User management</p><h1 className="mt-2 text-3xl font-bold">Update user</h1><p className="mt-2 text-sm text-slate-300">Edit the user's account and contact details.</p></div>
        <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
          {error && <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>}
          {success && <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{success}</p>}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Email address" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Field label="Phone number" name="phone" value={form.phone} onChange={handleChange} required />
            <Field label="Address" name="address" value={form.address} onChange={handleChange} required />
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"><input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} className="h-4 w-4 accent-orange-500" /><ShieldCheck size={19} className="text-violet-600" /><span><span className="block text-sm font-bold text-slate-800">Administrator access</span><span className="block text-xs text-slate-500">Allow this user to manage restaurant data.</span></span></label>
          <button type="submit" disabled={saving || Boolean(error && !form.name)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"><Save size={18} />{saving ? "Saving changes..." : "Save changes"}</button>
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text", ...props }) => <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span><input name={name} type={type} {...props} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100" /></label>;

export default UpdateUser;
