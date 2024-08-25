import express from "express"
import { TweetController } from "../controllers/tweet.controller"
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router();

const tweetcontroller = new TweetController()

//lista todos tweets
router.get('/:idUser/tweets', validateToken, tweetcontroller.index)

 // criar novo tweets
router.post('/:idUser/tweets', validateToken, tweetcontroller.store)

// //lista um unico tweets
router.get('/:idUser/tweets/:id', validateToken, tweetcontroller.show)

// //atualiza tweets
router.put('/:idUser/tweets/:id', validateToken, tweetcontroller.update)

// //deleta tweets
router.delete('/:idUser/tweets/:id', validateToken, tweetcontroller.delete)

export default router;