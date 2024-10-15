import express from 'express'

import { getUsers, deleteUserById, getUserById } from "../db/users";
import { produceMessage } from "../kafka/producer";


export const getAllUsers = async (req: express.Request, res:express.Response) =>{
    try{
        const users = await getUsers();
        await produceMessage("user-topic", { event: "GET-USERS", users });
        res.status(200).json(users);
        return;
    } catch(error){
        console.log(error);
        res.sendStatus(400);
        return ;
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    await produceMessage("user-topic", { event: "User Deleted", deletedUser });
    res.json(deletedUser);
      return;

  } catch (error) {
    console.log(error);
     res.sendStatus(400).json({
        status: 400,
        message: "Error, You can not delete user",
      });
      return;
  }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
       res.sendStatus(400).json({
        status: 400,
        message: "Error, you can update user",
      });
      return;
    }
    const user = await getUserById(id);
    user.username = username;
    await user.save();
    await produceMessage("user-topic", { event: "User Updated", user });

    res.sendStatus(200).json(user).end();
    return;
     

  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({
      status: 400,
      message: "somthing go wrong in updating user",
    });
    return;
  }
};

