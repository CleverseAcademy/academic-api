export interface ICreateTeacherDto {
  name: string;
  username: string;
  password: string;
}

export interface ITeacherDto {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
}

export interface ILoginDto {
  username: string;
  password: string;
}

export type ILoginResultDto =
  | {
      id: string;
      username: string;
      token: string;
    }
  | { err: string };
