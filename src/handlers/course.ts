import { Course } from "@prisma/client";
import { RequestHandler } from "express";
import { Empty, ICourseHandler, ID } from ".";
import { ICourseDto, IUpdateCourseDto } from "../dto/course.dto";
import { ICourseRepository } from "../repositories";

export default class CourseHandler implements ICourseHandler {
  private repo: ICourseRepository;
  constructor(repo: ICourseRepository) {
    this.repo = repo;
  }

  public getAll: RequestHandler<Empty, ICourseDto[]> = async (req, res) => {
    const result = await this.repo.getAll();

    return res.status(200).json(result);
  };

  public updateById: RequestHandler<ID, Course | string, IUpdateCourseDto> =
    async (req, res) => {
      const { description, duration, start_time } = req.body;

      if (typeof start_time !== "string")
        return res.status(400).send("start_time is not a string");

      if (isNaN(Date.parse(start_time)))
        return res.status(400).send("start_time is invalid");

      const result = await this.repo.partialUpdate(req.params.id, {
        description,
        duration,
        start_time: new Date(start_time),
      });

      return res.status(200).json(result);
    };

  public deleteById: RequestHandler<ID, Course> = async (req, res) => {
    const result = await this.repo.delete(req.params.id);

    return res.status(200).json(result);
  };
}
