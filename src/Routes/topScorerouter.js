import express from 'express';
import Entrant from '../Models/entrantModel';
import Drop from '../Models/dropModel';
const topScorerouter = express.Router();

topScorerouter.use('/:category', (req,res,next)=>{
  Entrant.find( {category:req.params.category}, (err,entrants) => {
    if(err)
      res.status(500).send(err)
    else {
      req.entrants = entrants;
      next()
    }
  })
})
topScorerouter.route('/:category')
  .get((req, res) => {
    function filterCategory(drop){
      if(drop.drop.length > 0){
        return !drop.drop[0].cracked;
      } else {
        return false;
      }
    }
    
    function sortCategory(a,b) {
      if (a.drop[0].score < b.drop[0].score)
        return -1;
      if (a.drop[0].score > b.drop[0].score)
        return 1;
      return 0;
    }
    
    var tmp = req.entrants;
    tmp = tmp.filter(filterCategory).sort(sortCategory);
  
    var output = 0;
  
    if(tmp.length < 3){
      output = tmp[tmp.length-1].drop[0].score
    } else {
      output = tmp.slice(2,3)[0].drop[0].score
    }
  
    res.json(output)
  })

export default topScorerouter;