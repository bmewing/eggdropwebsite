import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dropRouter from './Routes/dropRouter.js'
import dropstageRouter from './Routes/dropstageRouter.js'
import topScorerouter from './Routes/topScorerouter.js'
import mlabConfig from './mlabconfig.jsconfig'

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';
const db = mongoose.connect(mlabConfig.admin)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/drops',dropRouter);
app.use('/api/stage',dropstageRouter);
app.use('/api/top',topScorerouter);
app.use(express.static(__dirname + '/public'));

app.get('/search/*',(req,res)=>{
  res.sendFile('search.html',{root: path.join(__dirname,'./public')});
})

app.get('/searchResults/*',(req,res)=>{
  res.sendFile('searchResults.html',{root: path.join(__dirname,'./public')});
})

app.get('/data/*',(req,res)=>{
  res.sendFile('data.html',{root: path.join(__dirname,'./public')});
})

app.get('/results/*',(req,res)=>{
  res.redirect('https://markewing.shinyapps.io/kpt-eggdrop/');
})

app.get('*',(req,res)=>{
  res.sendFile('index.html',{root: path.join(__dirname,'./public')});
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);