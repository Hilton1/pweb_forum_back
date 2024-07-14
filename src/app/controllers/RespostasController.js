import RespostasRepository from '../repositories/RespostasRepository.js';
import PerguntasRepository from '../repositories/PerguntasRepository.js';
import UsersController from './UsersController.js';

class RespostasController {
  async index(req, res) {
    const respostas = await RespostasRepository.findAll();
    return res.json(respostas);
  }

  async show(req, res) {
    const { id } = req.params;
    const resposta = await RespostasRepository.findById(id);

    if (!resposta) {
      return res.status(404).json({ error: 'Resposta not found' });
    }

    return res.json(resposta);
  }

  async store(req, res) {
    const { perguntaId } = req.params;
    const { conteudo, userId } = req.body;

    if (!conteudo || !perguntaId || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await UsersController.getUserById(userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid user' });
    }

    const pergunta = await PerguntasRepository.findById(perguntaId);
    if (!pergunta) {
      return res.status(400).json({ error: 'Invalid pergunta' });
    }

    try {
      const resposta = await RespostasRepository.create({ conteudo, perguntaId, userId });
      return res.json(resposta);
    } catch (error) {
      console.error('Error storing resposta:', error);
      return res.status(500).json({ error: 'Error storing resposta' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { conteudo } = req.body;

    if (!conteudo) {
      return res.status(400).json({ error: 'Conteudo is required' });
    }

    const resposta = await RespostasRepository.findById(id);

    if (!resposta) {
      return res.status(404).json({ error: 'Resposta not found' });
    }

    const updatedResposta = await RespostasRepository.update(id, { conteudo });
    return res.json(updatedResposta);
  }

  async delete(req, res) {
    const { id } = req.params;

    const resposta = await RespostasRepository.findById(id);

    if (!resposta) {
      return res.status(404).json({ error: 'Resposta not found' });
    }

    await RespostasRepository.delete(id);
    return res.status(204).send();
  }
}

export default new RespostasController();
