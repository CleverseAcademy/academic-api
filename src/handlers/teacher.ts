import { RequestHandler } from "express";
import { Empty, ITeacherHandler } from ".";
import { ICreateTeacherDto, ITeacherDto } from "../dto/teacher.dto";
import { ITeacherRepository } from "../repositories";
import { hashPassword } from "../utils/bcrypt";

export default class TeacherHandler implements ITeacherHandler {
  private repo: ITeacherRepository;

  constructor(repo: ITeacherRepository) {
    this.repo = repo;
  }

  public register: RequestHandler<Empty, ITeacherDto, ICreateTeacherDto> =
    async (req, res) => {
      const { name, username, password } = req.body;
      const teacherInfoWithoutPassword = await this.repo.create({
        name,
        username,
        password: hashPassword(password),
      });

      return res.status(201).json(teacherInfoWithoutPassword).end();
    };
}
