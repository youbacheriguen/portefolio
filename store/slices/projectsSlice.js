import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const getHeaders = () => ({
  Authorization: `Bearer ${Cookies.get('token')}`,
});

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/projects', { headers: getHeaders() });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

export const fetchProject = createAsyncThunk(
  'projects/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/projects/${id}`, { headers: getHeaders() });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Erreur serveur' });
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrent: (state) => { state.current = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProjects.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchProjects.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; })

      .addCase(fetchProject.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProject.fulfilled, (state, action) => { state.loading = false; state.current = action.payload; })
      .addCase(fetchProject.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; });
  },
});

export const { clearCurrent } = projectsSlice.actions;
export default projectsSlice.reducer;
