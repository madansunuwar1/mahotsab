import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

// Async thunk to fetch all stocks
export const fetchStocks = createAsyncThunk(
  "stock/fetchStocks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/bazaar/VegetablePriceVariation/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// async thunk to fetch public stock which Vegetable Price variation as vegetables
export const fetchPublicVegetables = createAsyncThunk(
  "public-vegetables/",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/public-vegetables/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Async thunk to fetch stock details by ID
export const fetchStockById = createAsyncThunk(
  "stock/fetchStockById",
  async (stockId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `v1/bazaar/VegetablePriceVariation/${stockId}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to fetch publicstock details by ID
export const fetchPublicStockById = createAsyncThunk(
  "stock/fetchPublicStockById",
  async (stockId, { rejectWithValue }) => {
    try {
      const response = await api.get(`v1/public-vegetables/${stockId}/edit/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to add new stock
export const addStock = createAsyncThunk(
  "stock/addStock",
  async (stockData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "v1/bazaar/VegetablePriceVariation/create/",
        stockData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update stock details
export const updateStock = createAsyncThunk(
  "stock/updateStock",
  async ({ stockData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `v1/bazaar/VegetablePriceVariation/update/${stockData.id}/`,
        stockData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete stock
export const deleteStock = createAsyncThunk(
  "stock/deleteStock",
  async (stockId, { rejectWithValue }) => {
    try {
      await api.delete(`v1/bazaar/VegetablePriceVariation/delete/${stockId}/`);
      return stockId; // Return the stockId for removal from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    stocks: [],
    stockDetails: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.stocks = [];
      state.stockDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload.results;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch stocks";
      })
      .addCase(fetchPublicVegetables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicVegetables.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload.results;
      })
      .addCase(fetchPublicVegetables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch stocks";
      })
      .addCase(fetchPublicStockById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicStockById.fulfilled, (state, action) => {
        state.loading = false;
        state.stockDetails = action.payload;
      })
      .addCase(fetchPublicStockById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch stock details";
      })
      .addCase(fetchStockById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockById.fulfilled, (state, action) => {
        state.loading = false;
        state.stockDetails = action.payload;
      })
      .addCase(fetchStockById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch stock details";
      })
      .addCase(addStock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stocks.push(action.payload); // Add new stock to the list
      })
      .addCase(addStock.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to add stock";
      })
      .addCase(updateStock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.stocks.findIndex(
          (stock) => stock.id === action.payload.id
        );
        if (index !== -1) {
          state.stocks[index] = action.payload; // Update existing stock
        }
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update stock";
      })
      .addCase(deleteStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStock.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = state.stocks.filter(
          (stock) => stock.id !== action.payload
        ); // Remove stock from list
      })
      .addCase(deleteStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete stock";
      });
  },
});

export const { actions, reducer } = stockSlice;
export default reducer;
