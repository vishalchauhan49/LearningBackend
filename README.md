#         Backend Engineering ------- Learning journey 

>  Building backend Skills from scratch , one day at a time ,Notes live are inside the code as comments.

![Alt Text](https://img.shields.io/badge/nodejs-blue)
![alt text](https://img.shields.io/badge/Express-blue)
![alt text](https://img.shields.io/badge/In%20progress-green)
![alt text](https://img.shields.io/badge/started%20june%202026-grey)


# About this repo
I will be sharing my backend learning journey here. 
Each folder of my repo shows a day and topics covered inside it .
Most of the information is present inside my '.js file'

## Learning log

| Day |   TOPICS | WHAT I LEARNED |STATUS |
|-----|----------|--------------|-------|
|01.  |JWT BASICS| Sign,verify,expiry|✅ done
|02.  | JWT middleware   |   Protect route with JWT           |   🔄in progreess    |
|03.  | JWT BUG SOLVING         |   ------           |    🔄In PROGRESS   |
|04.  |          |              |       |

## Today's Goal  
**Day 03 -AuthMiddleware(BUG SOLVING)**  

- Solving tomorrow's middleware BUG ,Stated in Day's README.md file.

 




## What I've learned so far
**Day 01 — JWT:**  

A token has 3 parts — header, payload, signature.
`jwt.sign()` creates a token. `jwt.verify()` checks it.
Always set `expiresIn` or the token never expires.  

**Day 02 -JWT:**   
- I learned about middleware concepts.
 - **Middleware's properties.i.e  
 middleware has access to req, res and next() ,etc** 







## Yet to Master  

- Error  handling




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
