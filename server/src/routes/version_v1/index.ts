import todoApi from './apis/todo.api'
import express from 'express';

const Router = express.Router();
Router.use('/todo',todoApi);
export default Router