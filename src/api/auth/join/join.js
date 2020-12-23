import { User } from "../../../sequelize";
import crypto from "crypto";

export default {
    Mutation: {
        join: async (_, args) => {
            const { studentId, password, firstName, lastName } = args;
            const hashPassword = crypto.createHash("sha512").update(password).digest("base64");
            const idCheck = await User.findOne({ where: { studentId: studentId }, raw: true });
            console.log(idCheck == null);
            if (idCheck == null) {
                return await User.create({ studentId, password: hashPassword, firstName, lastName });
            } else {
                console.log("이미 있는 아이디 입니다");
            }
        },
    },
};
