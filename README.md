# TLE Eliminators - Asssignment for Full Stack Web Developer 

## Objectives
- [x] Student Table View Page
  - [x] table listing all enrolled students
  - [x] Showing Name, Email, Phone Number, Codeforces Handle, Current Rating, and Max Rating
  - [x] options to add, edit, delete students
  - [x] Download the entire dataset as CSV Button
  - [x] view more details
- [x] Student Profile View Page
  - [x] Contest History
  - [x] filtering by the last 30, 90, or 365 days
  - [x] rating graph and list of contests with rating changes, ranks and number of problems unsolved
  - [x] Problem Solving Data
  - [x] 7, 30, or 90 days
  - [x] Most difficult problem solved (by rating), Total problems solved
  - [x] Average rating Average problems per day
  - [x] Bar chart of number of problems solved per rating bucket
  - [x] Show a submission heat map
- [x] Codeforces Data Sync
  - [x] Cron to Automatically fetch and store updated Codeforces data once a day (e.g., at 2 AM) 
  - [x] Avoid real-time API calls 
  - [x] Store all the data required to ensure the student’s profile
  - [x] Provide an option to change the time at which the cron runs or the frequency of it.
  - [x] main table - show when the data was last updated for that user
  - [x] If a user’s CF handle is updated in the main table, then the CF data must be fetched again in realtime without having to wait for the cron job to run later.
- [x] Inactivity Detection
  - [x] Send inactive users an automatic email
  - [x] Show email sent number in main table 
  - [x] Option to disable the automatic email for individual students.
- [x] Bonus
  - [x] UI is mobile and tablet responsive.
  - [x] Have both light and dark mode with a toggle option.
  - [x] Code is well documented.
# Documentation
## Setup
1. git clone the repo
2. Run `npm i` in backend and frontend directories
3. Create .env in backend (structure given below)
4. Run `node server.js` in backend directory
5. Run `npm run dev` in backend directory
6. To build the frontend into dist run `npm run build`

## API & Routes

### Student Routes (`/api/students`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/getStudentsIdAndHandle` | Returns student's IDs and the Codeforces handles |
| PATCH  | `/toggleReminder/:studentId` | Toggles reminder email status for a specific student |
| GET    | `/submissions/:id` | Fetches all Codeforces submissions for a student |
| GET    | `/contestHistory/:id` | Fetches contest history for a student |
| GET    | `/` | Returns a list of all students |
| POST   | `/` | Adds a new student to the database |
| PUT    | `/:id` | Updates an existing student's details |
| DELETE | `/:id` | Deletes a student record |
| GET    | `/:id` | Retrieves detailed info of a specific student |

### Cron Routes (`/api/cron`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/update-cron` | Updates the current cron job schedule |
| GET    | `/current-cron` | Retrieves the current cron schedule settings |

### Codeforces Routes
These are used internally by the system for syncing data (not exposed directly via API).

## Services

- **sendReminderEmail.js**:  
  Contains functionality to send reminder emails to students using EmailJS.

- **updateCFData.js**:  
  Contains logic to fetch and synchronize data from Codeforces for each student.

## Models

### Student Schema (MongoDB / Mongoose)
| Field Name               | Data Type | Description                                     |
|--------------------------|-----------|-------------------------------------------------|
| `name`                   | String    | Student's full name (required)                  |
| `email`                  | String    | Email address (required, stored in lowercase)   |
| `phone`                  | String    | Contact number (required)                       |
| `cfHandle`               | String    | Codeforces handle (required)                    |
| `currentRating`          | Number    | Current Codeforces rating                       |
| `maxRating`              | Number    | Highest Codeforces rating achieved              |
| `lastSyncedAt`           | Date      | Timestamp of the last successful data sync      |
| `reminderEmailCount`     | Number    | Number of reminder emails sent                  |
| `reminderEmailDisabled`  | Boolean   | Whether reminder emails are turned off          |
| `contestHistory`         | Array     | List of contest objects (stored as raw entries) |
| `submissions`            | Array     | List of submission objects (stored as raw data) |

- **Note**: Both \`contestHistory\` and \`submissions\` are stored as unstructured arrays using flexible Mongoose schemas (\`strict: false\`), to support dynamic Codeforces data.

## Project Structure & Configuration

### .ENV Variables (used for configuration)
- `MONGO_URI` – MongoDB connection string for database.
- `PORT` – Backend server port.
- `EMAILJS_SERVICE_ID` – EmailJS service identifier for sending emails.
- `EMAILJS_TEMPLATE_ID` – EmailJS template identifier used for email format.
- `EMAILJS_PUBLIC_KEY` – Public API key for EmailJS.
- `EMAILJS_PRIVATE_KEY` – Private API key for secure EmailJS access.
- `CF_API_KEY` – API key for Codeforces data fetching.
- `CF_API_SECRET` – Secret for Codeforces API authentication.
- `CRON_SCHEDULE` – Defines how often the cron job runs (e.g., to sync CF data).

---

### Client Pages (used for UI screens)
- **StudentAddPage** – Form to add a new student to the system.
- **StudentEditPage** – Form to edit existing student details.
- **StudentProfilePage** – Displays contest and problem-solving data of a student.
- **StudentTableViewPage** – Lists all students in a searchable/filterable table.

---

### Components (reusable UI pieces)
- **ContestHistory.jsx** – Shows student’s Codeforces contest history in a chart and list.
- **Navbar.jsx** – Top navigation bar for navigating between pages.
- **ProblemSolvingData.jsx** – Displays statistics and charts of problems solved by the student.
- **SubmissionHeatmap.jsx** – Heatmap showing daily submission activity.
- **ViewCodeforcesModal.jsx** – Modal popup to preview student Codeforces data.

---

### Services & Utils (logic and helper functions)
- **exportToCsv** – Utility to export student data or submissions to CSV files.
- **studentAPI.js** – Contains functions to interact with backend APIs like fetching student data, submissions, and contests.

---

### Hooks
- **useTheme** - Hook to toogle dark and light mode

## Directory Structures
### Client
```bash

├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── ContestHistory.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProblemSolvingData.jsx
│   │   ├── SubmissionHeatmap.jsx
│   │   └── ViewCordeforcesModal.jsx
│   ├── hooks
│   │   └── useTheme.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── StudentAddPage.jsx
│   │   ├── StudentEditPage.jsx
│   │   ├── StudentProfilePage.jsx
│   │   └── StudentTableViewPage.jsx
│   └── services
│       ├── exportToCsv.js
│       └── studentAPI.js
```

### Server
```bash
├── controllers
│   ├── cronController.js
│   └── studentController.js
├── cron
│   └── UpdatedataCron.js
├── models
│   └── Student.js
├── package.json
├── package-lock.json
├── routes
│   ├── codeforces.js
│   ├── cronRoutes.js
│   └── studentRoutes.js
├── scripts
│   └── seeder.js
├── server.js
└── services
    ├── sendReminderEmail.js
    └── updateCfData.js
```
