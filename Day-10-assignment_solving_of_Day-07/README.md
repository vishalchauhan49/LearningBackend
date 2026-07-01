# Day 09 - Diving deep into MongoDb 

**Date:** 1-july-2026  
**Topic:** Solving assignment 




---




## 🎯 what i planned to learn
- I planned to learn and implement the concept of serving html files between client and a server.

## PROBLEM I FACED  
- One confusion which came in my mind was:-  
   While making a frontend and a backend .In backend i was serving a html file as a resopnse on "/" route and in that html their were two inputs and  one button .  

- On Clicking a button , frontend sends a request to a route named "/newhtml" on my backend serve  and as a response in  response object(req) i was sending a new html file`res.sendFile("")` and in that file "I WAS EXPECTING TO HAVE THE CONTENTS OF THAT PREVIOUS HTML FILE for ex: username & password . "   

  <br>
- But i was unable to send body contents which i got like :-`req.body.data`;   
**So that was the problem i was facing and i was willing to have a live data injected at the moment of request in my new html so that i can send it along with my file as a response.**
- Iit was failed :- `Then i came to know about dynamic content and static content . `  
- `I came to know about "EJS" Embedded JavaScript templating.(.ejs file)` 

 
   
## Solution to the problem     
- **EJS:-** Solved this problem   
- Think .ejs file as a "FILL IN THE BLANKS FILE" ,it had js embeddings which gets the value (dynamic data) and gets server when tha file is executed.   
- .ejs file is the story with blanks, `res.render()` is you filling in the blanks with real words, and what gets mailed out is the completed story — no blanks visible.


## What i actually learned 
- 
- 

## Questions I still  have
- none   
- none   
- none

## To be found answers and some extra information if have !  
- none   
- none 
    
      
        
          

             

