const messageModel = require("../models/messageModel");
module.exports.addMessages = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (err) {
        next(err);
    }
};
module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });
        res.json(projectedMessages);
    } catch (err) {
        next(err);
    }
};


