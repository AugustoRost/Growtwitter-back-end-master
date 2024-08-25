import express from "express"
import { LikeController } from "../controllers/like.controller"
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router();

const likeController = new LikeController()

// //lista todos likes
router.get('/:idUser/likes', validateToken, likeController.index)

//  // criar novo likes
router.post('/:idUser/likes', validateToken, likeController.store)

// // //lista um unico likes
router.get('/:idUser/likes/:id', validateToken, likeController.show)

// // //atualiza likes
router.put('/:idUser/likes/:id', validateToken, likeController.update)

// // //deleta likes
router.delete('/:idUser/likes/:id', validateToken, likeController.delete)

export default router;