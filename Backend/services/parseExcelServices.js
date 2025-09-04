
import ExcelJS from "exceljs";

export async function parseMenu(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.worksheets[0];

  // Read days from header row (first row)
  const headerRow = sheet.getRow(1);
  const days = [];
  headerRow.eachCell((cell, colNumber) => {
    if (colNumber > 1 && cell.value) {
      days.push(cell.value.toString().trim());
    }
  });

  // Initialize menu
  const menu = {};
  days.forEach((day) => {
    menu[day] = { Breakfast: [], Lunch: [], Snacks: [], Dinner: [] };
  });

  const mealMap = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    snacks: "Snacks",
    dinner: "Dinner",
  };

  let currentMeal = null;

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const firstCell =
      row.getCell(1).value?.toString().trim().toLowerCase() || "";

    // Flexible meal detection
    for (const key of Object.keys(mealMap)) {
      if (firstCell.includes(key)) {
        currentMeal = mealMap[key];
        break;
      }
    }

    if (!currentMeal) return; // skip rows that are not meal slots

    // Fill dishes
    days.forEach((day, idx) => {
      const cellValue = row.getCell(idx + 2).value;
      if (cellValue) {
        const dish = cellValue.toString().trim();
        if (dish && dish.toUpperCase() !== "N/A") {
          menu[day][currentMeal].push(dish);
        }
      }
    });
  });

  const menus = Object.entries(menu).map(([day, slots]) => ({ day, slots }));
  console.log("✅ Parsed menus from Excel:");
  console.dir(menus, { depth: null, colors: true });

  return menus;
}
