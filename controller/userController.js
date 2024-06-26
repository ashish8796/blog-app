import { setResponseHeaders } from "../helper/headersHelper.js";
import {
  handleRequest,
  handleRequestWithoutBody,
} from "../helper/requestHelper.js";
import { prisma } from "../middlewares/extendPrismaWithCustomMethod.js";

export async function getUsers(req, res) {
  handleRequest(req, res, async () => {
    return await prisma.user.findMany();
  });
}

export async function registerUser(req, res) {
  setResponseHeaders(res);
  try {
    const body = req?.body;
    const user = await prisma.user.createUser(body);
    res.status(201).json(user);
  } catch (error) {
    // handling idempotency for user
    if (error.code === "P2002") {
      res.status(400).json({ message: "user is already exists." });
    } else {
      console.log("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export async function login(req, res) {
  setResponseHeaders(res);
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !(await prisma.user.verifyPassword(user, password))) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      const token = await prisma.user.generateToken(user);
      res.status(200).json({ user, token });
    }
  } catch (error) {
    console.log("Error logging user: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUserById(req, res) {
  handleRequest(req, res, async (req) => {
    const { id } = req.params;

    return await prisma.user.findUnique({ where: { id } });
  });
}

export async function updateUserById(req, res) {
  handleRequest(req, res, async (req) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (
        body.password &&
        !(await prisma.user.verifyPassword(user, body.password))
      ) {
        return await prisma.user.updateUserWithNewPassword(body, id);
      } else {
        delete body.password;
        console.log({ body });
        return await prisma.user.update({
          where: {
            id,
          },
          data: body,
        });
      }
    } catch (error) {
      console.log("Error updating user: ", error);
      throw error;
    }
  });
}

export async function deleteUserById(req, res) {
  handleRequestWithoutBody(req, res, async () => {
    const { id } = req.params;
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  });
}
