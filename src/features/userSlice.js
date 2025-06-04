import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const apiUrl = "http://localhost:3000/api/auth";
const apiUrl = "https://erms-be.vercel.app/api/auth";

// Thunk to log in user
export const userLogin = createAsyncThunk("user/login", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, userData);
    const { token, user } = response.data;

    // Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});


// Thunk to regsiter  user
export const userRegister = createAsyncThunk("user/register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    const { message, user } = response.data;

    return { message, user };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});


// Thunk to get user
export const fetchUser = createAsyncThunk("user/fetch", async (_,thunkAPI) => {
  try {
    const response = await axios.get(`${apiUrl}/profile`,{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    localStorage.setItem("user", JSON.stringify({...response.data,id:response.data._id}));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});


// Thunk to update user
export const updateUser = createAsyncThunk("user/update", async (userData, thunkAPI) => {
  console.log(userData)
  try {
    const response = await axios.post(`${apiUrl}/profile/${userData.id}`,userData,{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const {message,user} = response.data 

    localStorage.setItem("user", JSON.stringify({...user,id:user._id}));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});




const userSlice = createSlice({
  name: "userState",
  initialState: {
    isLogin: !!localStorage.getItem("token"),
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    status: "idle",
    error: null,
    regsiterStatus: "idle",
    regsiterMessage: null,
    regsiterError: null,
    updateStatus: "idle",
    updateMessage: null,
    updateError: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.isLogin = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
      window.location.reload()
    },
    resetRegisterState: (state) => {
      state.regsiterStatus ="idle"
    }
  },
  extraReducers: (builder) => {

    //login user

    builder.addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
    builder.addCase(userLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.isLogin = true;
        state.user = action.payload.user;
        state.error = null;
      })
    builder.addCase(userLogin.rejected, (state, action) => {
        state.status = "reject";
        state.error = action.payload;
        state.isLogin = false;
        state.user = null;
      });
    
    //regsiter user

    builder.addCase(userRegister.pending, (state) => {
      state.regsiterStatus = "loading";
      state.regsiterError = null;
    })
    builder.addCase(userRegister.fulfilled, (state,action) => {
      state.regsiterStatus = "success";
      state.regsiterMessage = action.payload.message
      state.regsiterError = null;
    })
    builder.addCase(userRegister.rejected, (state,action) => {
      state.regsiterStatus = "reject";
      state.regsiterError = action.payload
    })


    //get user

    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    builder.addCase(fetchUser.fulfilled, (state,action) => {
      state.status = "success";
     state.user = {...action.payload,id:action.payload._id}
      state.error = null;
    })
    builder.addCase(fetchUser.rejected, (state,action) => {
      state.status = "reject";
      state.error = action.payload
    })


    //update user

    builder.addCase(updateUser.pending, (state) => {
      state.updateStatus = "loading";
      state.error = null;
    })
    builder.addCase(updateUser.fulfilled, (state,action) => {
      state.updateStatus = "success";
      state.user = {...action.payload.user,id:action.payload.user._id}
      state.updateMessage = action.payload.message
      state.updateError = null;
    })
    builder.addCase(updateUser.rejected, (state,action) => {
      state.updateStatus = "reject";
      state.updateError = action.payload
    })
    
    
  }
});

export const { logout,resetRegisterState } = userSlice.actions;
export default userSlice.reducer;
