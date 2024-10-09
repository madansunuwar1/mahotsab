import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"; // Custom Axios instance with token handling

// API Endpoints

// Async thunk for fetching unit types
export const fetchUnitTypes = createAsyncThunk(
  "unit/fetchUnitTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/bazaar/UnitType/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for submitting a new unit
export const submitUnit = createAsyncThunk(
  "unit/submitUnit",
  async (unitData, { rejectWithValue }) => {
    try {
      const response = await api.post("v1/bazaar/UnitType/create/", unitData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating an existing unit
export const updateUnit = createAsyncThunk(
  "unit/updateUnit",
  async ({ id, unitData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/v1/bazaar/UnitType/update/${id}/`,
        unitData
      ); // Ensure proper URL format
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for deleting a unit
export const deleteUnit = createAsyncThunk(
  "unit/deleteUnit",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`v1/bazaar/UnitType/delete/${id}/`); // Ensure proper URL format
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Unit slice
const unitSlice = createSlice({
  name: "unit",
  initialState: {
    units: [],
    loading: false,
    success: false,
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
      // Fetch units
      .addCase(fetchUnitTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnitTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload.results;
      })
      .addCase(fetchUnitTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submit a new unit
      .addCase(submitUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.units.push(action.payload);
        state.success = true;
      })
      .addCase(submitUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing unit
      .addCase(updateUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.units.findIndex(
          (unit) => unit.id === action.payload.id
        );
        if (index !== -1) {
          state.units[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a unit
      .addCase(deleteUnit.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.units = state.units.filter((unit) => unit.id !== action.meta.arg);
        state.success = true;
      })
      .addCase(deleteUnit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = unitSlice.actions;
export default unitSlice.reducer;
