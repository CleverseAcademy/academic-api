import { Course, PrismaClient } from "@prisma/client";
import express, { Request } from "express";
import { DURATION_LIMIT_IN_SECONDS } from "./const";
import { ICreateCourseDto } from "./dto/course.dto";
import CourseRepository from "./repositories/course";
import { ICourseRepository } from "./repositories/course.type";

const client = new PrismaClient();
const app = express();
const courseRepo: ICourseRepository = new CourseRepository(client);

app.use(express.json());

app.post(
  "/course",
  async (req: Request<{}, Course | string, ICreateCourseDto>, res) => {
    const { duration, start_time, name, description } = req.body;

    // validate duration
    if (typeof duration !== "number")
      return res.status(400).send("Duration is not a number");

    if (duration > DURATION_LIMIT_IN_SECONDS)
      return res.status(400).send("Duration is more than limited (8 hrs)");
    // validate start_time

    if (typeof start_time !== "string")
      return res.status(400).send("start_time is not a string");
    if (isNaN(Date.parse(start_time)))
      return res.status(400).send("start_time is incorrect date format");

    // validate name
    if (typeof name !== "string")
      return res.status(400).send("name is not a string");
    if (name.length === 0)
      return res.status(400).send("name can not be empty string");

    // validate description
    if (typeof description !== "string")
      return res.status(400).send("description is not a string");
    if (description.length === 0)
      return res.status(400).send("description can not be empty string");

    const result = await courseRepo.create({
      description,
      duration,
      name,
      start_time: new Date(start_time),
    });

    return res.status(201).json(result);
  }
);

app.get("/courses", async (req: Request<{}, Course[]>, res) => {
  const result = await courseRepo.getAll();


  return res.status(200).json(result);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
