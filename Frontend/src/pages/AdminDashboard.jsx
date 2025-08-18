import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [meals, setMeals] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // If no token, redirect to login
  useEffect(() => {
    if (!token) navigate("/admin");
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await API.get("/meals");
      setMeals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return alert("Please choose an Excel file");
    const formData = new FormData();
    formData.append("file", file);
    try {
      await API.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      alert("Excel uploaded successfully");
      fetchMeals();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDownload = () => {
    window.open("http://localhost:4000/api/admin/download", "_blank");
  };

  const handleEdit = async (id, updatedMeal) => {
    try {
      await API.put(`/admin/edit/${id}`, updatedMeal, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Meal updated");
      fetchMeals();
    } catch (err) {
      console.error(err);
      alert("Edit failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* File Upload */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          onClick={handleFileUpload}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload Excel
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>
      </div>

      {/* Meals Table */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Breakfast</th>
            <th className="border p-2">Lunch</th>
            <th className="border p-2">Dinner</th>
            <th className="border p-2">Snack</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <MealRow key={meal._id} meal={meal} onSave={handleEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MealRow({ meal, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [updatedMeal, setUpdatedMeal] = useState(meal);

  const handleChange = (e) => {
    setUpdatedMeal({ ...updatedMeal, [e.target.name]: e.target.value });
  };

  return (
    <tr>
      <td className="border p-2">{meal.date}</td>
      <td className="border p-2">
        {editMode ? (
          <input
            name="breakfast"
            value={updatedMeal.breakfast}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          meal.breakfast
        )}
      </td>
      <td className="border p-2">
        {editMode ? (
          <input
            name="lunch"
            value={updatedMeal.lunch}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          meal.lunch
        )}
      </td>
      <td className="border p-2">
        {editMode ? (
          <input
            name="dinner"
            value={updatedMeal.dinner}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          meal.dinner
        )}
      </td>
      <td className="border p-2">
        {editMode ? (
          <input
            name="snack"
            value={updatedMeal.snack}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          meal.snack
        )}
      </td>
      <td className="border p-2">
        {editMode ? (
          <button
            onClick={() => {
              onSave(meal._id, updatedMeal);
              setEditMode(false);
            }}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
        )}
      </td>
    </tr>
  );
}
