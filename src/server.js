import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dropRouter from './Routes/dropRouter.js'
import loginRouter from './Routes/loginRouter.js'
import mlabConfig from './mlabconfig.jsconfig'

const app = express();
const port = 80;
const db = mongoose.connect(mlabConfig.admin)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/drops',dropRouter);
app.use('/api/login',loginRouter);
app.use(express.static(__dirname + '/public'));

app.get('/search/*',(req,res)=>{
  res.sendFile('search.html',{root: path.join(__dirname,'./public')});
})

app.get('/data/*',(req,res)=>{
  res.sendFile('data.html',{root: path.join(__dirname,'./public')});
})

app.get('*',(req,res)=>{
  res.sendFile('index.html',{root: path.join(__dirname,'./public')});
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})