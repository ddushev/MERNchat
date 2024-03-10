
export const sendMessage = (req, res) => {
  res.status(200).json({
    message: `success ${req.params.id}`
  })
}