import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api"; // Import the custom Axios instance

// Async thunk for fetching tags
export const fetchTags = createAsyncThunk(
  "tag/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/ticket/tags");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for submitting a new tag
export const submitTag = createAsyncThunk(
  "tag/submitTag",
  async (tagData, { rejectWithValue }) => {
    try {
      const response = await api.post("/ticket/tags", tagData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating an existing tag
export const updateTag = createAsyncThunk(
  "tag/updateTag",
  async ({ id, tagData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/ticket/tags/${id}`, tagData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a tag
export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/ticket/tags/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Tag slice
const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tags
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload.results;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit a new tag
      .addCase(submitTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags.push(action.payload);
      })
      .addCase(submitTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update an existing tag
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tags.findIndex(
          (tag) => tag.id === action.payload.id
        );
        if (index !== -1) {
          state.tags[index] = action.payload; // Update the tag in the list
        }
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a tag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = state.tags.filter((tag) => tag.id !== action.meta.arg); // Remove the tag from the list
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tagSlice.reducer;
