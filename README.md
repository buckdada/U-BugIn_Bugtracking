# U-BugIn_Bugtracking
## Technical Infrastructure
- **Persistence:** Data is stored locally using the `localStorage` WebAPI.
- **Entities:** The system manages three core entities: `People`, `Projects`, and `Bugs`.
- **Seed Data:** On the first load, the system automatically populates 11 sample issues to demonstrate dashboard functionality.
## Dashboard Information
- Shows the total tickets (issues) available, how many are open and how many are pending.
- Status pie chart of Open/Resolved/Overdue
- Priority bar chart of High/Medium/Low
- Status pie chart of Started/Not Started
    **Started:** How many projects are there?
    **Not Started:** How tickets are open - How many projects are there?
## SINGLE PAGE APPLICATION(SPA)
- Each anchor in the navigation bar(sidebar) hides all pages execpt the clicked one.
- When the website loads or refreshes it always loads the Dashboard page.