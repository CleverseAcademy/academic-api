import { PrismaClient } from "@prisma/client";
import express from "express";
import { ICourseHandler, ITeacherHandler } from "./handlers";
import CourseHandler from "./handlers/course";
import TeacherHandler from "./handlers/teacher";
import { ICourseRepository, ITeacherRepository } from "./repositories";
import CourseRepository from "./repositories/course";
import TeacherRepository from "./repositories/teacher";

const app = express();
const client = new PrismaClient();

const courseRepo: ICourseRepository = new CourseRepository(client);

const courseHandler: ICourseHandler = new CourseHandler(courseRepo);

const teacherRepo: ITeacherRepository = new TeacherRepository(client);

const teacherHandler: ITeacherHandler = new TeacherHandler(teacherRepo);

app.use(express.json());

const courseRouter = express.Router();

app.use("/course", courseRouter);

courseRouter.patch("/:id", courseHandler.updateById);

courseRouter.delete("/:id", courseHandler.deleteById);

courseRouter.get("/", courseHandler.getAll);

const teacherRouter = express.Router();

app.use("/teacher", teacherRouter);

teacherRouter.post("/register", teacherHandler.register);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
