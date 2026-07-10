**Day 14:- Input validation**

**Date:** 10 july 2026   
**Topic:** Simple input valiation

# Mechanism of Input Validation
- In input validation we define our desired input schema i.e type of input data my backend is desiring . 
- For example :- 

 

   ```
  const {Z}= require("zod");
  const desireData= z.string();
  // Data can be string , object , array etc 

  const input_Data="" 

  const result=desiredDatasafeParse(input_Data);
  console.log(result);

`.safeParse()` & `parse()` both are functions for validating the desired schema over users input.

# Some notes for .safeParse()
- This function returns an object { }
- Returned object has a key named success = (true or false ) for both cases.

**CASE 1:-VALIDATION SUCCEEDS**
- { success: true , Data: "Input data od user" }

**CASE 2:-VALIDATION FAILS**
  ```
  
  {  
  success: false,  
  error: ZodError: [    
    {
      "expected": "string",       
      "code": "invalid_type",     
      "path": [],
      "message": "Invalid input: expected string, received object"
    }
  ]
  }
 
```
> Instances of $ZodError contain an `.issues array`. Each issue contains a human-readable message and additional structured metadata about the issue

- result.error.issues gives an array of issues with the message key.

## Custom errors 
> Personally i prefer this syntax of custom errors 
 - All z functions and schema methods accept custom errors.
 - That custom error message goes inside the issues array's message key 
  For example 
  ```
z.string({error:"Bad!"}).parse(12);
 ❌ throws ZodError {
   issues: [
    {       expected: 'string',
       code: 'invalid_type',
       path: [],
       message: 'Bad!'   <-- 👀 custom error message
     }
   ]
 }

```

 - I prefer below 
- `z.string({ error: "Bad!" })`;  
   `z.string().min(5, { error: "Too short!" })`;


# Formatting Errors 
   
> Formatting errors means displaying errors in a human readable format . Easy readable , So that user can easily see the error message .

- Their are multiple functions to do this bya zod 
  
  ```
  z.treeifyError()
  z.prettifyError()
  z.formatError()
  z.flattenError()

  ```

## what i planned to learn 
-  I planned to learn input validations using zod 


## What i actually learned 

-  I came to know that a function can really have 2 return type as we can see in `safeParse()`
-  I came to knwo that errors can be formatted using zod functions 
- I went through all basic the docs and concepts of zod 


## Doubts /confusion 
- none 
- none 
- none 