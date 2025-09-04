import cron from "node-cron";
import Menu from "../models/MenuModel.js";

// A simple scheduler that runs once a day at 00:05 server time
// You can customize behavior: e.g. copy forward a weekly menu, etc.
function start() {
  cron.schedule(
    "5 0 * * *", // every day at 00:05
    async () => {
      try {
        console.log("Scheduler running - ensuring menus");
        const now = new Date();

        // Set next day at 00:00
        const next = new Date(now);
        next.setDate(now.getDate() + 1);
        next.setHours(0, 0, 0, 0);

        const exists = await Menu.findOne({ date: next });
        if (!exists) {
          await Menu.create({ date: next });
          console.log("Created empty menu for", next.toISOString().slice(0, 10));
        }
      } catch (err) {
        console.error("Scheduler error", err);
      }
    },
    {
      timezone: process.env.TIMEZONE || "UTC", // make sure to set TIMEZONE in .env
    }
  );
}

export default { start };
