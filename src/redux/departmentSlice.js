import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"; // Import the custom Axios instance

// Async thunk for fetching Department
export const fetchDepartment = createAsyncThunk(
  "v1/ticket/issue-Department",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/setting/departments");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for submitting a new Department
export const submitDepartment = createAsyncThunk(
  "Department/submitDepartment",
  async (DepartmentData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "v1/setting/departments/",
        DepartmentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating an existing Department
export const updateDepartment = createAsyncThunk(
  "Department/updateDepartment",
  async ({ id, DepartmentData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `v1/ticket/issue-Department/${id}`,
        DepartmentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a Department
export const deleteDepartment = createAsyncThunk(
  "Department/deleteDepartment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`v1/ticket/Department/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Department slice
const DepartmentSlice = createSlice({
  name: "department",
  initialState: {
    department: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Department
      .addCase(fetchDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload.results;
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit a new Department
      .addCase(submitDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.department.push(action.payload);
      })
      .addCase(submitDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update an existing Department
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.department.findIndex(
          (Department) => Department.id === action.payload.id
        );
        if (index !== -1) {
          state.department[index] = action.payload; // Update the Department in the list
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a Department
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.department = state.department.filter(
          (Department) => Department.id !== action.meta.arg
        ); // Remove the Department from the list
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default DepartmentSlice.reducer;
