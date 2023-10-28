import { Course, PrismaClient } from "@prisma/client";
import express, { Request } from "express";

const client = new PrismaClient();
const app = express();

app.use(express.json());

interface ICreateCourseDto
  extends Omit<{ [k in keyof Course]: string }, "id" | "duration"> {
  duration: number;
}

// type Course = {
//   name: string;
//   description: string;
//   start_time: string;
//   duration: number;
// }

app.post(
  "/course",
  async (req: Request<{}, unknown, ICreateCourseDto>, res) => {
    console.log(req.body);

    const result = await client.course.create({
      data: req.body,
    });

    return res.status(201).json(result);
  }
);

app.get("/course", async (req, res) => {
  const result = await client.course.findMany();

  return res.status(200).json(result);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// const main = async () => {
//   await client.teacher.createMany({
//     data: [
//       {
//         name: "Titanium",
//       },
//       {
//         name: "Men",
//       },
//       {
//         name: "A",
//       },
//     ],
//   });
// };

// main().then(async () => {
//   const teachers = await client.teacher.findMany({
//     select: {
//       id: true,
//       name: true,
//     },
//     where: {
//       name: {
//         endsWith: "%n",
//         // LIKE '%%n'
//       },
//     },
//   });

//   console.log(teachers);
// });
