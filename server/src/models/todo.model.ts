import { PrismaClient } from '@prisma/client';
import { createUser } from '../interfaces/createUser.interface';
import { updateUser } from '../interfaces/updateUser.interface';
const prisma = new PrismaClient();
export const todoModel = {
    create: async (data: createUser) => {
        try {
            let user = await prisma.user.create({
                data: {
                    ...data
                }
            })
            return {
                data: user,
                status: true,
                err: null
            }
        } catch (err: any) {
            console.log('err', err)
            return {
                err,
                status: false,
                data: null
            }
        }
    },
    findAll: async () => {
        try {
            let users = await prisma.user.findMany()
            return {
                data: users,
                status: true,
                err: null
            }
        } catch (err) {
            console.log('err', err)
            return {
                err,
                status: false,
                data: null
            }
        }
    },
    update: async (userId: number, data: updateUser) => {
        try {
            let user = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    ...data
                }
            })
            return {
                data: user,
                status: true,
                err: null
            }
        } catch (err) {
            console.log('err', err)
            return {
                err,
                status: false,
                data: null
            }
        }
    },
    delete: async (userId: number) => {
        try {
            await prisma.user.delete({
                where: {
                    id: userId
                }
            })
            return {
                status: true
            }
        } catch (err) {
            console.log('err', err)
            return {
                status: false
            }
        }
    },
}