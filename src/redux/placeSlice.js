import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"; // Import the custom Axios instance

// Async thunk for fetching places
export const fetchplaces = createAsyncThunk(
  "place/fetchplaces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/setting/places");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for submitting a new place
export const submitplace = createAsyncThunk(
  "place/submitplace",
  async (placeData, { rejectWithValue }) => {
    try {
      const response = await api.post("v1/setting/places/", placeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating an existing place
export const updateplace = createAsyncThunk(
  "place/updateplace",
  async ({ id, placeData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/ticket/places/${id}`, placeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a place
export const deleteplace = createAsyncThunk(
  "place/deleteplace",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/ticket/places/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// place slice
const placeSlice = createSlice({
  name: "place",
  initialState: {
    places: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch places
      .addCase(fetchplaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchplaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload.results;
      })
      .addCase(fetchplaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit a new place
      .addCase(submitplace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitplace.fulfilled, (state, action) => {
        state.loading = false;
        state.places.push(action.payload);
      })
      .addCase(submitplace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update an existing place
      .addCase(updateplace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateplace.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.places.findIndex(
          (place) => place.id === action.payload.id
        );
        if (index !== -1) {
          state.places[index] = action.payload; // Update the place in the list
        }
      })
      .addCase(updateplace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a place
      .addCase(deleteplace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteplace.fulfilled, (state, action) => {
        state.loading = false;
        state.places = state.places.filter(
          (place) => place.id !== action.meta.arg
        ); // Remove the place from the list
      })
      .addCase(deleteplace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default placeSlice.reducer;
