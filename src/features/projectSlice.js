import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const apiUrl = "http://localhost:3000/api/projects";

const apiUrl ="https://erms-be.vercel.app/api/projects"

// Thunk create project

export const projectCreate = createAsyncThunk(
  "project/create",
  async (projectData, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}`, projectData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const { message, project } = response.data;
      return { message, project };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Project creation failed"
      );
    }
  }
);

// Thunk get project

export const fetchProject = createAsyncThunk(
  "project/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}`);
      const projects = response.data;
      return projects;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Project fetch failed"
      );
    }
  }
)


export const fetchProjectById = createAsyncThunk(
  "projectWithId/fetch",
  async (projectId, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}/${projectId}`);
      const projects = response.data;
      return projects;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Project fetch failed"
      );
    }
  }
)




const projectSlice = createSlice({
  name: "projectState",
  initialState: {
    projects: [],
    projectById: {},
    createStatus: "idle",
    createMessage: null,
    createError: null,
    fetchStatus: "idle",
    fetchMessage: null,
    fetchError: null,
    fetchByIdStatus: "idle",
    fetchByIdMessage: null,
    fetchByIdError: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {

    //create projects
    builder.addCase(projectCreate.pending, (state) => {
      state.createStatus = "loading";
      state.createError = null;
    })
    builder.addCase(projectCreate.fulfilled, (state,action) => {
      state.createStatus = "success";
      state.createMessage = action.payload.message
      state.projects = [...state.projects,action.payload.project]
      state.createError = null;
    })
    builder.addCase(projectCreate.rejected, (state,action) => {
      state.createStatus = "reject";
      state.createError = action.payload
    })


    //fetch projects
    builder.addCase(fetchProject.pending, (state) => {
      state.fetchStatus = "loading";
      state.fetchError = null;
    })
    builder.addCase(fetchProject.fulfilled, (state,action) => {
      state.fetchStatus = "success";
      state.projects = action.payload
      state.fetchError = null;
    })
    builder.addCase(fetchProject.rejected, (state,action) => {
      state.fetchStatus = "reject";
      state.fetchError = action.payload
    })

    //fetch projects by Id
    builder.addCase(fetchProjectById.pending, (state) => {
      state.fetchByIdStatus = "loading";
      state.fetchByIdError = null;
    })
    builder.addCase(fetchProjectById.fulfilled, (state,action) => {
      state.fetchByIdStatus = "success";
      state.projectById = action.payload
      state.fetchByIdError = null;
    })
    builder.addCase(fetchProjectById.rejected, (state,action) => {
      state.fetchByIdStatus = "reject";
      state.fetchByIdError = action.payload
    })
    
  }
});

export const { } = projectSlice.actions;
export default projectSlice.reducer;
