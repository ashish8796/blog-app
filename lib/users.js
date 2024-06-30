import sql from "../db.js";
import { getNonEmptyFields } from "../helper/queryHelper.js";

const find = async (params) => {
  try {
    if (params) {
    } else {
      return await sql`
     SELECT * FROM users;
    `;
    }
  } catch (error) {
    console.log("Error finding users: ", error);
    throw error;
  }
};

const create = async (data) => {
  const obj = getNonEmptyFields(data);

  try {
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    return await sql`
      INSERT INTO users ${sql(keys)} VALUES ${sql(values)}
      RETURNING *
  `;
  } catch (error) {
    console.log("Error creating user: ", error);
    throw error;
  }
};

const User = {
  find,
  create,
};

export default User;
