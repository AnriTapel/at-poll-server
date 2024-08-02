import express, {Express} from 'express';
import cors from 'cors';
import { pollRoute } from './src/routes/poll';
const port = 3000;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/poll', pollRoute);

app.listen(port, () => {
    console.log(`ComboEdit server -> listen on port ${port}`);
});