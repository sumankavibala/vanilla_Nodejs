import http from 'http';
const PORT = process.env.PORT;
const users = [
    {id:1, name:"suman one"},
    {id:2, name:"suman two"},
    {id:3, name:"suman three"}
];

//logger middleware
const logger = (req,res,next)=>{
    console.log(req.method);
    console.log(req.url);
    next();

};

//JSON middleware
const jsonMiddleware = (req,res,next)=>{
    res.setHeader('content-Type', 'application/json');
    next();
}

//route handle for GET /api/users
const getUsershandler = (req,res)=>{
    res.write(JSON.stringify(users));
    res.end();
};

//route handle for GET /api/users/:id
const getUserByIdHandler=(req,res)=>{
    const id= req.url.split('/')[3];
    const user = users.find((user)=>user.id===parseInt(id));
    console.log(user);
    if (user) {
        res.write(JSON.stringify(user));
    }
    else{
        res.statusCode= 404;
        res.write(JSON.stringify({message:"User not found"}));
    }
    res.end();
}

//Not found handler
const notFoundHandler = (req,res)=>{
    res.statusCode=404;
    res.write(JSON.stringify({message:"Route not found"}));
    res.end();
}

const server = http.createServer((req,res)=>{
    logger(req,res,()=>{
        jsonMiddleware(req,res,()=>{
            if(req.url === 'api/users' && req.method==='GET'){
                getUsershandler(req,res);
            }
            else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method==='GET'){
                getUserByIdHandler(req,res);
            }
            else{
                notFoundHandler(req,res);
            }
        })
    })
    
    
});


server.listen(PORT,()=>{
    console.log(`server running on port${PORT}`)
});