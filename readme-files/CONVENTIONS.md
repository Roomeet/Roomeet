# Roomeet
The Roomate matching service for you
## find
- [Linting](#lint)
- [Branch naming](#Branches)
- [Code Conventions](#Conventions)  

---
## lint
an eslint configuration file is provided for both the client and backend. to make it go on-save follow these [instructions](https://www.digitalocean.com/community/tutorials/workflow-auto-eslinting)
## Branches
Branch names should describe what the feature you are working on is.
Good name: `dev-mock`  
bad name: `Omri's-cool-branch`

## Conventions
- [Frontend](#Frontend)
- [Backend](#Backend)
### Frontend
#### naming
- All react files should be PascalCaed (every word starts with an uppercase letter)
#### style
- we use Material ui for style. custom css should be created using the useStyles API.
### Backend
#### naming
- server file names should be camelCased
- endpoints must be in their proper route (user data endpoint, in the [`userRoutes`](server/src/api/v1/userRoutes.ts) file)