import Comment from "../models/Comment";

const create = async (req: any, res: any) => {
  const { body, authorId } = req.body;
  try {
    const newComment = new Comment({ body, authorId });
    await newComment.save();
    res.status(201).json({
      newComment,
      message: "Comment created successfully",
    });
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

const readByVideo = async (req: any, res: any) => {
  const { videoId } = req.params;
  try {
    const comments = await Comment.find({ videoId });
    res.status(200).json({
      comments,
      message: "Comments found successfully",
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  create,
  readByVideo,
  deleteById,
};
