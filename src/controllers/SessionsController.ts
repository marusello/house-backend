import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default {
  async login(request: Request, response: Response) {
      try {
        const { email, senha } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({ email, senha });
                
        return response.json({ user, token });

      } catch (err) {
        return response.status(400).json({ message: err.message });
      }
  }
}