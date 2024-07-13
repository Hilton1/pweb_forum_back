import PerguntasRepository from '../repositories/PerguntasRepository.js';
import CategoriasRepository from '../repositories/CategoriasRepository.js';
import UsersController from './UsersController.js';

class PerguntasController {
  async index(req, res) {
    const perguntas = await PerguntasRepository.findAll();
    return res.json(perguntas);
  }

  async show(req, res) {
    const { id } = req.params;
    const pergunta = await PerguntasRepository.findById(id);

    if (!pergunta) {
      return res.status(404).json({ error: 'Pergunta not found' });
    }

    return res.json(pergunta);
  }

  async store(req, res) {
    const { titulo, conteudo, categoriaId, userId } = req.body;

    if (!titulo || !conteudo || !categoriaId || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const user = await UsersController.getUserById(userId);
      if (!user) {
        return res.status(400).json({ error: 'Invalid user' });
      }

      const categoria = await CategoriasRepository.findById(categoriaId);
      if (!categoria) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      const pergunta = await PerguntasRepository.create({ titulo, conteudo, categoriaId, userId });
      return res.json(pergunta);
    } catch (error) {
      console.error('Error storing pergunta:', error);
      return res.status(500).json({ error: 'Error storing pergunta' });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { titulo, conteudo, categoriaId } = req.body;

    if (!titulo || !conteudo || !categoriaId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const pergunta = await PerguntasRepository.findById(id);

    if (!pergunta) {
      return res.status(404).json({ error: 'Pergunta not found' });
    }

    const categoria = await CategoriasRepository.findById(categoriaId);
    if (!categoria) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const updatedPergunta = await PerguntasRepository.update(id, { titulo, conteudo, categoriaId });
    return res.json(updatedPergunta);
  }

  async delete(req, res) {
    const { id } = req.params;

    const pergunta = await PerguntasRepository.findById(id);

    if (!pergunta) {
      return res.status(404).json({ error: 'Pergunta not found' });
    }

    await PerguntasRepository.delete(id);
    return res.status(204).send();
  }
}

export default new PerguntasController();
