import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, senha }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Email/Senha incorreto');
    }

    const passwordMatched = await compare(senha, user.senha);

    if (!passwordMatched) {
      throw new Error('Email/Senha incorreto');
    }

    const { secret, expiresIn } = authConfig.jwt;
    
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { 
      user,
      token,
    }
  }
}

export default AuthenticateUserService;