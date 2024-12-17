import { IUser } from "./interfaces/interfaces";


declare global{
    namespace Express{
        export interface Request{
            user: IUser;
        }
    }
}