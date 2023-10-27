import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import environment from '../../environment';

export function signJwt<T extends object>(
  payload: T,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(payload, environment.privateKey as string, {
    ...(options && options),
    algorithm: 'RS256'
  });
}

export function verifyJwt(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, environment.publicKey as string, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  })
    .then((decoded) => {
      return {
        valid: true,
        expired: false,
        decoded
      };
    })
    .catch((e: JsonWebTokenError) => {
      return {
        valid: false,
        expired: e.message === 'jwt expired',
        decoded: null
      };
    });
}
