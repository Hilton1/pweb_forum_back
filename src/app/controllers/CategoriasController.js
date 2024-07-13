import CategoriasRepository from '../repositories/CategoriasRepository.js';

class CategoriasController {
  async index(req, res) {
    const categories = await CategoriasRepository.findAll();
    return res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;
    const category = await CategoriasRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(category);
  }

  async store(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriasRepository.create({ nome });
    return res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriasRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await CategoriasRepository.update(id, { nome });
    return res.json(updatedCategory);
  }

  async delete(req, res) {
    const { id } = req.params;

    const category = await CategoriasRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await CategoriasRepository.delete(id);
    return res.status(204).send();
  }
}

export default new CategoriasController();
