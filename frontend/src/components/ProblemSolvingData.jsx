const ProblemSolvingData = ({ stats = {} }) => {
  const {
    total = 0,
    easy = 0,
    medium = 0,
    hard = 0,
    percentage = 0
  } = stats;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Problem Solving Stats
      </h2>
      <ul className="space-y-2 text-gray-800 dark:text-gray-200">
        <li><strong>Total Problems:</strong> {total}</li>
        <li><strong>Easy:</strong> {easy}</li>
        <li><strong>Medium:</strong> {medium}</li>
        <li><strong>Hard:</strong> {hard}</li>
        <li><strong>Accuracy:</strong> {percentage}%</li>
      </ul>
    </div>
  );
};

export default ProblemSolvingData;
