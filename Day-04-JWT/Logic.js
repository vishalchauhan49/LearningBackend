/*   

                               I have written a logic ; 

Their are 3 endpoints "/signup" , "/signin" , "/me" 

While making an auth middleware a problem was occuring that when user signed up and after completing signUp process he should "signIn" first to access "/me" endpoint . But when user was doing so then error was coming " jwt must me assigned " , i dont want that error in fact in place of that error i want that it should print that please sign in first to access 
"/me" endpoint . 

So for that i thought that I can do  1 thing and i.e :-

   If a person "was" signedIn then it means that he must be having a token along with it , so I should check whether a user with x username and y password is having token or not .
   IF he is havinga a token then definately  he was signedIn  previously otherwise i will throw a message that "please sign in first to access "/me" endpoint" . 

*/  
  
  // -------------  HOW TO SEE ILLUSTRATION -----------------------------------------------

// Enter incorrect username or password :- thorws and error simple 

  // REMOVE issuedToken value thus it will show the illustration of a user having no token., means he is tryig to access "/me" before hitting "/signin" or before loggingIn 

  // Dont remove issuedToken:-  SHow the illustration that a user is having a token means he was signedIn and now he wants to access "/me" endpoint
  
  


  
  const users=[{username:"vishal",password:"123",issuedToken:"hgfhjkbdf"}];   // Making a dummy users array for illustration

    
    // now we are taking username and password as input from user (backend logic will be used )
    const username="vishal";
    const password="123";
    
    
 /* Now we are checking whether the user with given details exists in users array (Database ).

     If yes it means that user was "signedUp previously, but yet it's not confirm that he is " signedIn" or not" 
   
        HOW TO FIND:- IF user is having a token then it means that he was "signedIn" if not then  it means he was not signedIn previously.
   
 */  

    for(let i=0;i<users.length;i++)  //checking existence of user in dB
        {

   if(users[i].username==username && users[i].password==password) // Checking that does user have token ?
                                                     

            {

const DoesHaveTokenkey="issuedToken" in users[i]; // return type = TRUE or FALSE
    console.log(DoesHaveTokenkey);
                        
      if(DoesHaveTokenkey===true)
        {

           console.log(" token was issued , u can access '/me' endpoint ");

        } 
        else{


console.log("please signIn first to access '/me' endpoint  ");


        }
            }



            else{
                console.log("invlid username or password,OR user not exists");
                
            }
       



    }
    

                    
      