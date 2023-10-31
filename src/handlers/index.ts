import { Course } from "@prisma/client";
import { RequestHandler } from "express";
import { ICourseDto, IUpdateCourseDto } from "../dto/course.dto";
import {
  ICreateTeacherDto,
  ILoginDto,
  ILoginResultDto,
  ITeacherDto,
} from "../dto/teacher.dto";
import { AuthState } from "../middleware/jwt";

export interface Empty {}

export interface ID {
  id: string;
}

export interface ICourseHandler {
  getAll: RequestHandler<Empty, ICourseDto[]>;
  updateById: RequestHandler<ID, Course | string, IUpdateCourseDto>;
  deleteById: RequestHandler<
    ID,
    Course | string,
    undefined,
    undefined,
    AuthState
  >;
}

export interface ITeacherHandler {
  register: RequestHandler<Empty, ITeacherDto, ICreateTeacherDto>;
  login: RequestHandler<Empty, ILoginResultDto, ILoginDto>;
}
