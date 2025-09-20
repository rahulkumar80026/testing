import { useState } from "react";
import { Upload, Download } from "lucide-react";
import { toast } from "react-toastify";
import API from "../../services/api";
import axios from "axios";

const UpdateMenu = ({ onMenuUpdate }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/api/menu-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    //  try{
    //   const res = await axios.post("http://localhost:4000/api/menu-upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
      toast.success(res.data?.message || "File uploaded successfully!");
      setFile(null);

      // ✅ Clear file input manually
      document.getElementById("menu-upload-input").value = "";

      // ✅ Upload ke turant baad refresh
      if (onMenuUpdate) {
        await onMenuUpdate();
      }
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(err.response?.data?.error || "Upload failed!");
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await API.get("/download-menu", {
        responseType: "blob", // 👈 ensures binary
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  return (
    <div className="flex flex-col w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Update Menu</h1>
        <button
          onClick={handleDownloadTemplate}
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Download <Download className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed p-12 rounded-xl bg-gray-50">
        <label className="cursor-pointer flex flex-col items-center gap-3">
          <Upload className="w-14 h-14 text-orange-500" />
          <span>{file ? "Change File" : "Click or Drag & Drop"}</span>
          <input
            type="file"
             id="menu-upload-input"   // ✅ add this
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {file && <p>Selected: {file.name}</p>}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={handleUpload}
          className="w-1/3 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
        >
          Update Menu
        </button>
      </div>
    </div>
  );
};

export default UpdateMenu;
