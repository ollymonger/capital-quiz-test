# capital-quiz-test

Capital city quiz code test

## Installation

Run the following command at the project root:

```
yarn (or npm) install
```

## Running the project

To run the workspaces individually:

- `yarn backend:start` - to start the backend.
- `yarn frontend:start` - to start the frontend.

## Project aims

- Application made to aid users in learning capital cities around the world.
- Application randomly selects a country, and presents the user with three options (one correct, two incorrect)
- A button to restart
- Responsive UI
- Should continue till the user chooses to exit the application.
- FE network tab must never see the correct answer until the user has answered for security reasons.

## Future considerations

- Consider using caching services like Redis caching for production environments. Initially, I went with a memory-cache route but as we're using serverless for the backend this is not feasible. I could also implement caching services like: `DynamoDB` or a serverless local equivalent.
- Consider using React Redux on the frontend, along with a in-browser caching lib to keep "score" data across sessions.
- Update styling to use individual StyledComponents (where appropriate) (or use exposed styling files. SX is appropriate according to MUI v5 documentation)
- Update FE colour schemes to look a bit nicer.
- Add some more random facts.
- If more time, add some unit tests for both backend and frontend.
- Would be nice to have an individual page/display if something went wrong, in addition to the snackbar elements.
- Consider having a backend API route of which is used to determine whether the backend is accessible? - This way, I could've ensured that no "loading" spinners are consatntly spinning on load if the backend route is not available?

## Packages currently in use

- Material UI - for efficiency and ease setting up frontend environment.
- Notistack's Snackbar - for ease of use to display errors.
