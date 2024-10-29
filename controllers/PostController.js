import PostModel from "../models/Post.js";

export const getOne = (req, res) => {
  const postId = req.params.id;

  PostModel.findOneAndUpdate(
    { _id: postId },
    { $inc: { viewsCount: 1 } },
    { returnDocument: "after" }
  )
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: "Статья не найдена" });
      }
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Не удалось получить пост" });
    });
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate({ path: "user", select: ["fullName", "avatarUrl"] })
      .exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить посты",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      user: req.userId,
      imageUrl: req.body.imageUrl,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать пост",
    });
  }
};

export const remove = (req, res) => {
  const postId = req.params.id;

  PostModel.findOneAndDelete({ _id: postId })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Пост не найден",
        });
      }

      res.json({
        success: true,
      });
    })
    .catch((err) =>
      res.status(500).json({ message: "Не удалось удалить пост" })
    );
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить пост",
    });
  }
};
