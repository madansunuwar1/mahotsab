import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"; // Custom Axios instance with token handling

// Async thunk for fetching vegetables
export const fetchVegetables = createAsyncThunk(
  "vegetable/fetchVegetables",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/bazaar/vegetable/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// async thunk to fetch public categories of Vegetable  as categories
export const fetchPublicCategories = createAsyncThunk(
  "public-categories/",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/public-categories/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for submitting a new vegetable
export const submitVegetable = createAsyncThunk(
  "vegetable/submitVegetable",
  async (vegetableData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "v1/bazaar/Vegetable/create/",
        vegetableData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating an existing vegetable
export const updateVegetable = createAsyncThunk(
  "vegetable/updateVegetable",
  async ({ id, vegetableData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `v1/bazaar/Vegetable/update/${id}/`,
        vegetableData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for deleting a vegetable
export const deleteVegetable = createAsyncThunk(
  "vegetable/deleteVegetable",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`v1/bazaar/Vegetable/delete/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Vegetable slice
const vegetableSlice = createSlice({
  name: "vegetable",
  initialState: {
    vegetables: [],
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
      // Fetch vegetables
      .addCase(fetchVegetables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVegetables.fulfilled, (state, action) => {
        state.loading = false;
        state.vegetables = action.payload.results;
      })
      .addCase(fetchVegetables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch public vegetables
      .addCase(fetchPublicCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.vegetables = action.payload.results;
      })
      .addCase(fetchPublicCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submit a new vegetable
      .addCase(submitVegetable.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitVegetable.fulfilled, (state, action) => {
        state.loading = false;
        state.vegetables.push(action.payload);
        state.success = true;
      })
      .addCase(submitVegetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing vegetable
      .addCase(updateVegetable.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateVegetable.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.vegetables.findIndex(
          (vegetable) => vegetable.id === action.payload.id
        );
        if (index !== -1) {
          state.vegetables[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateVegetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a vegetable
      .addCase(deleteVegetable.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteVegetable.fulfilled, (state, action) => {
        state.loading = false;
        state.vegetables = state.vegetables.filter(
          (vegetable) => vegetable.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteVegetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = vegetableSlice.actions;
export default vegetableSlice.reducer;
