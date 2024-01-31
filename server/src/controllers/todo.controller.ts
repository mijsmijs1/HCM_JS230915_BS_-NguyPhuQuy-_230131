import { Request, Response } from "express";
import { todoModel } from "../models/todo.model";

export const todoController = {
    create: async (req: Request, res: Response) => {
        try {
            let { data, status, err } = await todoModel.create(req.body)
            if (status) {
                return res.status(200).json({
                    data,
                    message: "Create user success!"
                })
            }
            if(err.meta.target == 'user_name_key'){
                throw {
                    message:"Tên todo đã tồn tại!"
                }
                
            }
        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Server ERROR!"
            })
        }
    },
    findAll: async (req: Request, res: Response) => {
        try {
            let { data, status } = await todoModel.findAll()
            if (status) {
                return res.status(200).json({
                    data,
                    message: "Find all user success!"
                })
            }
            throw {
                message: "Find all user failed!"
            }
        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Server ERROR!"
            })
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            let { data, status } = await todoModel.update(Number(req.params.id), req.body)
            if (status) {
                return res.status(200).json({
                    data,
                    message: "Update user success!"
                })
            }
            throw {
                message: "Update user failed!"
            }
        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Server ERROR!"
            })
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            let { status } = await todoModel.delete(Number(req.params.id))
            if (status) {
                return res.status(200).json({
                    message: "Delete user success!"
                })
            }
            throw {
                message: "Delete user failed!"
            }
        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Server ERROR!"
            })
        }
    }
}