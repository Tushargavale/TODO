const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const fs=require('fs')
const path=require('path')
app.use(bodyparser.json())
let k;
// read the text file //
// write into text file //
// delete the index according to key  ( which take a arr and key as a argument )
// function two = taka a deta and add some deta and pass to next 
let newToDo;
let array
function readtheFile(resolve,reject)
{
    fs.readFile('response.txt','utf-8',(err,data)=>{
        if(err) throw err
        console.log(data)
       
        resolve(JSON.parse(data))
    })
}


function addToArray(data)
{
    let arr=data
    
    arr.push(newToDo)
    return arr
}



function WriteToFile(data)
{
   
    fs.writeFile('response.txt',JSON.stringify(data),(err)=>{if(err) throw err })
    return data;
}



function Prom(pr)
{
    return new Promise(pr)
}



function newTodo(req,resp)
{
    newToDo =req.body
    newToDo.key=Math.floor(Math.random() * (1000000)) 
    Prom(readtheFile).then(addToArray).then(WriteToFile).then((data)=>{
                resp.send(data)
    })
}


function calculateIndex(arr)
{
    let flag=-1;
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i].key==k) flag=i;
    }
   return flag
   
}

function deleteIndex(index)
{
    if(index<0) return "No such a index is present "
    else
    {
        array.splice(index, 1);
        WriteToFile(array)
        return(" Data is deleted ... ")
    }
}



function deleteindex(req,resp)
{
    k=req.params.key
    Prom(readtheFile).then((data)=>{
    array=data
    return data       
    }).then(calculateIndex).then(deleteIndex).then((data)=>resp.send(data))
  
}

function showall(req,resp)
{
    Prom(readtheFile).then((data)=>{
        resp.send(data)
    })
}

app.post('/addNewToDo',newTodo)
app.delete('/deletetheIndex/:key',deleteindex)
app.get('/showAllToDo',showall)


app.get('/',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'index.html'))
})






app.listen(3001,console.log("3001"))