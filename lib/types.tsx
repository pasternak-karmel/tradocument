export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
}

export interface AuthResult {
  type: string;
  message: string;
}

export interface User extends Record<string, unknown> {
  id: string;
  email: string;
  password: string;
  salt: string;
}
