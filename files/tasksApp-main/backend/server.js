import app from "./app.js";
import "express-async-errors";
import sequelize from "./database/connection.js";

//Table models (sequelize)
import "./models/project.model.js";
import "./models/task.model.js";

const port = process.env.PORT || 3809;

process
  .on("SIGTERM", shutdown("SIGTERM"))
  .on("SIGINT", shutdown("SIGINT"))
  .on("uncaughtException", shutdown("uncaughtException"));

function shutdown(signal) {
  return (err) => {
    console.log(`${signal}...`);
    if (err) console.error(err.stack || err);
    setTimeout(() => {
      console.log("...waited 5s, exiting.");
      process.exit(err ? 1 : 0);
    }, 5000).unref();
  };
}

// Initializes the server
const main = async () => {
  try {
    await sequelize.sync();
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (error) {
    console.log("could not start server", error);
  }
};

main();
