import { Course } from "@prisma/client";
import { RequestHandler } from "express";
import { ICourseDto, IUpdateCourseDto } from "../dto/course.dto";

export interface Empty {}

export interface ID {
  id: string;
}

export interface ICourseHandler {
  getAll: RequestHandler<Empty, ICourseDto[]>;
  updateById: RequestHandler<ID, Course | string, IUpdateCourseDto>;
  deleteById: RequestHandler<ID, Course>;
}
