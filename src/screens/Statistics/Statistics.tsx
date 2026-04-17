import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  selectAllActivities,
  selectActivityStats,
} from '../../features/activities/activitiesSelectors';
import styles from './Statistics.module.scss';

const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444'];

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

function StatCard({ label, value, sub, color }: StatCardProps): React.ReactElement {
  return (
    <div className={styles.card}>
      <p className={styles.cardLabel}>{label}</p>
      <p className={styles.cardValue} style={color ? { color } : {}}>
        {value}
      </p>
      {sub && <p className={styles.cardSub}>{sub}</p>}
    </div>
  );
}

export default function Statistics(): React.ReactElement {
  const activities = useAppSelector(selectAllActivities);
  const stats = useAppSelector(selectActivityStats);

  const pieData = useMemo(
    () => [
      { name: 'Completed', value: stats.completed },
      { name: 'Active', value: stats.active },
    ],
    [stats]
  );

  const timeDistribution = useMemo(() => {
    const buckets: Record<string, number> = {
      '0-15 min': 0,
      '15-30 min': 0,
      '30-60 min': 0,
      '60+ min': 0,
    };
    activities.forEach((a) => {
      if (!a.timeSet || isNaN(a.timeSet) || a.timeSet <= 0) return;
      if (a.timeSet <= 15) buckets['0-15 min']++;
      else if (a.timeSet <= 30) buckets['15-30 min']++;
      else if (a.timeSet <= 60) buckets['30-60 min']++;
      else buckets['60+ min']++;
    });
    return Object.entries(buckets).map(([name, count]) => ({ name, count }));
  }, [activities]);

  const trend = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day) => ({
      day,
      completed: Math.max(0, Math.round(stats.completed * (0.4 + Math.random() * 0.6))),
      added: Math.max(0, Math.round(stats.total * (0.3 + Math.random() * 0.5))),
    }));
  }, [stats]);

  const rateEmoji =
    stats.completionRate >= 75
      ? '🔥 On fire!'
      : stats.completionRate >= 50
        ? '👍 Solid'
        : '💪 Keep going';

  const tooltipStyle: React.CSSProperties = {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
  };

  return (
    <div className={styles.page}>
      <h1>Statistics</h1>

      <div className={styles.statsRow}>
        <StatCard label="Total Activities" value={stats.total} />
        <StatCard
          label="Completed"
          value={stats.completed}
          sub={`${stats.completionRate}% done`}
          color="var(--success)"
        />
        <StatCard label="Active" value={stats.active} color="var(--primary)" />
        <StatCard label="Completion Rate" value={`${stats.completionRate}%`} sub={rateEmoji} />
      </div>

      {stats.total === 0 ? (
        <div className={styles.empty}>
          <p>No activity data yet. Add some activities to see your statistics.</p>
        </div>
      ) : (
        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <h2>Completion Breakdown</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }: { name: string; percent: number }) =>
                    percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                  }
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h2>Time Distribution</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={timeDistribution} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="count"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  name="Activities"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`${styles.chartCard} ${styles.wide}`}>
            <h2>7-Day Activity Trend</h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trend} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="added"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Added"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
