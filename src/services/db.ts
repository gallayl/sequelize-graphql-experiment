import { Sequelize } from "sequelize";
import { seed } from "./seed";

// Option 1: Passing a connection URI
export const defaultDb = new Sequelize({
  dialect: "sqlite",
  storage: "data.sqlite",
}); // Example for sqlite

(async () => {
  try {
    await defaultDb.authenticate();
    console.log("DB auth completed");
    await defaultDb.sync();
    console.log("DB sync completed");
    await seed();
    console.log("DB Seed completed");
  } catch (error) {
    console.error("Something terrible happened. Exiting...", error);
    process.exit(1);
  }
})();
