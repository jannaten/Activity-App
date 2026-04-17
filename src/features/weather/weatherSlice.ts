import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { WeatherData, WeatherStatus } from '../../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
const DEFAULT_CITY = (import.meta.env.VITE_DEFAULT_CITY as string | undefined) ?? 'Tampere';

interface WeatherState {
  city: string;
  data: WeatherData | null;
  status: WeatherStatus;
  error: string | null;
}

export const fetchWeather = createAsyncThunk<WeatherData, string, { rejectValue: string }>(
  'weather/fetch',
  async (city, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = (err.response?.data as { message?: string } | undefined)?.message;
        return rejectWithValue(message ?? 'City not found');
      }
      return rejectWithValue('City not found');
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
  } satisfies WeatherState as WeatherState,
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
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default weatherSlice.reducer;
