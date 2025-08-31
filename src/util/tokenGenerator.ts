import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string) => {
    const token = jwt.sign(
            { _id: id},
            process.env.ACCESS_JWT_SECRET!,
            {expiresIn: "15m"}
        );
    return token;
}

export const generateRefreshToken = (id: string) => {
    const token = jwt.sign(
            { _id: id},
            process.env.REFRESH_JWT_SECRET!,
            {expiresIn: "3d"}
        );
    return token;
}

export const generateRefreshAndAccessToken = (id:string) => {
    const accessToken = jwt.sign(
            { _id: id},
            process.env.ACCESS_JWT_SECRET!,
            {expiresIn: "15m"}
        );
    const refreshToken = jwt.sign(
            { _id: id},
            process.env.REFRESH_JWT_SECRET!,
            {expiresIn: "3d"}
        );
    return {accessToken,refreshToken};
}