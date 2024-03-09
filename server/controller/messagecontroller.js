import messageModel from "../model/userMessage.js";

export const addMsg = async (req, res, next) => {
  // console.log(req.url);
  try {
    const { from, to, msg } = req.body;
    const data = await messageModel.create({
      message: {
        text: msg,
      },
      users: [from, to],
      sender: from,
    });
    if (data) {
      res.json({ msg: "Message added successfully" });
    } else {
      res.json({ msg: "failed to add message in database" });
    }
  } catch (err) {
    next(err);
  }
};

export const getAllmsg = async (req, res, next) => {
  // console.log(req.url);
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectmessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectmessage);
  } catch (err) {
    next(err);
  }
};
