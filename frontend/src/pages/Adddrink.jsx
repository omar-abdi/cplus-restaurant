
import { useRef, useState } from "react";
import axios from "axios";
import { ImagePlus, Upload, X } from "lucide-react";

const Adddrink = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open file chooser
  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  // Upload image to Cloudinary
  const handleChangeFile = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Fadlan dooro image sax ah.");
      return;
    }

    // Check file size - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image-ku waa inuu ka yar yahay 5MB.");
      return;
    }

    setUploading(true);
    setUploadError("");
    setMessage("");

    try {
      const data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "upload_preset");
      data.append("api_key", import.meta.env.CLOUDINARY_API )

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/douofotna/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error?.message || "Image upload failed"
        );
      }

      const uploadedUrl =
        result?.secure_url || result?.url || "";

      if (!uploadedUrl) {
        throw new Error("Cloudinary image URL lama helin.");
      }

      // Save Cloudinary URL inside formData
      setFormData((prev) => ({
        ...prev,
        image: uploadedUrl,
      }));
    } catch (error) {
      console.log(error);

      setUploadError(
        error.message || "Image upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Save food
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/drinks/add`,
        {
          ...formData,
          price: Number(formData.price),
        },
        {
          withCredentials: true,
        }
      );

      setMessage(
        "Cuntada si guul leh ayaa loo daray!"
      );

      setFormData({
        name: "",
        price: "",
        description: "",
        image: "",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Failed to add food"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-[#C98A3D]">
          Food
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[#2B1B14]">
          Ku dar cabitaan 
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Ku dar magaca, qiimaha, description-ka iyo sawirka
          cuntada.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl border border-[#2B1B14]/10 bg-white p-6 shadow-sm"
      >
        {/* Name */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2B1B14]/60">
            Magaca
          </label>

          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#2B1B14]/15 px-4 py-3 text-sm outline-none focus:border-[#C98A3D]"
            placeholder="Tusaale: Chicken Burger"
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2B1B14]/60">
            Qiimaha ($)
          </label>

          <input
            required
            type="number"
            min="0"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-[#2B1B14]/15 px-4 py-3 text-sm outline-none focus:border-[#C98A3D]"
            placeholder="12.99"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2B1B14]/60">
            Sharaxaad
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border border-[#2B1B14]/15 px-4 py-3 text-sm outline-none focus:border-[#C98A3D]"
            placeholder="Sharaxaad gaaban..."
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#2B1B14]/60">
            Food Image
          </label>

          {/* Hidden input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChangeFile}
            className="hidden"
          />

          {/* Upload button */}
          {!formData.image && (
            <button
              type="button"
              onClick={handleChooseFile}
              disabled={uploading}
              className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-[#C98A3D] hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500 transition group-hover:scale-105">
                {uploading ? (
                  <Upload
                    size={25}
                    className="animate-bounce"
                  />
                ) : (
                  <ImagePlus size={25} />
                )}
              </div>

              <p className="mt-4 text-sm font-bold text-slate-800">
                {uploading
                  ? "Uploading image..."
                  : "Choose food image"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                PNG, JPG, JPEG • Max 5MB
              </p>
            </button>
          )}

          {/* Image Preview */}
          {formData.image && (
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={formData.image}
                alt={formData.name || "Food preview"}
                className="h-64 w-full object-cover"
              />

              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:bg-red-500"
              >
                <X size={17} />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10">
                <p className="text-xs font-medium text-white">
                  Image uploaded successfully
                </p>
              </div>
            </div>
          )}

          {/* Upload Error */}
          {uploadError && (
            <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {uploadError}
            </p>
          )}
        </div>

        {/* Success */}
        {message && (
          <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || uploading || !formData.image}
          className="w-full rounded-xl bg-[#2B1B14] py-3 text-sm font-semibold text-white transition hover:bg-[#C98A3D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : uploading
            ? "Uploading image..."
            : "Save Food"}
        </button>
      </form>
    </div>
  );
};

export default Adddrink;

