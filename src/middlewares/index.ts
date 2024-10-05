import express from 'express'
import {get, merge} from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const isAuthenticated =  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['Azoz-Auth']

        if (!sessionToken){
            res.status(403).json({
                status: 403,
                message: "Your no authenticated",
            });
            return;
        }
        const existingUser = await getUserBySessionToken(sessionToken)

        if(!existingUser){
            res.status(403).json({
                status: 403,
                message: "No exiting user Token"
            });
            return;
        }
        merge(req, {identity: existingUser})
        return next();
    }catch(error){
        console.log(error);
        res.status(400).json({
          status: 400,
          message: "error authentication",
        });
        return;
    }
}
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    if (!currentUserId) {
    res.sendStatus(403).json({
        status:403,
        message: "Error, there is no user",
    });
    return;
    }

    if (currentUserId.toString() != id) {
      res.sendStatus(403).json({
        status: 403,
        message: "Error, there is no user by this id",
      });
      return;
    }

    next();

  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({
        status: 400,
        message: "Something go wrong",
      });
      return;
  }
};