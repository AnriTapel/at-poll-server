import { Router, Request, Response } from 'express';
import { DatabaseError } from 'pg';
import { postPoll } from '../controllers/poll';
import { CreatePollDTO, PollPayload } from '../types';

const pollRoute = Router();

pollRoute.post('/', async (req: Request<unknown, CreatePollDTO, PollPayload>, res: Response<CreatePollDTO | string>): Promise<void> => {
    try {
        const payload = req.body;
        const dto = await postPoll(payload);
        res.status(201).send(dto);
    } catch (e: unknown) {
        if (e instanceof DatabaseError) {
            const message = `postPoll error with code ${e.code} and detail: ${e.detail}`;
            res.status(500).send(message);
        } else {
            res.status(500).send('UnexpectedError: postPoll - ' + JSON.stringify(e));
        }
    }
});

export { pollRoute };