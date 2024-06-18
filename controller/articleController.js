import { setResponseHeaders } from "../helper/headersHelper.js";
import Article from "../models/article.js";

export async function getArticles(req, res) {
  setResponseHeaders(res);
  try {
    const articles = await Article.find({}).lean(true);
    res.status(200).json(articles);
  } catch (error) {
    console.log("Error fetching articles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getArticleById(req, res) {
  setResponseHeaders(res);
  const { id } = req.params;

  try {
    const article = await Article.findById(id)
      .lean()
      .populate("comments")
      .exec();

    if (article === null) {
      res.status(404).json({ message: "Article not found." });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    console.log("Error fetching article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createArticle(req, res) {
  setResponseHeaders(res);
  const { body, user } = req;

  try {
    const article = await Article.create(body);
    console.log({ article });

    res.status(200).json(article);
  } catch (error) {
    console.log("Error creating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateArticle(req, res) {
  setResponseHeaders(res);
  const { body } = req;
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndUpdate(id, body, {
      new: true,
    }).lean(true);

    if (article === null) {
      res.status(404).json({ message: "Article not found." });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    console.log("Error updating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteArticle(req, res) {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log("Error deleting article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update newly created comment in the article
export async function addCommentOnArticle(res, articleId, newComment) {
  try {
    const article = await Article.findByIdAndUpdate(
      articleId,
      {
        $push: { comments: newComment?._id },
      },
      { new: true }
    ).lean();

    if (article === null) {
      res.status(404).json({ message: "Article not found." });
    }

    return true;
  } catch (error) {
    console.log("Error adding comment to article:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return false;
  }
}

// Delete comment from the article
export async function deleteCommentOnArticle(res, articleId, commentId) {
  try {
    const article = await Article.findByIdAndUpdate(articleId, {
      $pull: { comments: commentId },
    });
    if (article === null) {
      res.status(404).json({ message: "Article not found." });
    }
    return true;
  } catch (error) {
    console.log("Error deleting comment from article:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return false;
  }
}

// add like on the article
export async function addLikeOnArticle(res, articleId, likeId) {
  try {
    const article = await Article.findByIdAndUpdate(articleId, {
      $push: { likes: likeId },
    });
    if (article === null) {
      res.status(404).json({ message: "Article not found." });
    }
    return true;
  } catch (error) {
    console.log("Error adding like on article:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return false;
  }
}

// delete like on the article
export async function deleteLikeFromArticle(res, articleId, likeId) {
  try {
    const article = await Article.findByIdAndUpdate(articleId, {
      $pull: { likes: likeId },
    });
    if (article === null) {
      res.status(404).json({ message: "Article not found." });
    }
    return true;
  } catch (error) {
    console.log("Error deleting like from article:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return false;
  }
}
