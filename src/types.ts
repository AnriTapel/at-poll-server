export type PollPayload = {
    title: string;
    description?: string;
    options: string[];
    isMultiple: boolean;
}

export type PollDTO = Omit<PollPayload, 'isMultiple'> & {
    id: string;
    is_multiple: boolean;
    created_at: string;
}

export type CreatePollDTO = Pick<PollDTO, 'id' | 'created_at'>;