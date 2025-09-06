import cron from "node-cron";
import Menu from "../models/MenuModel.js";

// 👉 Common function jo kal ka menu ensure kare
async function ensureNextDayMenu() {
  try {
    console.log("⏰ Scheduler running - ensuring next day's menu");

    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);

    // Kal ka weekday (e.g. Monday, Tuesday)
    const dayName = nextDay.toLocaleString("en-US", { weekday: "long" });

    // Agar kal ka menu missing hai to blank create karo
    const exists = await Menu.findOne({ day: dayName });
    if (!exists) {
      await Menu.create({
        day: dayName,
        slots: {
          Breakfast: [],
          Lunch: [],
          Snacks: [],
          Dinner: [],
        },
      });
      console.log(`✅ Created empty menu for ${dayName}`);
    } else {
      console.log(`ℹ️ Menu already exists for ${dayName}`);
    }
  } catch (err) {
    console.error("❌ Scheduler error:", err);
  }
}

function start() {
  // 🔥 TESTING MODE: har next day 5 min  me chalega
  cron.schedule("5 0 * * * ", ensureNextDayMenu, {
    timezone: process.env.TIMEZONE || "UTC",
  });

  console.log("🚀 Scheduler started (runs every 10 seconds in testing mode)");
}

export default { start, ensureNextDayMenu };
