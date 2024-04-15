if (process.env.MONGODB_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "SEEDING MONGODB PRODUCTION DATABASE!!!\n".repeat(3)
  );
  console.log("\x1b[31m%s\x1b[0m", "Don't forget to clear MONGODB_URI!\n");
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Run 'export MONGODB_URI=' or close this terminal after seeding.",
    "\n"
  );
} else {
  console.log("\x1b[33m%s\x1b[0m", "SEEDING MONGODB LOCAL DB");
}

const { User, Goal } = require("../models");
const { connection } = require("../config/connection");

connection.once("open", async function () {
  // insert a sample user
  await User.create({ username: "banana", password: "meatloaf" });

  /*const goals = await Goal.create([
    {
      title: "Get through the day",
      description:
        "Phasellus a rutrum lacus. Donec vitae ultrices nibh.",
      createdAt: new Date("01/16/2024 8:56 AM EST").getTime()
    },
    {
      title: "Fight a bear (without dying)",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      createdAt: new Date("05/02/2003 8:56 AM EST").getTime()
    }
  ]);

  await Promise.all(goals.map((goals) => goals.save()));*/

  connection.close();
});
