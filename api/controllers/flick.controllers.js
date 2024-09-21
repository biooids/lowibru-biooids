import Flick from "../models/flick.model.js";

export const createFlick = async (req, res, next) => {
  console.log("data from body", req.body);

  const { videoUrl } = req.body;
  if (!videoUrl) {
    next(errorHandler(400, "Please provide all required fields"));
    return;
  }
  try {
    const newFlick = new Flick({
      ...req.body,
      userId: req.user.id,
    });

    const savedFlick = await newFlick.save();
    res.status(201).json({
      success: true,
      message: "flick created success full",
      flick: savedFlick,
    });
  } catch (error) {
    next(error);
  }
};

export const getFlicks = async (req, res, next) => {
  try {
    const filters = {
      ...(req.query.userId && { userId: req.query.userId }), // Filter by userId if provided
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const flicks = await Flick.find(filters)
      .populate({
        path: "userId",
        select: "userName profilePicture",
      })
      .sort({ createdAt: -1 });

    const totalFlicks = await Flick.countDocuments(filters);

    res.status(200).json({
      success: true,
      message: "all flicks found",
      totalFlicks,
      flicks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFlick = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      next(errorHandler(403, "You do not have permission to delete the flick"));
      return;
    }

    const deletedFlick = await Flick.findByIdAndDelete(req.params.flickId);
    res.status(200).json({
      success: true,
      message: "Flick has been deleted",
      deletedFlick,
    });
  } catch (error) {
    next(error);
  }
};
