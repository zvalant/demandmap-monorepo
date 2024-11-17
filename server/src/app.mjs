import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import {api} from './routes/api.mjs';

/*
Purpose:
Create configuration for server using express.
*/
export const app = express();

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('combined'));
app.use(express.json());
app.use('/v1', api);
app.use(express.static(path.join(__dirname,"..","public")));
app.get("/*", (req,res)=>{
    res.statusCode = 200;
    res.sendFile(path.join(__dirname,"..","public","index.html"));
    
});

