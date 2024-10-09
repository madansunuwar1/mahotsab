import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

// Async thunk to fetch all price histories
export const fetchPriceHistories = createAsyncThunk(
  "priceHistory/fetchPriceHistories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/bazaar/PriceHistory/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create new price history
export const addPriceHistory = createAsyncThunk(
  "priceHistory/addPriceHistory",
  async (priceHistoryData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "v1/bazaar/PriceHistory/create/",
        priceHistoryData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update price history
export const updatePriceHistory = createAsyncThunk(
  "priceHistory/updatePriceHistory",
  async ({ id, priceHistoryData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `v1/bazaar/PriceHistory/update/${id}/`,
        priceHistoryData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete price history
export const deletePriceHistory = createAsyncThunk(
  "priceHistory/deletePriceHistory",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`v1/bazaar/PriceHistory/delete/${id}/`);
      return id; // Return the ID to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const priceHistorySlice = createSlice({
  name: "priceHistory",
  initialState: {
    priceHistories: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPriceState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceHistories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriceHistories.fulfilled, (state, action) => {
        state.loading = false;
        state.priceHistories = action.payload.results;
      })
      .addCase(fetchPriceHistories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch price histories";
      })
      .addCase(addPriceHistory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addPriceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.priceHistories.push(action.payload); // Add new price history to the list
      })
      .addCase(addPriceHistory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to add price history";
      })
      .addCase(updatePriceHistory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updatePriceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.priceHistories.findIndex(
          (priceHistory) => priceHistory.id === action.payload.id
        );
        if (index !== -1) {
          state.priceHistories[index] = action.payload; // Update existing price history
        }
      })
      .addCase(updatePriceHistory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update price history";
      })
      .addCase(deletePriceHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePriceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.priceHistories = state.priceHistories.filter(
          (priceHistory) => priceHistory.id !== action.payload
        ); // Remove price history from list
      })
      .addCase(deletePriceHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete price history";
      });
  },
});

export const { resetPriceState } = priceHistorySlice.actions;

export default priceHistorySlice.reducer;
