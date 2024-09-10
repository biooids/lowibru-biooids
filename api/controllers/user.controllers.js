export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "user have been signout successfully" });
  } catch (error) {
    next(error);
  }
};
