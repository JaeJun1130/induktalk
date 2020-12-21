import { User } from "../../../sequelize";

export default {
    Query: {
        me: async () => {
            const data = await User.findAll({ raw: true });
            const notRaw = await User.findAll();
            console.log(data);
            console.log(notRaw);
            return await User.findAll({ raw: true }); //raw json 값만 가져온다
        },
    },
};
