import express from 'express'
import {get, merge} from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const isAuthenticated =  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['Azoz-Auth']

        if (!sessionToken){
            res.status(403).json({
                status: 403,
                message: "there is no sessionToken",
            });
            return;
        }
        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser){
            res.status(403).json({
                status: 403,
                message: "No exiting user"
            })
        }
        merge(req, {identity: existingUser})



    }catch(error){
        console.log(error);
        res.status(400).json({
          status: 400,
          message: "error authentication",
        });
        return;
    }
}