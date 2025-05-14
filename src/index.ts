import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import doctorRoutes from './routes/DoctorRoutes';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/api/doctors', doctorRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'The backend server is love' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});