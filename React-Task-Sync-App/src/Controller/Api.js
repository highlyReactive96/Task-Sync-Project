const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(express.json());


let ids;
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST','DELETE','UPDATE'],
  credentials:true
  // allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());


const MongoStore = require('connect-mongodb-session')(session);

const sessionStore = new MongoStore({
  uri: "mongodb://127.0.0.1:27017/Project_management_Tool",
  collection: 'sessions'
});
//Set up session middleware
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    store:sessionStore,
    autoRemove: 'interval',
    autoRemoveInterval: 24 * 60 * 60 * 1000
  })
);
// app.use(
//   session({
//     secret: "my-secret-key",
//     resave: false,
//     saveUninitialized: false,
//   cookie:{secure:false,maxAge:20000000000000}
//   })
// );

//
app.use(express.json());
const db = require('../Model/Dao');

//
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
 console.log("hello");
  // get the user from the database
  const user = await db.getUserByEmail(email);
  // if the user doesn't exist, return an error
  if (!user) {
    console.log("here")
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // compare the password to the hashed password in the database
  const passwordIsValid = (password==user.password);
console.log(passwordIsValid)
  // if the password is invalid, return an error
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  req.session.userdata = user
  req.session.save();
  console.log("value",req.session.userdata)
  // generate a JWT token and return it



 console.log("out of login")
  // res.json({ token });
  // res.redirect("/getuser");
  // res.cookie('sessionId', req.session.id);
  res.json({ sessionId: req.session.id });

});


app.get('/getuser', async (req, res) => {
 
 console.log( "inet", req.session.hasOwnProperty('userdata'));
//  const sessionId = req.cookies.sessionId;

//  const sessionData = await sessionStore.get(sessionId);
//  console.log(sessionData);
 const data=req.session.userdata
    res.json(data ); 
});

//app.use('/registercompany', routeCompanyRegistration);
app.post('/registercompany', async (req, res) => {
  try {
      const data=req.body;
      const datauser={
      "name": data.name,
      "position": data.position,
      "email": data.email,
      "password": data.password,
     "companyId": data.companyId,
     "userId":data.userId,
     allowAddProject:true,
     allowAddTask:true,
     allowDeleteProject:true,
     allowMarkAscomplete:true,
     allowDeleteTask:true,
     allowChangePermission:true
  
      };
      await db.saveUserData(datauser);
      await db.saveComapanyData(data);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to register user' });
    }
  })


//register user

app.post('/registeruser', async (req, res) => {
try {
  const data=req.body;
  console.log("in register user")
  await db.saveUserData(data);
  res.status(201).json({ message: 'User registered successfully' });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Failed to register user' });
}
})

//register project
app.post('/RegisterProject', async (req, res) => {
  try {
    const data=req.body;
    await db.addProject(data);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
  })

//feching data for options in project form
// app.post('/employeesoption', async (req, res) => {
//   try {
//     user=req.body;
//     const employees = await db.getdataforoptions(user);
//     res.json(employees); 
//    } 
//     catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

//


app.get('/employeesoption', async (req, res) => {
  try {
    const employees = await db.getalldata();
    res.json(employees); 
   } 
    catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/dataproject/:status', async (req, res) => {
  try {

    var employees;
    const val=req.params.status;
    const data=req.body.userID;
    console.log(val);
   if(val=="backlog"){
    console.log("here")
     employees = await db.backlog();
  }
  else if(val=="active"){
       employees = await db.active();

    }
  else if(val=="completed"){
      employees = await db.fetchcomplete();
      
    }
  else if(val=="myprofile"){
    employees = await db.fetchmyprofile(data);

  }
    else{
      employees = await db.ProjectData();
    }
      res.json(employees); 

    
   } 
    catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//fetch Task
app.get('/fetchTask/:Projectid', async (req, res) => {
  try {
    const id=req.params.Projectid;
    const data = await db.fetchTask(id);
    res.json(data); 
   } 
    catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



//delete projectdata
app.delete('/deletedata',async(req,res)=>{
  try{
  data=req.body._id;
  db.deletedata(data);
}
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }


});

//addtask
app.post('/addTask', async (req, res) => {
  try {
    const data=req.body;
    await db.addTask(data);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
  })

//delete taskcard
app.delete('/deletetask',async(req,res)=>{
  try{
  data=req.body._id;
  db.deletetask(data);
}
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//
app.post('/updatecheckbox', async (req, res) => {
  try {
    const data=req.body;
 console.log(data.index,data.checkedval,data.id);
    await db.updatecheckbox(data.index,data.checkedval,data._id);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
  })
//to mark as complete
app.post('/markascomplete', async (req, res) => {
  try {
    const data=req.body.ProjectId;
    await db.markascomplete(data);
    res.status(201).json({ message: 'status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'cannot update status' });
  }
  });

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
//backlog
app.get('/fetchTask/backlog', async (req, res) => {
  try {
    const id=req.params.ProjectId;
    const data = await db.fetchTask(id);
    res.json(data); 
   } 
    catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//this is to change permission

app.post('/changepermissions', async (req, res) => {
  try {
    const data=req.body;
    console.log(data);
    await db.changepermissions(data);
    res.status(201).json({ message: 'User permission changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to change permission of user' });
  }
  })

//fetch company ID
  app.post('/checkcompanyid', async (req, res) => {
    try {
      const id=req.body.companyId;
      const data = await db.checkcompany(id);
      res.json(data); 
     } 
      catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  //fech useremail
  //fetch company ID
  app.post('/checkemailexists', async (req, res) => {
    try {
      const id=req.body.email;
      console.log(id);
      const data = await db.checkemail(id);
      res.json(data); 
     } 
      catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })
module.exports = app;
