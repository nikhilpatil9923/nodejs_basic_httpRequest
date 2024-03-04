const http = require('http');
const fs = require('fs') //filesystem
const path = require('path') //to get the file path
const { json } = require('stream/consumers');
const server = http.createServer((req,resp) => { 
if (req.method === 'POST') { 
let Data = []
req.on('data', (chunk) => {
Data.push(chunk)
}).on('end', () =>{
    const bodyString = Buffer.concat(Data).toString()
    const bodyjson =JSON.parse(bodyString) 
    const {
        Employee, 
        FileID
    } = bodyjson
    const fpath = path.join(__dirname,'Files', `test_file_${FileID}.txt`)
    let filecontent = 'name' + '\t' + 'Role'
    Employee.map((emp) => {
        filecontent = filecontent + '\n' + emp.name +'\t' + emp.Role

    })
    if (fs.existsSync(fpath)) resp.end(JSON.stringify({
   "msg": 'File Already Exists'
    }))

    fs.writeFile(fpath,filecontent, 'utf-8', (err, succ)=>{
     if (err) throw err
     resp.end(JSON.stringify({
       "msg": "File created Successfully"
     }))
    })

})
 
} else {
 resp.end('welcome to the Course') 
}


});   


server.listen(3445, ()=> console.log('Listning to port 3445')); 




