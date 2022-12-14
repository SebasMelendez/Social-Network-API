const { Thought, User } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
      .then((dbRows) => res.json(dbRows))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((dbRows) => res.json(dbRows))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  addThought({ body }, res) {
    console.log(body)
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbRows) => {
        if (!dbRows) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbRows);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbRows) => {
        if (!dbRows) {
          res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbRows);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbRows) => res.json(dbRows))
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbRows) => {
        if (!dbRows) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbRows);
      })
      .catch((err) => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbRows) => {
        if (!dbRows) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbRows);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
