import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"; // Custom Axios instance with token handling

// Async thunk for fetching properties
export const fetchProperties = createAsyncThunk(
  "property/fetchProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/bazaar/Property/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for submitting a new property
export const submitProperty = createAsyncThunk(
  "property/submitProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "v1/bazaar/Property/create/",
        propertyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating an existing property
export const updateProperty = createAsyncThunk(
  "property/updateProperty",
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `v1/bazaar/Property/update/${id}/`,
        propertyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for deleting a property
export const deleteProperty = createAsyncThunk(
  "property/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`v1/bazaar/Property/delete/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Property slice
const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
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
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.results;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submit a new property
      .addCase(submitProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
        state.success = true;
      })
      .addCase(submitProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update an existing property
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.properties.findIndex(
          (property) => property.id === action.payload.id
        );
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete a property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(
          (property) => property.id !== action.meta.arg
        );
        state.success = true;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = propertySlice.actions;
export default propertySlice.reducer;
