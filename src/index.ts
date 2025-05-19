import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import doctorRoutes from './routes/DoctorRoutes';
import PatientRoutes from './routes/PatientRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// express-fileupload middleware (still active for other use cases)
app.use(fileUpload({
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  abortOnLimit: true,
  createParentPath: true
}));

app.use('/api', doctorRoutes);
app.use('/api', PatientRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'The backend server is live' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
