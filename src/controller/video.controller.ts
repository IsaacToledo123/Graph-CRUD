import Video from "../models/Video";

const create = async (req: any, res: any) => {
  const { title, description } = req.body;
  try {
    const newVideo = new Video({ title, description });
    await newVideo.save();
    res.status(201).json({
      newVideo,
      message: "Video created successfully",
    });
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

const readAll = async (req: any, res: any) => {
  try {
    const videos = await Video.find();
    res.status(200).json({
      videos,
      message: "Videos found successfully",
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const readById = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    res.status(200).json({
      video,
      message: "Video found successfully",
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const readByUser = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const videos = await Video.find({ userId });
    res.status(200).json({
      videos,
      message: "Videos found successfully",
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const updateById = async (req: any, res: any) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedVideo = await Video.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.status(200).json({
      updatedVideo,
      message: "Video updated successfully",
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  create,
  readAll,
  readById,
  readByUser,
  updateById,
};
