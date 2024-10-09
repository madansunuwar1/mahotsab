import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const acceptTicket = createAsyncThunk(
  "ticket/acceptTicket",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await api.get(`v1/ticket/accept-ticket/${ticketId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk to fetch comments for a specific ticket
export const fetchCommentsByTicketId = createAsyncThunk(
  "ticket/fetchCommentsByTicketId",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `v1/ticket/tickets/${ticketId}/comments/   `
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to submit a comment for a specific ticket
export const submitComment = createAsyncThunk(
  "ticket/submitComment",
  async ({ ticketId, commentData }, { rejectWithValue }) => {
    console.log("Submitting comment:", commentData);
    try {
      const response = await api.post(
        `v1/ticket/tickets/${ticketId}/comments/`,
        commentData
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to handle ticket submission
export const submitTicket = createAsyncThunk(
  "ticket/submitTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await api.post("v1/ticket/register-ticket/", ticketData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTickets = createAsyncThunk(
  "ticket/fetchTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("v1/ticket/all-tickets");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTicketsByClient = createAsyncThunk(
  "ticket/fetchTicketsByClient",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/v1/ticket/tickets-of-client-user`);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTicketsByCategory = createAsyncThunk(
  "ticket/fetchTicketsByCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/v1/ticket/open-tickets-of-user`);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTicketsByUser = createAsyncThunk(
  "ticket/fetchTicketsByUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`v1/ticket/all-tickets-of-assignee`);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTicketsByStatus = createAsyncThunk(
  "ticket/fetchTicketsByStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `v1/ticket/tickets-of-assignee-by-status/resolved`
      );
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTicketById = createAsyncThunk(
  "ticket/fetchTicketById",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await api.get(`v1/ticket/tickets/${ticketId}`);
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  "ticket/updateTicketStatus",
  async ({ ticketId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `v1/ticket/update-ticket-status/${ticketId}/`,
        {
          status,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    ticketDetails: null,
    comments: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.tickets = [];
      state.ticketDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTicket.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitTicket.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitTicket.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload.results;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tickets";
      })
      .addCase(fetchTicketById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        console.log("Ticket Details Fulfilled:", action.payload);
        state.loading = false;
        state.ticketDetails = action.payload;
      })
      .addCase(fetchTicketById.rejected, (state, action) => {
        console.log("Ticket Details Rejected:", action.payload);
        state.loading = false;
        state.error = action.payload || "Failed to fetch the ticket";
      })
      .addCase(updateTicketStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.tickets.findIndex(
          (ticket) => ticket.id === action.payload.id
        );
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
        if (
          state.ticketDetails &&
          state.ticketDetails.id === action.payload.id
        ) {
          state.ticketDetails = action.payload;
        }
      })
      .addCase(updateTicketStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update ticket status";
      })
      .addCase(fetchCommentsByTicketId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByTicketId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.results;
      })
      .addCase(fetchCommentsByTicketId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch comments";
      })
      .addCase(submitComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitComment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.comments.push(action.payload);
      })
      .addCase(submitComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to submit comment";
      })
      .addCase(fetchTicketsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload; // assuming the response contains a list of tickets
      })
      .addCase(fetchTicketsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tickets by status";
      })
      .addCase(fetchTicketsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTicketsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tickets by user role";
      })
      .addCase(acceptTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update the state with the accepted ticket if needed
        // You might need to handle specific updates based on the response
      })
      .addCase(acceptTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to accept ticket";
      })
      .addCase(fetchTicketsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload; // Assuming this returns a list of tickets
      })
      .addCase(fetchTicketsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tickets by category";
      });
  },
});

export const { resetState } = ticketSlice.actions;

export default ticketSlice.reducer;
