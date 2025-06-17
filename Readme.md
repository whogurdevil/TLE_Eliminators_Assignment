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
- [ ] Bonus
  - [ ] UI is mobile and tablet responsive.
  - [ ] Have both light and dark mode with a toggle option.
  - [ ] Code is well documented.





