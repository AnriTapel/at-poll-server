import { CreatePollDTO, PollPayload } from "../types";
import { pool } from "../../db";
import { DefaultDeserializer } from "v8";

const postPoll = async (payload: PollPayload): Promise<CreatePollDTO> => {
  const { title, description, options, isMultiple } = payload;
  const createdAt: string = new Date().toISOString();

  const insertPollQuery = `INSERT INTO polls (title, description, is_multiple, created_at) VALUES ($1, $2, $3, $4) RETURNING id`;

  const pollResult = await pool.query(insertPollQuery, [
    title,
    description || null,
    isMultiple,
    createdAt
  ]);

  const pollId = pollResult.rows[0].id;

  const insertOptionsQuery = `INSERT INTO poll_options (poll_id, option_text) VALUES ($1, $2) RETURNING created_at`;

  payload.options.forEach(async (option) => await pool.query(insertOptionsQuery, [pollId, option]))

  return {id: pollId, created_at: createdAt};
};

export { postPoll };
