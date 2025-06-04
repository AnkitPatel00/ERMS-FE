import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice.js'
import engineerReducer from '../features/engineerSlice.js'
import projectReducer from '../features/projectSlice.js'
import assignmentReducer from '../features/assignmentSlice.js'
import engineerAssignmentReducer from '../features/engineerAssignmentSlice.js'
const store = configureStore({
  reducer: {
    userState: userReducer,
    engineerState: engineerReducer,
    projectState: projectReducer,
    assignmentState: assignmentReducer,
    engineerAssignmentState:engineerAssignmentReducer
  }
})

export default store