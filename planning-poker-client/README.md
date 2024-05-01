# Planning Poker FrontEnd

## Description
This is the front end of the Planning Poker project. It is a web application that allows users to create and join planning poker sessions. The front end is built using React and Redux.

## Installation
1. Install dependencies
```bash
yarn
```
2. Create a `.env` file in the root of the project and add the following environment variables:
```bash
REACT_APP_BASE_URL=http://localhost:3001
```

## Running the application
```bash
yarn start
```

## Description of the project structure
- `src/` contains the source code of the application
  - `components/` contains the React components
  - `pages/` contains the pages of the application, currently is `HomePage` and `GamePage`
  - `states/` contains the Redux store configuration and actions
  - `services/` contains the services that interact with the backend
  - `App.tsx` is the main component of the application
  - `index.tsx` is the entry point of the application
  - `ThemeContext.tsx` provides the theme context necessary for typography and dark mode