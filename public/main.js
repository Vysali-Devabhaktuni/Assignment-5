import {fetchData, setCurrentUser, getCurrentUser} from './fetch.js'

class notemaking 
{
    constructor(FirstN,LastN,UserN,Pwd1)
    {
    this.fname=FirstN;
    this.lname=LastN;
    this.uname=UserN;
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
   
    setfname(FirstN){
        this.fname=FirstN;
    }
    setlname(LastN){
        this.lname=LastN;
    }      
    setuname(UserN){
        this.uname=UserN;
    }
    setpassword(Pwd1)
    {
        this.password=Pwd1;
    }
  
}
class notes{
    constructor(note2)
    {
        this.notetxt=note2;
    }
    setnotetxt(note2)
    {
        this.notetxt=note2;
    }
    getnotetxt()
    
    {
        return this.notetxt;
    }

}
const registration=document.getElementById("Freg");
if(registration) registration.addEventListener('submit',register)
function register(e){
    e.preventDefault();
    let fn=document.getElementById('fname').value;
    let ln=document.getElementById('lname').value;
    let un=document.getElementById('uname').value;
    let pd=document.getElementById('password').value;

    let regi= new notemaking(fn,ln,un,pd);

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
  }

const loginform=document.getElementById("Login");
if(loginform) loginform.addEventListener('submit', loginuser)
function loginuser(l){
 console.log(l);   
    l.preventDefault();
    let us=document.getElementById('uname').value;
    let pw=document.getElementById('password').value;
    let logi= new notemaking(null,null,us,pw);
    fetchData("/users/login", logi, "POST")
  .then((data) => {
    setCurrentUser(data);
    alert("success")
    window.location.href = "Note.html";
  })
  .catch((err) => {
    alert("not success");
  }) 


  loginform.reset();

}
 
    let user = getCurrentUser()

const ntf=document.getElementById("note");
if(ntf) ntf.addEventListener('submit',nfun)
function nfun(n)
{
    n.preventDefault();
    let notetext=document.getElementById("notetxt").value;
    let note1= new notes(notetext);
    note1.userID= user.userID;
    fetchData("/notes/create",note1, "POST")
    .then((data) => {
      window.location.href = "Note.html";
    })
    .catch((err) => {
     console.log(`Error!!! ${err.message}`)
     
    })
   
    console.log(`${notetext}`);
     ntf.reset();
}




if(user&&ntf) getallnotes();

function getallnotes(){
    let notetext=document.getElementById("notetxt");
    fetchData("/notes/getNote",user,"POST")
    .then((data) => {
    //console.log(data);
    /*
 for(let i=0;i<data.length;i++){
    notetext.value='\n'+ data[i].notes
 }
*/
    })
}
