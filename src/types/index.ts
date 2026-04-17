export interface Activity {
  id: string;
  name: string;
  completed: boolean;
  /** Seconds remaining. NaN when the activity has been archived/completed. */
  timeSet: number;
  originalTimeSet: number;
}

export type UndoAction =
  | { type: 'add'; id: string }
  | { type: 'delete'; snapshot: Activity }
  | { type: 'archive'; snapshot: Activity }
  | { type: 'update'; snapshot: Activity };

export type SortOrder = 'default' | 'name-asc' | 'name-desc' | 'time-asc' | 'status';

export type ThemeMode = 'light' | 'dark';

export type WeatherStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

/** Focused subset of the OpenWeather API /weather response. */
export interface WeatherData {
  name: string;
  sys?: { country?: string };
  main?: {
    temp?: number;
    feels_like?: number;
    humidity?: number;
    pressure?: number;
    temp_min?: number;
    temp_max?: number;
  };
  weather?: Array<{
    description?: string;
    icon?: string;
  }>;
}

export interface WeatherSummary {
  city: string;
  country: string | undefined;
  temp: number | undefined;
  feelsLike: number | undefined;
  humidity: number | undefined;
  pressure: number | undefined;
  tempMin: number | undefined;
  tempMax: number | undefined;
  description: string | undefined;
  icon: string | undefined;
  isDay: boolean;
}
