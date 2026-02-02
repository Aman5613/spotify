import express from 'express';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
  res.send('Notification Service is running');
})



export default app;

