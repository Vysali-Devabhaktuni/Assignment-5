import {fetchData, setCurrentUser, getCurrentUser} from './fetch.js'

class notemaking 
{
    constructor(FN,LN,UN,Pwd1)
    {
    this.fname=FN;
    this.lname=LN;
    this.uname=UN;
    this.password=Pwd1;
    

    }
    getfname(){
        return this.fname;
    }
    getlname(){
        return this.lname;
    }
    getuname(){
        return this.uname;
    }
    getpassword()
    {
        return this.password;
    }
     // getUser()
     // {
      //   return this.User;
     //  }
    // getLoginpwd()
    // {
      //   return this.Loginpwd;
   //  } 
    setfname(FN){
        this.fname=FN;
    }
    setlname(LN){
        this.lname=LN;
    }      
    setuname(UN){
        this.uname=UN;
    }
    setpassword(Pwd1)
    {
        this.password=Pwd1;
    }
    //setUser(user)
   //  {
     //    this.User=user;
    // }
   //  setLoginpwd(password)
   //  {
     //    this.Loginpwd=password;
   // }
}
class notes{
    constructor(notes1)
    {
        this.notetext=notes1;
    }
    setnotetext(notes1)
    {
        this.notetext=notes1;
    }
    getnotetext()
    
    {
        return this.notetext;
    }

}
const registration=document.getElementById("formreg");
if(registration) registration.addEventListener('submit',register)
function register(e){
    e.preventDefault();
    let firstname1=document.getElementById('fname').value;
    let lastname1=document.getElementById('lname').value;
    let username1=document.getElementById('uname').value;
    let passwrd=document.getElementById('password').value;

    let regi= new notemaking(firstname1,lastname1,username1,passwrd);

    fetchData("/users/register", regi, "POST")
    .then((data) => {
      setCurrentUser(data);
      window.location.href = "Note.html";
    })
    .catch((err) => {
        alert("not success");
       let p = document.querySelector('.error');
       p.innerHTML = err.message;
    }) 
    /*
    console.log(regi.FN)
    console.log(regi.LN)
    console.log(regi.UN)
    console.log(regi.Pwd)
    registration.reset();
}
*/
const loginform=document.getElementById("Login");
if(loginform) loginform.addEventListener('submit', loginuser)
function loginuser(l){
  console.log(l);   
    l.preventDefault();
    let user1=document.getElementById('uname').value;
    let password1=document.getElementById('password').value;
    let logi= new notemaking(user1,password1);
    fetchData("/users/login", logi, "POST")
  .then((data) => {
    setCurrentUser(data);
    alert("success")
    window.location.href = "Note.html";
  })
  .catch((err) => {
    alert("not success");
  }) 

  let luser=new notemaking(user,password1);
console.log(`${user}`);
 console.log(`${password1}`);
  loginform.reset();

}
 
    

    let user = getCurrentUser()

const noteform=document.getElementById("note");
if(noteform) noteform.addEventListener('submit',notem)
function notem(f)
{
    f.preventDefault();
    let notetext1=document.getElementById("notetext").value;
    let note1= new notes(notetext1);
    note1.uname= user.uname;
    fetchData("/notes/create",note1, "POST")
    .then((data) => {

      window.location.href = "Note.html";
    })
    .catch((err) => {
     console.log(`Error!!! ${err.message}`)
     
    })
   
   // console.log(`${notetext}`);
    noteform.reset();
}




if(user&&noteform) getallnotes();

function getallnotes(){
    let notetext=document.getElementById("notetext");
    fetchData("/notes/getNote",user,"POST")
    .then((data) => {
 console.log(data);
 for(let i=0;i<data.length;i++){
    notetext.value='\n'+data[i].notes
 }

    })
}
}