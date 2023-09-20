import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response } from 'express';
// import cors from "cors";

const prisma = new PrismaClient();
const app: Application = express();
const port = process.env.PORT || 8000;

async function createUser() {

}

// const corsOptions = {
//   origin: 'https://localhost:5173',
//   methods: 'GET,POST,DELETE',           
//   optionsSuccessStatus: 204,  
// };

// app.use(cors(corsOptions));
app.use(express.json());

app.get('/api', async (req: Request, res: Response) => {
  let data;

  try {
    const allUsers = await prisma.user.findMany();
    data = allUsers
    console.log('All user: ', allUsers);
  } catch (err) {
    console.error('Some thing went wrong!!!', err);
  } finally {
    await prisma.$disconnect();
  }

  res.json(data);
});

app.post('/api', async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        class: req.body.class
      }
    })
    console.log('Created new User: ', newUser);

  } catch (err) {
    console.error('Something went wrong!!!');
  } finally {
    await prisma.$disconnect();
  }

  res.status(200).send("thanh cong")  
})

app.delete("/api", async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: {id: req.body.id}
    })
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
  } finally {
    await prisma.$disconnect();
  }
  // console.log(req.body);
  

  res.send("Hello, world!!!");
})

app.get('/', (req: Request, res: Response) => {
  res.send("Hello, world!!!");
})



app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});