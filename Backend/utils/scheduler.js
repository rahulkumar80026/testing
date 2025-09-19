import cron from "node-cron";
import Menu from "../models/MenuModel.js";
import { getIo } from "../socket.js";
import moment from "moment-timezone";

/**
 * CONFIGURATION
 * -----------------
 * CUSTOM_HOUR / CUSTOM_MINUTE: Set your desired scheduler time
 * USE_SYSTEM_TIME: true → server/system time; false → fixed timezone (e.g., Asia/Kolkata)
 */
const CUSTOM_HOUR = 13; // 24-hour format
const CUSTOM_MINUTE = 22; // minute
const USE_SYSTEM_TIME = false; // true = use server time, false = use fixed timezone
const FIXED_TIMEZONE = "Asia/Kolkata"; // used only if USE_SYSTEM_TIME = false

async function ensureNextDayMenu() {
  try {
    // ✅ Determine next day name
    let nextDayName;

    if (USE_SYSTEM_TIME) {
      const now = new Date();
      const nextDay = new Date(now);
      nextDay.setDate(now.getDate() + 1);
      nextDayName = nextDay.toLocaleString("en-US", { weekday: "long" });
    } else {
      nextDayName = moment().tz(FIXED_TIMEZONE).add(1, "day").format("dddd");
    }

    // ✅ Check/create menu
    let menu = await Menu.findOne({ day: nextDayName });
    if (!menu) {
      menu = await Menu.create({
        day: nextDayName,
        slots: { Breakfast: [], Lunch: [], Snacks: [], Dinner: [] },
      });
      console.log(`✅ Created empty menu for ${nextDayName}`);
    } else {
      console.log(`ℹ️ Menu already exists for ${nextDayName}`);
    }

    // ✅ Emit update to frontend
    const io = getIo();
    io.emit("menuUpdated", { menu });
    console.log(`🔄 Emitted menuUpdated for ${nextDayName}`);
  } catch (err) {
    console.error("❌ Scheduler error:", err);
  }
}

function start() {
  const cronTime = `${CUSTOM_MINUTE} ${CUSTOM_HOUR} * * *`; // "minute hour * * *"

  cron.schedule(cronTime, ensureNextDayMenu, {
    timezone: USE_SYSTEM_TIME ? undefined : FIXED_TIMEZONE,
  });

  console.log(
    `🚀 Scheduler started (runs daily at ${CUSTOM_HOUR}:${CUSTOM_MINUTE} ${
      USE_SYSTEM_TIME ? "(system time)" : FIXED_TIMEZONE
    })`
  );
}

export default { start, ensureNextDayMenu };
