// controllers/menuController.js
import Menu from "../models/MenuModel.js";
import { parseMenu } from "../services/parseExcelServices.js";
import fs from "fs";
import ExcelJS from "exceljs";
import { getIo } from "../socket.js"; // yaha import kiya

// Upload Excel
export const uploadMenu = async (req, res) => {
  try {
     const filePath = req.file.path;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const menus = await parseMenu(filePath);

    // Clear old menu & insert new
    await Menu.deleteMany({});
    await Menu.insertMany(menus);

    //  ✅ File delete kar do (important)
    fs.unlink(filePath, (err) => {
      if (err) console.error("❌ Error deleting uploaded file:", err);
      else console.log("🗑 Deleted uploaded file:", filePath);
    });

    //  Emit socket event
    getIo().emit("menuUpdated", { success: true });

    res.status(200).json({ success: true, menus });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload menu" });
  }
};

// Get today's menu
export const getTodayMenu = async (req, res) => {
  try {
    const today = new Date();
    const dayName = today.toLocaleString("en-US", { weekday: "long" });

    const menu = await Menu.findOne({ day: dayName });
    if (!menu)
      return res.status(404).json({ message: "Menu not found for today" });

    res.status(200).json(menu);
  } catch (err) {
    console.error("Fetch today menu error:", err);
    res.status(500).json({ message: "Failed to fetch today's menu" });
  }
};

// Download Excel
export const downloadMenu = async (req, res) => {
  try {
    const menus = await Menu.find();

    // Sort days Mon → Sun
    const dayOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    menus.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Menu Data");

    worksheet.columns = [
      { header: "Day", key: "day", width: 15 },
      { header: "Breakfast", key: "Breakfast", width: 40 },
      { header: "Lunch", key: "Lunch", width: 40 },
      { header: "Snacks", key: "Snacks", width: 40 },
      { header: "Dinner", key: "Dinner", width: 40 },
    ];

    menus.forEach((menu) => {
      worksheet.addRow({
        day: menu.day,
        Breakfast: (menu.slots?.Breakfast || []).join(", "),
        Lunch: (menu.slots?.Lunch || []).join(", "),
        Snacks: (menu.slots?.Snacks || []).join(", "),
        Dinner: (menu.slots?.Dinner || []).join(", "),
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=menu.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "Failed to generate Excel" });
  }
};
