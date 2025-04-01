import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleUpload, checkStatus } from './controllers/uploadController.js';
import { limiter } from './middleware/rateLimiter.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const upload = multer({ dest: 'uploads/' });

app.post('/upload', limiter, upload.single('file'), handleUpload);
app.get('/status/:uploadId', checkStatus);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

