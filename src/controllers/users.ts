import express from 'express'

import {getUsers} from '../db/users'

export const getAllUsers = async (req: express.Request, res: express.Response) =>{
    try{
        const users = await getUsers();
        res.status(200).json(users)
        return
    }catch(error){
        console.log(error)
        res.status(400).json({
            status:400,
            message: "no usres, somthing wrong"
        })
        return;
    }
}