import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

export default {
  async create(request: Request, response: Response) {
      const { nome, email, senha } = request.body;

      const usersRepository = getRepository(User);

      const checkUserExists = await usersRepository.findOne({
        where: { email },
      });

      if (checkUserExists) {
        throw new Error('Endereço de email já existe');
      }

      const hashedPassword = await hash(senha, 8);

      const user = usersRepository.create({
        nome,
        email,
        senha: hashedPassword,
      });

      await usersRepository.save(user);

      return response.status(201).json(user);
  }
}