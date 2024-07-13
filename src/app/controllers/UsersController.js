import { createClerkClient } from '@clerk/clerk-sdk-node';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

class UsersController {
  async index(req, res) {
    try {
      const { data: userList, totalCount } = await clerkClient.users.getUserList();
      res.json({ users: userList, totalCount });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  async show(req, res) {
    const userId = req.params.id;
    try {
      const user = await clerkClient.users.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async getUserById(userId) {
    try {
      const user = await clerkClient.users.getUser(userId);
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  }

}

export default new UsersController();
