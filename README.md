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
Note: Full content is coded by me so , it can have grammer mistakes .As told earlier ' I am not a professional till now , thats why name of repo is learning backend "

## Learning log

| Day |   TOPICS | WHAT I LEARNED |STATUS |
|-----|----------|--------------|-------|
|01.  |JWT BASICS| Sign,verify,expiry|✅ done|
|02.  | JWT middleware   |   Protect route with JWT  |   ✅     |
|03.  | JWT BUG SOLVING  |   Was just fixing         |    ✅   |
|04.  | Bug Solving      | ERROR HANDLING            |🎯Error Solved      |
|05  | Mastering Error Handling |  try catch , try catch in middleware, route level error handling      |  ✅      |
|06  | Made an Auth based webpage    |  connecting FRONTEND to BACKEND |    ✅   |   
|07| ASSIGNMENT SOLVING| solved  On Day 10 by ejs architecture     | ✅   |
|08| MongoDB | Installing mongoDb (locally and cloud) and setting up mongodb compass.| ✅| 
|09|Deep dive MongoDb|basically i was solving assignment| ✅  |     
|10|Assignment solving|EJS TEMPLATING | ✅ |   
|11|Assignment solving and MongoDb deep dive|EJS embeddings, form actions,dynamic data handling using fetch() & forms  | ✅|   
|12 | mongodb | Made Auth-Based `TODO  backend` using database  | ✅ |  
|13|  Password hashing   | Hashing mechanism , functions of hashing     |✅ |
|14| Input Validation| `Zod library`, Error handling in zod (custom errors , error formatting etc  ) | ✅ |
|15| Backend of course selling app  |`Express Routing`   | 🔄 In progress |
|16|Backend of course selling app continued| same | 🔄 |
|17| Backend of a course selling app | admin end point is completed | 🔄 |
|18| `Created` own NPM package | npm package , npx  |  ✅    |
|19| Backend of course selling app | some `features` to add  |  🔄    | 
|20|      |          |        |     










## Today's Goal  
**Day 20:** Adding some features in Backend of course selling app

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

**Day 11** 
- Practised the core concept of how backend and frontend handles the dynamic data.   
- Completed EJS embeddings its core methodas and functions like `res.render()` and `app.set("view engine" ,".ejs )`.  

**Day 12**   
- Made `Auth based TODO BACKEND with database` 
- Learned about the implementations of database in express .  
- used `mongoose` library to connect our express app to cloud data base using a `cluster` link .
- Got an idea about `clusters` , `database` , `Document model`  basically mongodB's data collection technique.
- Worked with `mongodb compass`

**Day 13** 
 - Implemented a new library called `bcrypt` for `password hashing`
 - practised its syntax .
 - Learned its architecture/mechanism , How it does things ?
 - Learned about `salting`  

**Day 14**

- Learned about validation using zod library 
- Error handling in zod 

**Day 15 , 16, 17**
- Learned about `express Routing`
- used `express.Router()`. 

**Day 18** 
- `Created own NPM package` 

**Day 19** 
- 90 % of Backend of course selling app completed , some features to include (check readme.md file of Day 19 for more details).



    
 

## Yet to Master [✅ means mastered ] 

- Error handling  ✅.  
- EJS templating concepts.✅
- MongoDb to be deep dived 





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
- MongoDB + Mongoose 
- Postman for testing

---


*Started 13-June 2026*
