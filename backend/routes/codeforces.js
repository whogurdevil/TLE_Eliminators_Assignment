const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();

const apiKey = process.env.CF_API_KEY;
const apiSecret = process.env.CF_API_SECRET;

function getSignedUrl(methodName, params = {}) {
    const rand = Math.random().toString(36).substring(2, 8);
    const time = Math.floor(Date.now() / 1000);
    const baseUrl = `https://codeforces.com/api/${methodName}`;

    const allParams = { ...params, apiKey, time };
    const sortedKeys = Object.keys(allParams).sort();
    const paramString = sortedKeys.map(k => `${k}=${allParams[k]}`).join('&');

    const toHash = `${rand}/${methodName}?${paramString}#${apiSecret}`;
    const hash = crypto.createHash('sha512').update(toHash).digest('hex');
    const apiSig = `${rand}${hash}`;

    return `${baseUrl}?${paramString}&apiSig=${apiSig}`;
}

function getSolvedProblemsInContest(submissions, contestId) {
    const solved = new Set();
    for (const sub of submissions) {
        if (
            sub.contestId === contestId &&
            sub.verdict === 'OK' &&
            sub.problem?.index
        ) {
            solved.add(sub.problem.index);
        }
    }
    return solved;
}

router.get('/history/:handle', async (req, res) => {
    const handle = req.params.handle;
    const days = parseInt(req.query.days) || 360; // default to 360 days if not specified
    console.log(`[REQUEST] Contest history for: ${handle} (last ${days} days)`);

    try {
        // 1. Fetch rating changes
        const { data: ratingRes } = await axios.get(
            `https://codeforces.com/api/user.rating?handle=${handle}`
        );
        const ratingChanges = ratingRes.result;

        // 2. Filter contests based on days
        const now = Math.floor(Date.now() / 1000);
        const filteredContests = ratingChanges.filter(c =>
            now - c.ratingUpdateTimeSeconds <= days * 24 * 60 * 60
        );

        // 3. Fetch all submissions once
        const { data: submissionsRes } = await axios.get(
            `https://codeforces.com/api/user.status?handle=${handle}`
        );
        const allSubmissions = submissionsRes.result;

        const contestHistory = [];

        // 4. Iterate over filtered contests only
        for (const contest of filteredContests) {
            try {
                const url = getSignedUrl("contest.standings", {
                    contestId: contest.contestId,
                    from: 1,
                    count: 1,
                    showUnofficial: true,
                });

                const { data: problemsRes } = await axios.get(url);
                const contestProblems = problemsRes.result.problems;

                const solved = getSolvedProblemsInContest(allSubmissions, contest.contestId);
                const unsolvedCount = contestProblems.filter(p => !solved.has(p.index)).length;

                contestHistory.push({
                    ...contest,
                    unsolvedCount,
                });
            } catch (error) {
                console.warn(`⚠️ Contest ${contest.contestId} failed:`, error.message);
                contestHistory.push({
                    ...contest,
                    unsolvedCount: null,
                });
            }
        }

        console.log(`[SUCCESS] Fetched ${contestHistory.length} contests for ${handle}`);
        res.json(contestHistory);
    } catch (error) {
        console.error(`❌ Error fetching contest history for ${handle}:`, error.message);
        res.status(500).json({ error: "Failed to fetch contest history" });
    }
});

router.get('/submissions/:handle', async (req, res) => {

  const handle = req.params.handle;
  console.log(`[REQUEST] problems history for: ${handle})`);

  const days = parseInt(req.query.days) || 90;
  const now = Math.floor(Date.now() / 1000);
  const cutoff = now - days * 24 * 3600;   


  try {
    const { data } = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
    const allSubmissions = data.result;

    // Filter accepted submissions within the last `days`
    const filtered = allSubmissions.filter(sub => 
      sub.verdict === 'OK' && 
      sub.creationTimeSeconds >= cutoff && 
      sub.problem.rating
    );

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching submissions:", error.message);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});


module.exports = router;
