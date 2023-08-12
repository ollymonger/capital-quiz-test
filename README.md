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

To run the workspaces together:

- `yarn start` - starts frontend and backend.

## Project aims

- Application made to aid users in learning capital cities around the world.
- Application randomly selects a country, and presents the user with three options (one correct, two incorrect)
- A button to restart
- Responsive UI
- Should continue till the user chooses to exit the application.
- FE network tab must never see the correct answer until the user has answered for security reasons.

## Future considerations

- Consider using caching services like Redis caching for production environments. Initially, I went with a memory-cache route but as we're using serverless for the backend this is not feasible.
- Consider using React Redux on the frontend, along with a in-browser caching lib to keep "score" data across sessions.
- Update styling to use individual StyledComponents (where appropriate) (or use exposed styling files. SX is appropriate according to MUI v5 documentation)
- Update FE colour schemes to look a bit nicer.
- Add some more random facts.

## Packages currently in use

- Material UI - for efficiency and ease setting up frontend environment.
