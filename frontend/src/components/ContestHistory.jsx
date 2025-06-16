import React, { useEffect, useState } from 'react';
import { fetchContestHistory, filterContestsByDays } from '../services/studentAPI';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const ContestHistory = ({ studentId }) => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [days, setDays] = useState(365);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContestData = async () => {
      setLoading(true);
      try {
        const data = await fetchContestHistory(studentId);
        setContests(data);
      } catch (error) {
        console.error("Failed to fetch contest history:", error);
      }
      setLoading(false);
    };

    if (studentId) loadContestData();
  }, [studentId]);

  useEffect(() => {
    setFilteredContests(filterContestsByDays(contests, days));
  }, [days, contests]);

  const formatDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleDateString();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Contest History
        </h2>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
          <option value={365}>Last 365 Days</option>
        </select>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading contest history...</div>
      ) : filteredContests.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No contests found for selected time range.
        </div>
      ) : (
        <>
          {/* Line Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={filteredContests.map((c) => ({
                date: formatDate(c.ratingUpdateTimeSeconds),
                rating: c.newRating,
              }))}
              margin={{ top: 20, right: 30, bottom: 0, left: 0 }}
            >
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Scrollable Contest List */}
          <div className="mt-6 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
            <ul className="space-y-4">
              {filteredContests.map((contest, index) => {
                const ratingDiff = contest.newRating - contest.oldRating;
                return (
                  <li
                    key={index}
                    className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
                  >
                    <div className="text-sm dark:text-gray-200">
                      <strong>{contest.contestName}</strong> — {formatDate(contest.ratingUpdateTimeSeconds)}
                      <div>
                        Rank: <strong>{contest.rank}</strong>
                      </div>
                      <div>
                        Rating: <strong>{contest.oldRating}</strong> → <strong>{contest.newRating}</strong>{' '}
                        <span className={ratingDiff >= 0 ? "text-green-500" : "text-red-500"}>
                          ({ratingDiff >= 0 ? '+' : ''}{ratingDiff})
                        </span>
                      </div>
                      {contest.unsolvedCount !== null && (
                        <div>
                          Unsolved Problems: <strong>{contest.unsolvedCount}</strong>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ContestHistory;
