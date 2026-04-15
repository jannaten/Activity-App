import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const DEFAULT_CITY = import.meta.env.VITE_DEFAULT_CITY || 'Tampere';

export const fetchWeather = createAsyncThunk(
  'weather/fetch',
  async (city, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'City not found');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: DEFAULT_CITY,
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.city = action.payload.name;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
