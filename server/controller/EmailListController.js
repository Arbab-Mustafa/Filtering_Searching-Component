import MasterEmailList from "../model/masterEmailListModel.js";

export const getAllEmailList = async (req, res) => {
  try {
    const masterEmailList = await MasterEmailList.find();

    if (!masterEmailList) {
      return res.status(404).json({ message: "No Email List " });
    }

    res.status(200).json(masterEmailList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createEmailList = async (req, res) => {
  try {
    const { name, email, city } = req.body;

    const masterEmailList = new MasterEmailList({
      name,
      email,
      city,
    });

    await masterEmailList.save();

    res.status(200).json(masterEmailList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
