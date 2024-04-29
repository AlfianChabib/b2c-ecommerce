import { prisma } from '../app/database';

type IGetUser = {
  type: 'email' | 'id';
  email?: string;
  id?: number;
};

export class UserService {
  static async getUser(payload: IGetUser) {
    try {
    } catch (error) {}
  }
}

export const getUser = async (payload: IGetUser) => {
  if (payload.type === 'email') {
    const getByEmail = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    return getByEmail;
  } else if (payload.type === 'id') {
    const getById = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    return getById;
  }
};

export const getUserProfile = async (userId: number) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });
};
