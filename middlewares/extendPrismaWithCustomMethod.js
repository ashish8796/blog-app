import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret, prisma } from "../server.config.js";

const extendedPrisma = prisma.$extends({
  model: {
    user: {
      async createUser(userData) {
        userData.password = await bcrypt.hash(userData.password, 10);
        return this.create({ data: userData });
      },
      async verifyPassword(user, password) {
        return bcrypt.compare(password, user.password);
      },
      generateToken(user) {
        const payload = { email: user.email, userId: user.id };
        return jwt.sign(payload, jwtSecret);
      },
      async updateUserWithNewPassword(user, userId) {
        user.password = await bcrypt.hash(user.password, 10);
        return this.update({ where: { id: userId }, data: user });
      },
    },
  },
});

export { extendedPrisma as prisma };
