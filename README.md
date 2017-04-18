# Project: A simple GET /users and POST /user in node.js with TDD.
---

## Instructions:
1. Clone the git directory to your laptop.
2. Run 'npm install' in the directory
3. Run 'node app.js'
5. Run 'npm test' in another terminal.

## About files:
* app.js is the server and router.
* test/user.js is the test file with all the relevant test cases.

## Test cases covered
##Success cases:
    * should return empty array of users.
    * should add the given user in the system. Successful case.
    * should add the given user in the system, though the firstName is duplicated, it is valid and the latest one overrides.
    * should return array of users in the system.

##Error cases:
    * should not add the given user in the system as it has missing firstName.
    * should not add the given user in the system as it has missing lastName.
    * should not add the given user in the system as it has missing email.
    * should not add the given user in the system as it is invalid email.
    * should not add the given user in the system as it is empty firstName.
    * should not add the given user in the system as it is empty lastName.
    * should not add the given user in the system as it is empty email.
    * should not add the given user in the system as it is invalid format.

## Contact:
You can email me at: latha522@gmail.com
