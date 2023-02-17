import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  // const response = await axios.delete(`http://localhost:3005/users/${user.id}`);
  // return response.data; // doesnt contain the user details. payload becomes an empty object.
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  await pause(1000); // DEV only

  return user; // so we return user.
});

// DEV only
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { removeUser };
