import { PrismaClient } from "@prisma/client";
import { ITeacherRepository } from ".";
import { ICreateTeacherDto, ITeacherDto } from "../dto/teacher.dto";

export default class TeacherRepository implements ITeacherRepository {
  constructor(private prisma: PrismaClient) {}

  public async create(teacher: ICreateTeacherDto): Promise<ITeacherDto> {
    const result = await this.prisma.teacher.create({
      data: teacher,
      select: {
        id: true,
        name: true,
        username: true,
        createdAt: true,
      },
    });

    return result;
  }
}
