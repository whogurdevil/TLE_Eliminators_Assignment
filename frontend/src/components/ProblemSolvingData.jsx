import React, { useEffect, useState } from 'react';
import { fetchRecentSolvedProblems } from '../services/studentAPI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SubmissionHeatmap from './SubmissionHeatmap';

const buildHeatmapData = (problems) => {
  const dateMap = {};
  problems.forEach(p => {
    const dateStr = new Date(p.creationTimeSeconds * 1000).toISOString().split('T')[0];
    dateMap[dateStr] = (dateMap[dateStr] || 0) + 1;
  });

  const result = [];
  const now = new Date();
  for (let i = 89; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.push({ date: dateStr, count: dateMap[dateStr] || 0 });
  }
  return result;
};

const ProblemSolvingData = ({ studentId }) => {
  const [days, setDays] = useState(90);
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartHeight, setChartHeight] = useState(getResponsiveHeight());

  function getResponsiveHeight() {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 220 : 300;
    }
    return 300;
  }

  useEffect(() => {
    const handleResize = () => setChartHeight(getResponsiveHeight());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchRecentSolvedProblems(studentId, 90);
      setAllProblems(data);
      setLoading(false);
    };
    load();
  }, [studentId]);

  const now = Date.now() / 1000;
  const filteredProblems = allProblems.filter(
    (p) => now - p.creationTimeSeconds <= days * 24 * 3600
  );

  const totalSolved = filteredProblems.length;
  const ratings = filteredProblems.map((p) => p.problem.rating).filter(r => typeof r === 'number');
  const avgRating = ratings.length > 0
    ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
    : 'N/A';
  const avgPerDay = (totalSolved / days).toFixed(2);
  const mostDifficult = filteredProblems.reduce(
    (max, p) => (p.problem.rating > (max?.problem.rating || 0) ? p : max),
    null
  );

  const buckets = {};
  ratings.forEach((r) => {
    const key = `${Math.floor(r / 100) * 100}`;
    buckets[key] = (buckets[key] || 0) + 1;
  });
  const chartData = Object.entries(buckets).map(([rating, count]) => ({ rating, count }));
  const heatmapData = buildHeatmapData(allProblems);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 transition-colors duration-300 w-full">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Problem Solving Data
        </h2>

        <div className="mb-6 flex flex-wrap gap-3">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              disabled={loading}
              className={`px-3 py-1.5 rounded-md border text-sm transition-colors duration-200 ${
                d === days
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-700'
              }`}
            >
              Last {d} Days
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-gray-800 dark:text-gray-200 text-sm">
              <div><b>Total Solved:</b> {totalSolved}</div>
              <div><b>Average Rating:</b> {avgRating}</div>
              <div><b>Avg/Day:</b> {avgPerDay}</div>
              <div>
                <b>Most Difficult:</b>{' '}
                {mostDifficult ? `${mostDifficult.problem.name} (${mostDifficult.problem.rating})` : '-'}
              </div>
            </div>

            {totalSolved > 0 && (
              <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart data={chartData} margin={{ top: 40, right: 30, left: -10, bottom: 0 }}>
                  <text
                    x="50%"
                    y={20}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-semibold fill-gray-900 dark:fill-white"
                  >
                    Rating-wise Problem Distribution
                  </text>
                  <XAxis dataKey="rating" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      color: 'white',
                    }}
                  />
                  <Bar dataKey="count" fill="#38bdf8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </div>

      {!loading && (
        
        <div className="bg-white p-8 md:p h-54 md:h-full dark:bg-gray-800 rounded-xl shadow-md sm:p-6 transition-colors duration-300">
          <ResponsiveContainer >
          <SubmissionHeatmap data={heatmapData} />
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ProblemSolvingData;
