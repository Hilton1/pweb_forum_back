import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RespostasRepository {
  async findAll() {
    return prisma.resposta.findMany({
      include: {
        pergunta: true,
      },
    });
  }

  async findById(id) {
    return prisma.resposta.findUnique({
      where: { id },
      include: {
        pergunta: true,
      },
    });
  }

  async create(data) {
    return prisma.resposta.create({
      data,
      include: {
        pergunta: true,
      },
    });
  }

  async update(id, data) {
    return prisma.resposta.update({
      where: { id },
      data,
      include: {
        pergunta: true,
      },
    });
  }

  async delete(id) {
    return prisma.resposta.delete({
      where: { id },
    });
  }
}

export default new RespostasRepository();
