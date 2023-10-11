# triPPP

### Team 4 thanks you for beta testing **triPPP**!
---

## Here's how to install:

# create the database
1. Create a database called trippp  
`psql`   
`createdb trippp`
  
2. Clone down this repo and navigate into triPPP
  
# server
3. Check that posgreSQL ports are appropriate for you, especially in:
   /server/index.js
   /server/db/client.js
     
4. Navigate into the /triPPP/server directory  
`npm install`   
`npm run seed`
  
5. Check that .gitignore lists **server/secrets.js**
     
6. Create a file called secrets.js in the root of the server directory (same level as package.json)  
   Check slack for instructions on what goes into this file
     
# client
7. Navigate into the /triPPP/client directory  
`npm install`
  
8. Check that .gitignore lists **.env**
     
9. Create a file called .env in the root of the client directory (same level as package.json)  
   Check slack for instructions on what goes into this file  

## Please fill out a feedback form:
[TriPPP Beta Tester User Feedback](https://docs.google.com/forms/d/e/1FAIpQLSdLobyI2oW-gHR8zIOA_pzTvsHACuLUMQSxEuYpKycBuZs_DQ/viewform)