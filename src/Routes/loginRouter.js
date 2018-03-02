import express from 'express';
import Login from '../Models/loginModel';
const loginRouter = express.Router();

loginRouter.route('/:user/:password')
    .get((req,res) => {
        Login.findOne({'user':req.params.user}, (err, login) => {
          if(err)
            res.json({response: false});
          else {
            if(login == null){
              res.json({response: false});
            } else {
              res.json({response: login.pass === req.params.password});
            }
          }
        })
    })

export default loginRouter;