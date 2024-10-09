import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"; // Custom Axios instance with token handling

// Async thunk for fetching varieties
export const fetchVarieties = createAsyncThunk(
  "variety/fetchVarieties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/bazaar/variety/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for submitting a new variety
export const submitVariety = createAsyncThunk(
  "variety/submitVariety",
  async (varietyData, { rejectWithValue }) => {
    try {
      const response = await api.post("v1/bazaar/Variety/create/", varietyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating an existing variety
export const updateVariety = createAsyncThunk(
  "variety/updateVariety",
  async ({ id, varietyData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `v1/bazaar/Variety/update/${id}/`,
        varietyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for deleting a variety
export const deleteVariety = createAsyncThunk(
  "variety/deleteVariety",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`v1/bazaar/Variety/delete/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Variety slice
const varietySlice = createSlice({
  name: "variety",
  initialState: {
    varieties: [],
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
      // Fetch varieties
      .addCase(fetchVarieties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVarieties.fulfilled, (state, action) => {
        state.loading = false;
        state.varieties = action.payload.results;
      })
      .addCase(fetchVarieties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submit a new variety
      .addCase(submitVariety.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitVariety.fulfilled, (state, action) => {
        state.loading = false;
        state.varieties.push(action.payload);
        state.success = true;
      })
      .addCase(submitVariety.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing variety
      .addCase(updateVariety.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateVariety.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.varieties.findIndex(
          (variety) => variety.id === action.payload.id
        );
        if (index !== -1) {
          state.varieties[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateVariety.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a variety
      .addCase(deleteVariety.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteVariety.fulfilled, (state, action) => {
        state.loading = false;
        state.varieties = state.varieties.filter(
          (variety) => variety.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteVariety.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = varietySlice.actions;
export default varietySlice.reducer;
