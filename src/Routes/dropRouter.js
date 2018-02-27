import express from 'express';
import Entrant from '../Models/entrantModel';
import Drop from '../Models/dropModel';
const dropRouter = express.Router();

dropRouter.route('/')
    .get((req,res) => {
        var thisYear = new Date().getFullYear()
        Entrant.find({year:thisYear}, (err, drops) => {
          res.json(drops)
        })
    })
    .post((req,res) => {
      let entrant = new Entrant(req.body);
      entrant.save();
      res.status(201).json(entrant);
    })

dropRouter.use('/:entrantID', (req,res,next)=>{
  Entrant.findById( req.params.entrantID, (err,entrant) => {
    if(err)
      res.status(500).send(err)
    else {
      req.entrant = entrant;
      next()
    }
  })
})
dropRouter.route('/:entrantID')
  .get((req, res) => {
    res.json(req.entrant)
  })
  .post((req,res) => {
    let drop = new Drop(req.body);
    req.entrant.drop.push(drop);
    req.entrant.save();
    res.json(req.entrant);
  })
  .delete((req,res)=>{
    Entrant.remove({_id: req.params.entrantID},(err,numAffected)=>{
      if(err)
        res.status(500).send(err)
      else
        res.status(200).send(numAffected)
    })
  })
  .patch((req,res)=>{
    if(req.body._id) delete req.body._id;
    for(let p in req.body){
      req.entrant[p] = req.body[p]
    }
    req.entrant.save()
    res.json(req.entrant)
  })


dropRouter.route('/:entrantID/:dropID')
  .get((req,res) => {
    Entrant.find({_id: req.params.entrantID,"drop._id": req.params.dropID},(err,entrant)=>{
      if(err)
        res.status(500).send(err)
      else 
        res.json(entrant)
    })
  })
  .delete((req,res) => {
    Entrant.update({"_id": req.params.entrantID},{"$pull": {"drop": {"_id": req.params.dropID}}},
      function(err, numAffected){
        if(err){
          res.status(500).send(err)
        } else {
          res.status(200).send(numAffected);
        }
      })
  })
  .patch((req,res) => {
    var set = {};
    for(var field in req.body){
      set['drop.'+field] = req.body[field]
    }
    Entrant.update({_id: req.params.entrantID,"drop._id": req.params.dropID},{$set: set},
      function(err, numAffected){
        if(err){
          res.status(500).send(err)
        } else {
          res.status(200).send(numAffected);
        }
      })
  })
export default dropRouter;