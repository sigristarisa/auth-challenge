const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log("retrieve username: ", payload.username);

  const user = await prisma.user.findFirst({
    where: {
      username: payload.username,
    },
  });

  const movies = await prisma.movie.findMany({
    where: {
      users: {
        id: user.id,
      },
    },
  });

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
    },
  });

  res.json({ data: createdMovie });
};

module.exports = {
  getAllMovies,
  createMovie,
};
