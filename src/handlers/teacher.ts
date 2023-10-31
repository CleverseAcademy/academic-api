import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import { Empty, ITeacherHandler } from ".";
import { JWT_SECRET } from "../const";
import {
  ICreateTeacherDto,
  ILoginDto,
  ILoginResultDto,
  ITeacherDto,
} from "../dto/teacher.dto";
import { ITeacherRepository } from "../repositories";
import { hashPassword, verifyPassword } from "../utils/bcrypt";

export default class TeacherHandler implements ITeacherHandler {
  private repo: ITeacherRepository;

  constructor(repo: ITeacherRepository) {
    this.repo = repo;
    if (typeof JWT_SECRET !== "string")
      throw new Error(`JWT_SECRET is undefined`);
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

  public login: RequestHandler<Empty, ILoginResultDto, ILoginDto> = async (
    req,
    res
  ) => {
    const { username, password } = req.body;
    try {
      const teacherInfo = await this.repo.findByUsername(username);

      if (!verifyPassword(password, teacherInfo.password))
        throw new Error("Unauthorized");

      const token = sign({ id: teacherInfo.id }, JWT_SECRET!, {
        algorithm: "HS512",
        expiresIn: "12h",
        issuer: "academic-api",
        subject: "teacher-credential",
      });

      return res.status(200).json({
        id: teacherInfo.id,
        username: teacherInfo.username,
        token,
      });
    } catch (error) {
      return res.status(401).json({ err: "Invalid username or password" });
    }
  };
}
