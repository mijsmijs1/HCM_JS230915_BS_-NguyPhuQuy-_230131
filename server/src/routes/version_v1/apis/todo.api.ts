import express from 'express';
import { todoController } from '../../../controllers/todo.controller';

const Router = express.Router();
Router.post('/', todoController.create)
Router.get('/',todoController.findAll)
Router.put('/:id', todoController.update)
Router.delete('/:id', todoController.delete)
export default Router;