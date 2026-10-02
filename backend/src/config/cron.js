import cron from "cron";
import https from "https";
import { ENV } from "./env.js";

const job = new cron.CronJob("*/14 * * * *", function () {
  if (!ENV.API_URL) {
    console.log("API_URL belum diatur, cron dilewati.");
    return;
  }

  https
    .get(ENV.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET request failed:", res.statusCode);
      }
    })
    .on("error", (error) => {
      console.error("Error while sending request:", error);
    });
});

export default job;