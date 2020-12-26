import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOption = {
    //토큰을 입력받아서 정보를 해석
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에서 토큰을 가져옴
    secretOrKey: "abc1234abc",
};
//cllient 요청을 보내는값이 payload
const verifyUser = (jwt_payload, done) => {
    console.log(jwt_payload, "verifyUser");
    if (jwt_payload) {
        return done(null, jwt_payload);
    } else {
        return done(null, false);
    }
};

export const isAuth = (request) => {
    if (!request.user) {
        throw Error("허용되지 않은 유저 입니다");
    }
    return;
};

export const authenticateJwt = (req, res, next) => {
    return passport.authenticate("jwt", { session: false }, (error, user) => {
        console.log(user, "authenticateJwt");
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
};

passport.use(new Strategy(jwtOption, verifyUser));
passport.initialize();
