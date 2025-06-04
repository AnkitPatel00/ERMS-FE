import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const apiUrl = "http://localhost:3000/api/engineers";

const apiUrl = "https://erms-be.vercel.app/api/engineers"

// Thunk to fetch in engineer
export const fetchEngineer = createAsyncThunk(
  "engineer/fetch",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${apiUrl}`, {
        headers: {
          Authorization: token, 
        },
      });

      return response.data; // array of engineers
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch engineers"
      );
    }
  }
);

const engineerSlice = createSlice({
  name: "engineerState",
  initialState: {
    engineers : [],
    fetchEngineerStatus: "idle",
    engineerError: null,
    engineerMessage: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {

    //fetch engineer

    builder.addCase(fetchEngineer.pending, (state) => {
        state.fetchEngineerStatus = "loading";
        state.engineerError = null;
      })
    builder.addCase(fetchEngineer.fulfilled, (state, action) => {
        state.fetchEngineerStatus = "success";
        state.engineers = action.payload;
        state.engineerError = null;
      })
    builder.addCase(fetchEngineer.rejected, (state, action) => {
        state.fetchEngineerStatus = "reject";
        state.engineerError = action.payload;
      });
    
    
  }
});

export const {} = engineerSlice.actions;
export default engineerSlice.reducer;
