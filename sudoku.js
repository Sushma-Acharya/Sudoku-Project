let tileSelect=null;
let numselect=null;
let errors=10;
let mode="true";
let click="yes";
let a=0;

const question=["-53----9-","-92-36---","8-79-----","-24--3-5-","--1--9643","36--148--","--93--4-2","478-923-5","2-647-91-"]
const answer=["653847291","192536784","847921536","924683157","781259643","365714829","519368472","478192365","236475918"]

let help=document.querySelector("#help");
help.addEventListener("click",()=>location.href="https://gameonfamily.com/sudoku/");
let btn=document.querySelector("#mode");
btn.addEventListener("click",()=>{
    let body=document.querySelector("body");
    if(mode==="true"){
        body.classList.remove("dark");
        btn.innerText="Dark mode";
        mode="false";
    }else{
        body.classList.add("dark");
        btn.innerText="Light mode";
        mode="true";
    }    
});
let sbtn=document.querySelector("#submit");
sbtn.addEventListener("click",()=>{
    if(a==81){
        alert("YOU WON...!");
        location.reload();
    }else{
        alert("Tsk tsk..You couldn't even complete.");
        location.reload();
    }
    
});

window.onload=function(){
    for(let i=1;i<=9;i++){
        let digit=document.createElement("div");
        digit.id=i;
        digit.innerText=i;
        digit.addEventListener("click",selectnum);
        digit.classList.add("digit");
        document.getElementById("digits-container").appendChild(digit);    
    }
    let level=document.querySelector(".level");
    level.addEventListener("click",()=>{
        if(click=="yes"){
            let Id=level.getAttribute("id");
            click="no";
            document.querySelector("#start").innerText="RESTART";
            document.getElementById("submit").classList.remove("hide");
            playIt(Id);
        }else{
            click="yes";
            location.reload();
        }        
    });   
}

function playIt(Id){
    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            if(question[r][c]!=="-"){
                tile.innerText=question[r][c];
                tile.classList.add("starttile");
                a+=1;
            } 
            if(r==2 || r==5){
                tile.classList.add("horizontal");
            } 
            if(c==2 || c==5){
                tile.classList.add("vertical");
            }           
            tile.addEventListener("click",selecttile);
            tile.classList.add("tile");
            document.getElementById("table").appendChild(tile);
        }
    }
}

function selectnum(){
    if(numselect!==null){
        numselect.classList.remove("numselect");
    }
    numselect=this;
    numselect.classList.add("numselect");
}
function selecttile(){
    if(numselect){
        tileselect=this;
        if(tileselect.innerText !=""){
            return;
        }
        let index=tileselect.id.split("-");
        let r=parseInt(index[0]);
        let c=parseInt(index[1]);
        if(answer[r][c] === numselect.id){
            tileselect.innerText=numselect.id;
            a+=1;
        }else{
            tileselect.innerText="";
            let error=document.querySelector("#error");
            errors-=1;
            error.innerText=errors + " LIVES LEFT !!!";
            if(errors==0){
                alert("GAME OVER!\nTry again");
                location.reload();
            }
        }    
    }   
}