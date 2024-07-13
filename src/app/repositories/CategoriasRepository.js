// src/app/repositories/CategoriasRepository.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoriasRepository {
  async findAll() {
    return prisma.categoria.findMany();
  }

  async findById(id) {
    return prisma.categoria.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return prisma.categoria.create({
      data,
    });
  }

  async update(id, data) {
    return prisma.categoria.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return prisma.categoria.delete({
      where: { id },
    });
  }
}

export default new CategoriasRepository();
