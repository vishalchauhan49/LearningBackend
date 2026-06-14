# Day 01 - JWT BASICS

**Date:** 13-june-2026  
**Topic:** JSON Web Token






---
## 🎯 what i planned to learn
- What is jwt and why it is used ?  
- How a token is structured(header, payload , signature)  
- How to create a token is Node.js  


## Confusions/doubts came while learning  
- Where is the use of Database 
- what is stateless and what is stateless



## What i actually learned  
- JWT = 3 base64-encoded parts separated by dots  
- JWT is stateless
- The secret signs the token — payload is readable by anyone but can't be faked
- `jwt.sign(payload, secret, { expiresIn })` creates a token
- `jwt.verify(token, secret)` throws an error if invalid or expired
- **Confusion resolved:** Why no DB storage? Because verification is stateless —
  the signature itself proves the token is valid

## Questions I still  have
**✅: means got answer**  
**➡️:will got answer in upcoming concepts**  
**❓Answer to be found**

- Difference between JWT and session-based auth?✅
- Where should the token live on the client — localStorage or a cookie?✅
- What is a refresh token and when do I need one?✅

## To be found answers and some extra information if have !  
- we can add spaces in README.md files by having two spaces successively or by typing `"\"` 
  
    
      
        
          

             

