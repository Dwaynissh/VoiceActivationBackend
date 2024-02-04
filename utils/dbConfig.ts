import { connect } from "mongoose";
import env from "dotenv";

env.config();

export const dbConfig = async () => {
  try {
    await connect(process.env.LOCAL_DATABASE_URL!)
      .then(() => {
        console.log("Database Connected... ⚡⚡");
      })
      .catch(() => console.error());
  } catch (error) {
    return error;
  }
};
