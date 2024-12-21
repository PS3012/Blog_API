const handleUserLogout = async (req, res) => {
  return res.status(200).json({
    error: false,
    message: "User logged out successfully.",
  });
};

export default handleUserLogout;
