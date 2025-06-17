const CodeforcesModal = ({ student, onClose }) => {
  if (!student) return null;

  const recentContests = student.contestHistory?.slice(0, 5) || [];
  const recentSubmissions = student.submissions?.slice(0, 5) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-[90%] max-w-3xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800 shadow-lg rounded-2xl relative">
        <div className="p-6">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-red-500 text-xl transition"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="text-xl font-bold py-2 text-gray-800 dark:text-gray-200 text-center">Codeforces Info</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">Student's coding profile details</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 dark:text-gray-300 mb-6">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Current Rating:</strong> {student.currentRating ?? 'N/A'}</p>
            <p><strong>Handle:</strong> {student.cfHandle}</p>
            <p><strong>Max Rating:</strong> {student.maxRating ?? 'N/A'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto custom-scrollbar mb-6">
            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Recent Contests</h3>
              {recentContests.length > 0 ? (
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  {recentContests.map((contest, idx) => (
                    <li key={idx} className="border border-gray-200 dark:border-gray-600 p-2 rounded-md">
                      <strong>{contest.contestName}</strong><br />
                      Rank: {contest.rank} | Rating: {contest.oldRating} → {contest.newRating}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No recent contests found.</p>
              )}
            </div>

            <div>
              <h3 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-200">Recent Submissions</h3>
              {recentSubmissions.length > 0 ? (
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  {recentSubmissions.map((submission, idx) => (
                    <li key={idx} className="border border-gray-200 dark:border-gray-600 p-2 rounded-md">
                      <strong>{submission.problem?.name || 'Unknown Problem'}</strong><br />
                      Verdict: <span className={submission.verdict === "OK" ? "text-green-600" : "text-red-500"}>
                        {submission.verdict}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No recent submissions found.</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-5 py-2 text-sm font-medium tracking-wide border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800 hover:shadow-md transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeforcesModal;
