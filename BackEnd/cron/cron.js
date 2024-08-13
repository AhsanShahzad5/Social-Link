import cron from "cron";
import https from "https";

//using cron job will allow us to not have that inactivity render thing , we will keep sending get requests after some interval , every 30 minutes in our case. 
//this will mean that since render assums us inactive if we dont viist within 50 minutes , that wont happen
const URL = "https://social-link-iz2i.onrender.com/";

const job = new cron.CronJob("*/30 * * * *", function () {
	https
		.get(URL, (res) => {
			if (res.statusCode === 200) {
				console.log("GET request sent successfully");
			} else {
				console.log("GET request failed", res.statusCode);
			}
		})
		.on("error", (e) => {
			console.error("Error while sending request", e);
		});
});

export default job;

