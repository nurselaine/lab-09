# lab-09

### Deployment Test

#### Authors: Elaine Huynh
 - tests report

 #### Setup
    **.env** requirements
    - PORT - 3001

    Running the app
    - npm start
    - Endpoint:  
      - /signup
        - requires a unique username, password, and role
      - /signin
        - requires basic auth username, password
      - /users
        - requires bearer auth token and admin role permissions
      - /jokes - requires bearer token and role access
        - gets all jokes from postgres database 
          - requires only user access and account
      - /jokes/:id
        - gets one joke from postgres database
        - deletes one joke from the database
        - requires only editor, writer, or admin access depending on request 
      - /affirmations
        - gets all affrimations from postgres database 
          - requires only user access and account
      - /affirmations/:id
        - gets one affirmation from postgres database
        - deletes one affirmation from the database
        - requires only editor, writer, or admin access depending on request 

#### Tests
    - Unit Tests: npm run test
    - Lint Tests: npm run lint

#### UML

![UML](https://www.figma.com/file/7XAFoigiz0Z2FhRAdmdvkW/lab-09?node-id=0%3A1)


## Links
- Repo on GitHub: https://github.com/nurselaine/lab-09
- Heroku link: https://jokes-and-affirmations.herokuapp.com/
- Front-end Repo: https://github.com/nurselaine/lab-09-frontend/tree/main/lab-09-frontend