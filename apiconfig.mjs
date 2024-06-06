/* eslint-disable no-unused-vars */
/* eslint-env node */
import express from 'express';
import cors from 'cors';
import router from './src/backend/tasksApis.mjs'



const app = express();

const port=6300;


app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use('/api',router);

app.use((err, req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
  })
  
app.listen(port,()=>{ console.log(`server is running on port ${port}`)});
