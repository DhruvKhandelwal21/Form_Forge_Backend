import { Request } from 'express';
export interface User {
    _id: string;
    username: string;
    email: string;
    // Add other user fields as necessary
  }

export interface UpdatedRequest extends Request {
    user: User;
  }

 