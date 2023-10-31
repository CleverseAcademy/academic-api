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
