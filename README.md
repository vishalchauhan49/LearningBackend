#         Backend Engineering ------- Learning journey 

>  Building backend Skills from scratch , one day at a time ,Notes live are inside the code as comments.

![nodejs ](https://img.shields.io/badge/nodejs-blue)
![express](https://img.shields.io/badge/Express-blue)
![Inprogress](https://img.shields.io/badge/In%20progress-green)
![started june 2026](https://img.shields.io/badge/started%20june%202026-grey)


# About this repo
I will be sharing my backend learning journey here. 
Each folder of my repo shows a day and topics covered inside it .  

Detailed information is present inside my '.js file' and README.md files of each day.

## Learning log

| Day |   TOPICS | WHAT I LEARNED |STATUS |
|-----|----------|--------------|-------|
|01.  |JWT BASICS| Sign,verify,expiry|✅ done
|02.  | JWT middleware   |   Protect route with JWT           |   ✅     |
|03.  | JWT BUG SOLVING         |   Was just fixing         |    ✅   |
|04.  | Bug Solving        | ERROR HANDLING            |🎯Error Solved      |
|05  | Mastering Error Handling     |  try catch , try catch in middleware, route level error handling      |  ✅      |
|06  | Made an Auth based webpage    |  connecting FRONTEND to BACKEND      |    ✅   |   
|07| ASSIGNMENT SOLVING|  🔄In progress     |  🔄In progress          |
|08| MongoDB | Installing mongoDb (locally and cloud) and setting up mongodb compass.| ✅| 
|09|Deep dive MongoDb|basically i was solving assignment| 🔄 In progress        |     
|10|Assignment solving|EJS TEMPLATING | 🔄|   
|11|Assignment solving and MongoDb deep dive|-|-|   





## Today's Goal  
**Day 11: Assignment solving & MongoDb deep dive**  

- 

 




## What I've learned so far
**Day 01 — JWT:**  

A token has 3 parts — header, payload, signature.
`jwt.sign()` creates a token. `jwt.verify()` checks it.
Always set `expiresIn` or the token never expires.  

**Day 02 -JWT:**   
- I learned about middleware concepts.
 - **Middleware's properties.i.e  
 middleware has access to req, res and next() ,etc**  

 **Day 03 & 04 JWT:**  
 Learned "ERROR HANDLING".   

 **Day 05:**  
 Learned about error handling.  
 > - Route based error handling in Express.   
 >- Try catch inside route using next(err).  

**Day 06:**   
- Security of a jwt.  
- connecting a frontend to backend using same server and different server (cors concept);  
-  localstorage and its functions.  
- Deep dived into Devtools of a browser.   

**Day 07:**   
- solving assignment 

**Day 08**   
- Learned about databases .   
- Specially NoSqL database (MongoDb);  
- MongoDb use cases and its properties like its schema less characterstics.   

**Day 09 & 10**  
- Basically  solving the assignment and detais are in the readme.md file of day 10 .  

**Day 11**. 
-   


    
 

## Yet to Master  

- ![Alt Text](https://img.shields.io/badge/ErrorHandling-red): mastered ✅.  
- EJS templating concepts.📌





## How to run any day's code

```bash
cd day-01-jwt
npm install
node index.js
```
> In place of day-01-jwt any other folder can be present so put that name their & same for index.js file.

## Stack

- Node.js + Express
- jsonwebtoken, dotenv(not used dotenv still)
- MongoDB + Mongoose (coming soon)
- Postman for testing

---


*Started 13-June 2026*
