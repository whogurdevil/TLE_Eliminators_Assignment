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

const ContestHistory = ({ handle }) => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContestData = async () => {
      setLoading(true);
      try {
        const data = await fetchContestHistory(handle);
        setContests(data);
      } catch (error) {
        console.error("Failed to fetch contest history:", error);
      }
      setLoading(false);
    };

    if (handle) {
      loadContestData();
    }
  }, [handle]);

  useEffect(() => {
    setFilteredContests(filterContestsByDays(contests, days));
  }, [days, contests]);

  const formatDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleDateString();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Contest History
        </h2>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
          <option value={365}>Last 365 Days</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">
          Loading contest history...
        </p>
      ) : filteredContests.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No contests found for selected time range.
        </p>
      ) : (
        <>
          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={filteredContests.map((c) => ({
                date: formatDate(c.ratingUpdateTimeSeconds),
                rating: c.newRating,
              }))}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Contest List */}
          <ul className="mt-6 space-y-4">
            {filteredContests.map((contest, index) => {
              const ratingDiff = contest.newRating - contest.oldRating;
              return (
                <li
                  key={index}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm"
                >
                  <div className="text-sm dark:text-gray-200">
                    <strong>{contest.contestName}</strong> — {formatDate(contest.ratingUpdateTimeSeconds)}
                    <div>
                      Rank: <strong>{contest.rank}</strong>
                    </div>
                    <div>
                      Rating: <strong>{contest.oldRating}</strong> → <strong>{contest.newRating}</strong>{' '}
                      <span className={ratingDiff >= 0 ? "text-green-500" : "text-red-500"}>
                        ({ratingDiff >= 0 ? '+' : ''}
                        {ratingDiff})
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
        </>
      )}
    </div>
  );
};

export default ContestHistory;
