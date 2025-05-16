import { Job } from "./job.types";

export interface User {
    name: string;
    surname: string;
    username: string;
    email: string;
    jobs: Job[];
}