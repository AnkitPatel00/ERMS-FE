import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const apiUrl = "http://localhost:3000/api/assignments";

const apiUrl = "https://erms-be.vercel.app/api/assignments"

// Thunk get assignment

export const fetchAssignmentWithEngineer = createAsyncThunk(
  "assignment/fetch",
  async (engineerId, thunkAPI) => {
  
    try {
      const response = await axios.get(`${apiUrl}/${engineerId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data; // returns the assignments array
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Fetching assignments failed"
      );
    }
  }
);


const engineerAssignmentSlice = createSlice({
  name: "engineerAssignmentState",
  initialState: {
    assignments: [],
    fetchStatus: "idle",
    fetchMessage: null,
    fetchError: null
  },
  reducers: {
   
  },
  extraReducers: (builder) => {

    //fetch assignment
    builder.addCase(fetchAssignmentWithEngineer.pending, (state) => {
      state.fetchStatus = "loading";
      state.fetchError = null;
    })
    builder.addCase(fetchAssignmentWithEngineer.fulfilled, (state,action) => {
      state.fetchStatus = "success";
      state.assignments = action.payload
      state.fetchError = null;
    })
    builder.addCase(fetchAssignmentWithEngineer.rejected, (state,action) => {
      state.fetchStatus = "reject";
      state.fetchError = action.payload
    })
    
  }
});

export const { } = engineerAssignmentSlice.actions;
export default engineerAssignmentSlice.reducer;
