let express=require("express")
const app = express()
const cors =require("cors")
app.use(cors())
const sqlite3=require("sqlite3")
const path=require("path")
const dbPath=path.join(__dirname,"employes.db")
const {open}=require("sqlite")
const bcrypt=require("bcrypt")
let db=null
app.use(express.json())
const jwt = require("jsonwebtoken")
app.use(express.static(path.join(__dirname, '../public')));
let intializeDbAndServer=async ()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database,
        })
        app.listen(3000,()=>{
            console.log("server is running")
        })
    }
    catch(e){
        console.log(e)
    }
}
intializeDbAndServer()

app.post("/login",async (request,response)=>{
    const {username,password}=request.body
    const getQuery=`select * from employees where username='${username}'`
    const getItem=await db.get(getQuery)
    
    // console.log(getItem)
    if(getItem===undefined){
        response.status(401)
        response.send("Invalid username")
    }
    else{
        isPassMatch=await bcrypt.compare(password,getItem.password_hash)
        if(isPassMatch===true){
            const payload={
                username:username,
            }
            const jwtToken=jwt.sign(payload,"secretkey")
            // console.log(jwtToken)
            const signQuery = `INSERT INTO work_sessions (employee_id) 
                               SELECT id FROM employees WHERE username = '${username}'`;
            await db.run(signQuery);
            response.send({jwtToken})
        }
        else{
            response.status(400)
            response.send("Invalid password")
        }
    }
})

app.post("/register", async (request,response)=>{
    const {name,email,mobile,username,password,address}=request.body 
    // console.log(password)
    const getQuery=`select * from employees where username='${username}'`
    const getItem=await db.get(getQuery)
    
    if(getItem===undefined){
        const hashedPassword= await bcrypt.hash(password,10)
        insertQuery=`insert into employees (name,email,username,password_hash,mobile,location) values ('${name}','${email}','${username}','${hashedPassword}','${mobile}','${address}');`
        const getItem= await db.run(insertQuery)
        response.send("registered successfully")
    }
    else{
        response.send('username already exists')
    }

})

app.get("/tasks",async (request,response)=>{
    const getQuery=`select * from tasks`
    const getData=await db.all(getQuery)
    console.log(getData)
    response.send(getData)
})

app.get("/checkin",async (request,response)=>{
    const getQuery=`select * from work_sessions`
    const getData=await db.all(getQuery)
    console.log(getData)
    response.send(getData)
})


app.post("/logout",async (request,response)=>{
    const {username}=request.body
    console.log(username)
    const upQuery=`UPDATE work_sessions 
            SET sign_out_time = CURRENT_TIMESTAMP 
            WHERE id = (SELECT id FROM work_sessions WHERE employee_id = (SELECT id FROM employees WHERE username='${username}') AND sign_out_time IS NULL ORDER BY sign_in_time DESC LIMIT 1);
            `
    const res=await db.run(upQuery)
    response.send("successfully logged out")

})

app.post("/home",async (request,response)=>{
    const {username}=request.body 
    const getQuery=`SELECT COUNT(DISTINCT date) as count FROM work_sessions where employee_id=(select id from employees where username='${username}')`
    const getItem=await db.all(getQuery)
    const getQuery2=`SELECT * from work_sessions ORDER BY id DESC LIMIT 1`
    const getItem2=await db.get(getQuery2)
    response.send({getItem,getItem2})
})

app.post("/profile",async (request,response)=>{
    const {username}=request.body 
    const getQuery=`select * from employees where username='${username}'`
    const getItem=await db.all(getQuery)
    response.send(getItem)
})