import express from 'express';
import dropStage from '../Models/dropstageModel';
const dropstageRouter = express.Router();

dropstageRouter.route('/:year')
    .get((req,res) => {
        dropStage.findOne({'year':req.params.year}, (err, dropstage) => {
          if(err)
            res.json({stage: 0});
          else {
            res.json({stage: dropstage.stage})
          }
        })
    })

export default dropstageRouter;