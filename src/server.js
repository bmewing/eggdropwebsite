import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dropRouter from './Routes/dropRouter.js'

const app = express();
const port = 80;
const db = mongoose.connect('mongodb://admin:Ino3LyjSTeqCbqrfVo1oyc@ds231758.mlab.com:31758/tricitieseggdrop')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/drops',dropRouter);
app.use(express.static(__dirname + '/public'));

app.get('*',(req,res)=>{
  res.sendfile('./public/index.html')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})