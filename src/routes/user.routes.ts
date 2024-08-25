import express from "express"
import { UserController } from "../controllers/user.controller";

const router = express.Router();

const usercontroller = new UserController()

//lista todos usuarios
router.get('/users', usercontroller.index)

// criar novo usuario
router.post('/users', usercontroller.store)

//lista um unico usuario
router.get('/users/:id', usercontroller.show)

//atualiza usuario
router.put('/users/:id', usercontroller.update)

//deleta usuario
router.delete('/users/:id', usercontroller.delete)

export default router;