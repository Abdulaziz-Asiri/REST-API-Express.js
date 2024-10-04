import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoos from 'mongoose';

const app = express();
app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
})

const MONOGO_URL = 'mongodb+srv://abood75:78PUv4f0zfJYmtSl@cluster0.1it7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoos.Promise = Promise;
mongoos.connect(MONOGO_URL);
mongoos.connection.on('error', (error: Error) => console.log(error))


