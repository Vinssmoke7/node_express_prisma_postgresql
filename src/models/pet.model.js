import { prisma } from '../config/db.js';

export const PetModel = {
  findAll: async () => {
    return await prisma.pet.findMany({
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        updatedBy: { select: { id: true, name: true, email: true } }
      }
    });
  },

  findById: async (id) => {
    return await prisma.pet.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        updatedBy: { select: { id: true, name: true, email: true } }
      }
    });
  },

  create: async (data) => {
    return await prisma.pet.create({
      data
    });
  },

  update: async (id, data) => {
    return await prisma.pet.update({
      where: { id },
      data
    });
  },

  delete: async (id) => {
    return await prisma.pet.delete({
      where: { id }
    });
  }
};