import express from 'express';
import cors from 'cors';
// eslint-disable-next-line no-undef
import router from'./backend/ApiEndpoint.js'
const app=express();

const port=3600;

app.use(cors());
app.use(express.json());
app.use('/api',router);

app.use((err, req, res) => {
    // console.log(res);
      res.status(500).send("Uh oh! An unexpected error occured.")
    })
  
  app.listen(port,()=>{ console.log(`server is running on port ${port}`)});
