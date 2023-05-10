const { MongoClient,ObjectId } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'Project_management_Tool';

async function getUserByEmail(email) {
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  const user = await db.collection('user').findOne({ email: email });

  return user;
}


async function getalldata() {
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  const user =  db.collection('user').find().toArray();
  return user;
}

async function deletedata(data) {
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);
  const objId = new ObjectId(data); // create a new instance of ObjectId

  const user =  db.collection('projectdata').deleteOne({ _id : objId });
  return user;
}
async function saveComapanyData(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  await db.collection('companies').insertOne(data);
  
}
async function saveUserData(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  await db.collection('user').insertOne(data);

  
}
//add project
async function addProject(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  await db.collection('projectdata').insertOne(data);
  
}
//
async function ProjectData() {
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  const user =  db.collection('projectdata').find().toArray();
  return user;
}


async function addTask(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  await db.collection('TaskData').insertOne(data); 
}
async function fetchTask(data){
  console.log(data);
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  const user= db.collection('TaskData').find({ProjectID:data}).toArray(); 
  return user;
}
async function deletetask(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);
  const objId = new ObjectId(data); // create a new instance of ObjectId

  const user =  db.collection('TaskData').deleteOne({ _id : objId });
  return user;
}

//
async function updatecheckbox(arrayIndex,data,id){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  const objId = new ObjectId(id);
  console.log(objId,arrayIndex,data);
 const result= await db.collection('TaskData').updateOne(
    {  _id : objId },
    { $set: { [`checkboxes.${arrayIndex}.checked`]: data } }
  ); 
  const user=  await db.collection('TaskData').find({_id :objId }).toArray(); 
  console.log(user);
  console.log(`Updated ${result.modifiedCount} document(s)`);
}

//uodatestatus
async function markascomplete(data){
  console.log(data);
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  await db.collection('projectdata').updateOne({ProjectId:data},{$set:{completestatus:true}});

  
}

//filter backlog
async function backlog(){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  const today = new Date().toISOString();;
console.log(today);
  const dbData = await db.collection('projectdata').find({ deadline: { $gt: today } }).toArray();
    return(dbData);
  
}
//for active tasks
async function active(){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  const today = new Date().toISOString();;

  const dbData = await db.collection('projectdata').find({ deadline: { $lte: today } }).toArray();
    return(dbData);
  
}
async function fetchcomplete(){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  const dbData = await db.collection('projectdata').find({completestatus:true }).toArray();
    return(dbData);
  
}

async function fetchmyprofile(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  console.log("data",data)
  const dbData =db.collection('mycollection').find({ selectedEmployees: { $in: [data] } }).toArray();
  console.log("dbDAta",dbData);
    return(dbData);
  
}

async function fetchuserbyID(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  const dbData = await db.collection('user').findOne({userID:data });
    return(dbData);
  
}

async function changepermissions(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  console.log(data)
 {/* allowAddProject:false,
        allowAddTask:false,
        allowDeleteProject:false,
        allowMarkAscomplete:false,
        allowDeleteTask:false */}
// define update operation
const change = {
  $set: {
    allowAddProject: data.allowAddProject,
    allowDeleteProject: data.allowDeleteProject,
    allowMarkAscomplete: data.allowMarkAscomplete,
    allowAddTask: data.allowAddTask,
    allowDeleteTask:data.allowDeleteTask
  }
}
const filter={
  email:data.email
}
  await db.collection('user').updateOne(filter,change);
  
}
//check comapony
async function checkcompany(data){
  const client = await MongoClient.connect(uri);
  console.log(data);
  const db = client.db(dbName); 
  const dbData = await db.collection('companies').findOne({companyId :data });
  console.log(dbData);
    return(dbData);
  
}
//check email
async function checkemail(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  const dbData = await db.collection('user').findOne({email:data });
  console.log(dbData);
    return(dbData);
  
}

//
async function getdataforoptions(data){
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName); 
  const dbData = await db.collection('user').find({companyId:data.companyId });
  console.log(dbData);
    return(dbData);
  
}


module.exports = {getdataforoptions,checkemail,checkcompany,fetchmyprofile,fetchuserbyID,changepermissions,fetchcomplete,active,backlog,markascomplete,updatecheckbox,deletetask,fetchTask, addTask,deletedata,getUserByEmail,saveComapanyData,saveUserData,getalldata,addProject,ProjectData};