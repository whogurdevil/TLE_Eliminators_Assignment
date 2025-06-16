import { mkConfig, generateCsv, download } from 'export-to-csv';


export const exportToCsv = (students) => {
    if (!Array.isArray(students) || students.length === 0) return;

    const rows = [];

    students.forEach(student => {
        const { name, email, phone, cfHandle, currentRating, maxRating, contestHistory } = student;

        if (Array.isArray(contestHistory) && contestHistory.length > 0) {
            contestHistory.forEach(contest => {
                rows.push({
                    'Name': name,
                    'Email': email,
                    'Phone': phone,
                    'CF Handle': cfHandle,
                    'Current Rating': currentRating,
                    'Max Rating': maxRating,
                    'Contest Name': contest.contestName,
                    'Contest ID': contest.contestId,
                    'Rank': contest.rank,
                    'Old Rating': contest.oldRating,
                    'New Rating': contest.newRating,
                    'Unsolved Problems': contest.unsolvedCount,
                    'Rating Update Time': new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleString()
                });
            });
        } else {
            rows.push({
                'Name': name,
                'Email': email,
                'Phone': phone,
                'CF Handle': cfHandle,
                'Current Rating': currentRating,
                'Max Rating': maxRating,
                'Contest Name': '',
                'Contest ID': '',
                'Rank': '',
                'Old Rating': '',
                'New Rating': '',
                'Unsolved Problems': '',
                'Rating Update Time': ''
            });
        }
    });

    const config = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
        filename: 'students_contest_data'
    });

    const csv = generateCsv(config)(rows);
    download(config)(csv);
};