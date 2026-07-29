import jwt from 'jsonwebtoken';

export interface JwtPayload {
    sub: number;
    iat: number;
    exp: number;
}

export function generateJwtToken(id: number): string {

    const claims = {
        sub: id
    };

    const secret = process.env.JWT_SECRET ?? 'default_secret';

    const token = jwt.sign(claims, secret, {algorithm: 'HS256', expiresIn: '16d'});

    return token;
}