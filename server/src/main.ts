import express from 'express';
import cors from 'cors';
import RouterApi from './routes'
const app =express();
app.use(cors());
app.use(express.json());
app.use('/api',RouterApi);
app.listen(3000, ()=>{
    console.log('Server on at: http://localhost:3000/api/v1')
})