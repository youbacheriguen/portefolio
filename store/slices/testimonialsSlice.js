import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const getHeaders = () => ({
  Authorization: `Bearer ${Cookies.get('token')}`,
});

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/testimonials', { headers: getHeaders() });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

export const createTestimonial = createAsyncThunk(
  'testimonials/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/testimonials', data, { headers: getHeaders() });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  'testimonials/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/testimonials/${id}`, data, { headers: getHeaders() });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  'testimonials/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/testimonials/${id}`, { headers: getHeaders() });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

export const fetchTestimonial = createAsyncThunk(
  'testimonials/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/testimonials/${id}`, { headers: getHeaders() });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
    fieldErrors: {},
    success: null,
  },
  reducers: {
    clearMessages: (state) => { state.error = null; state.success = null; state.fieldErrors = {}; },
    clearCurrent: (state) => { state.current = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => { state.loading = true; })
      .addCase(fetchTestimonials.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchTestimonials.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; })

      .addCase(createTestimonial.pending, (state) => { state.loading = true; state.error = null; state.fieldErrors = {}; state.success = null; })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
        state.success = 'Témoignage ajouté avec succès!';
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        state.fieldErrors = action.payload?.errors || {};
      })

      .addCase(updateTestimonial.pending, (state) => { state.loading = true; state.error = null; state.fieldErrors = {}; state.success = null; })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Témoignage modifié avec succès!';
        const idx = state.list.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
        state.fieldErrors = action.payload?.errors || {};
      })

      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.list = state.list.filter(t => t.id !== action.payload);
      })

      .addCase(fetchTestimonial.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { clearMessages, clearCurrent } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
