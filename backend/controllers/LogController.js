import Log from "../models/LogModel.js";


export const saveLog = async (req, res) => {
  const log = new Log(req.body);
  try {
      const insertedlog = await log.save();
      res.status(201).json(insertedlog);
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}