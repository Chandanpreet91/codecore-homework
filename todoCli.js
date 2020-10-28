const readLine = require('readline');

const rl = readLine.createInterface({
    input : process.stdin,
    output: process.stdout,
})

console.log('Welcome to Todo CLI! ')
console.log('------------')
let arrOfData =[];
function todoList(){
    let list = `(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit \n`;
    function prompt(){
rl.question(list,(answer) =>{
if(answer === 'v'){
    if(arrOfData.length === 0){
        console.log(`The list is empty`)
        prompt();
    }
else{
let index = 0;
for(let element of arrOfData){
    console.log(index,element)
    index++;
    }
    prompt();}
}
   
if(answer === 'n'){
rl.question('What item to add to Todo List\n',(answer)=> {
       let newList = arrOfData.push(answer);
            console.log(newList);
            prompt();
        })
        }
if(answer === 'cX'){
    let complete = '*'
        rl.question(`what do you want to complete\n`, answer => {
            if(answer > arrOfData.length ){
                console.log(`The item is not in list`)
            }else{
            console.log(`completed ${arrOfData[answer]}`)
            arrOfData[answer] = complete + arrOfData[answer];
            }
            
     prompt();
 })
 
}
if(answer === 'dX'){
       rl.question(`What to delete \n`, answer =>{
           if(answer > arrOfData.length){
               console.log('wrong number entered');
           }else{
           arrOfData.splice(answer,1);
           console.log(arrOfData);
          }prompt();
       })
   }
if(answer === 'q'){
    console.log(`See you soon`)
    rl.close();
}
})

}
prompt();
}
todoList();