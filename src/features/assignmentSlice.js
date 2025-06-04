import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// const apiUrl = "http://localhost:3000/api/assignments";
const apiUrl = "https://erms-be.vercel.app/api/assignments"

// Thunk create assignment

export const assignmentCreate = createAsyncThunk(
  "assignment/create",
  async (assignmentData, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}`, assignmentData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const { message, assignment } = response.data;
      console.log(assignment)
      return { message, assignment };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Assignment creation failed"
      );
    }
  }
);


// Thunk get assignment

export const fetchAssignment = createAsyncThunk(
  "assignment/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}`, {
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


// Thunk get assignment

export const deleteAssignment = createAsyncThunk(
  "assignment/delete",
  async (assignmentId, thunkAPI) => {
    try {
      const response = await axios.delete(`${apiUrl}/${assignmentId}`, {
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



const assignmentSlice = createSlice({
  name: "assignmentState",
  initialState: {
    assignments: [],
    createStatus: "idle",
    createMessage: null,
    createError: null,
    fetchStatus: "idle",
    fetchMessage: null,
    fetchError: null,
    deleteStatus: "idle",
    deleteMessage: null,
    deleteError: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {

    //create assignment
    builder.addCase(assignmentCreate.pending, (state) => {
      state.createStatus = "loading";
      state.createError = null;
    })
    builder.addCase(assignmentCreate.fulfilled, (state,action) => {
      state.createStatus = "success";
      state.createMessage = action.payload.message
      state.assignments = [...state.assignments,action.payload.assignment]
      state.createError = null;
    })
    builder.addCase(assignmentCreate.rejected, (state,action) => {
      state.createStatus = "reject";
      state.createError = action.payload
    })


    //fetch assignment
    builder.addCase(fetchAssignment.pending, (state) => {
      state.fetchStatus = "loading";
      state.fetchError = null;
    })
    builder.addCase(fetchAssignment.fulfilled, (state,action) => {
      state.fetchStatus = "success";
      state.assignments = action.payload
      state.fetchError = null;
    })
    builder.addCase(fetchAssignment.rejected, (state,action) => {
      state.fetchStatus = "reject";
      state.fetchError = action.payload
    })


    //delete assignment
    builder.addCase(deleteAssignment.pending, (state) => {
      state.deleteStatus = "loading";
      state.deleteError = null;
    })
    builder.addCase(deleteAssignment.fulfilled, (state,action) => {
      state.deleteStatus = "success";
      state.deleteMessage = action.payload.message
      state.assignments = state.assignments.filter(({_id})=>_id!=action.payload.id)
      state.deleteError = null;
    })
    builder.addCase(deleteAssignment.rejected, (state,action) => {
      state.deleteStatus = "reject";
      state.deleteError = action.payload
    })
    
    
  }
});

export const { } = assignmentSlice.actions;
export default assignmentSlice.reducer;
