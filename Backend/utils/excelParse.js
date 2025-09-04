import xlsx from "xlsx";

const days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];

// 🔹 Parse Excel file into JSON (array of rows)
export function parseExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

// 🔹 Parse menu items from cell
export function parseItems(cell) {
  if (!cell) return [];
  return cell
    .toString()
    .split(/[,\n]/)
    .map((i) => i.trim())
    .filter((i) => i && i.toUpperCase() !== "NA" && i !== "-");
}

// 🔹 Get Date for Day
export function getDateForDay(day) {
  const today = new Date();
  const todayIndex = today.getDay(); // 0=Sunday
  const targetIndex = days.indexOf(day);
  const diff = (targetIndex - todayIndex + 7) % 7;
  today.setDate(today.getDate() + diff);
  today.setHours(0,0,0,0);
  return today;
}

export { days };