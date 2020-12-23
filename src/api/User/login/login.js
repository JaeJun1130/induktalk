import crypto from "crypto";
import { User } from "../../../sequelize";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, args) => {
            const { studentId, password } = args;
            const hashPassword = crypto.createHash("sha512").update(password).digest("base64");
            try {
                const userData = await User.findOne({ where: { studentId: studentId }, raw: true });
                if (userData.password === hashPassword) {
                    return jwt.sign({ id: userData.id }, "abc1234abc");
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
};
