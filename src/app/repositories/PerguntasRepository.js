import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PerguntasRepository {
  async findAll() {
    return prisma.pergunta.findMany({
      include: {
        categoria: true,
        respostas: true,
      },
    });
  }

  async findById(id) {
    return prisma.pergunta.findUnique({
      where: { id },
      include: {
        categoria: true,
        respostas: true,
      },
    });
  }

  async create(data) {
    return prisma.pergunta.create({
      data,
      include: {
        categoria: true,
        respostas: true,
      },
    });
  }

  async update(id, data) {
    return prisma.pergunta.update({
      where: { id },
      data,
      include: {
        categoria: true,
        respostas: true,
      },
    });
  }

  async delete(id) {
    return prisma.pergunta.delete({
      where: { id },
    });
  }
}

export default new PerguntasRepository();
