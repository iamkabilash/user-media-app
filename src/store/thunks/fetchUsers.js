import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  await pause(1000); // DEV only

  return response.data; // this will get auto-assigned to the payload prop of fulfilled action
});

// DEV only
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };

//async thunks auto adds 3 variables now, which we can use in slices.
// fetchUsers.pending = "users/fetch/pending"
// fetchUsers.fulfilled = "users/fetch/fulfilled"
// fetchUsers.rejected = "users/fetch/rejected"
