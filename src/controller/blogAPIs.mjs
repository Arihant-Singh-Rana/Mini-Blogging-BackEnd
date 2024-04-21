import BlogModel from "../modle/blogmodle.mjs";
import AuthorModle from "../modle/authormodle.mjs";

async function createBlog(req, res) {
  try {
    const exists = await AuthorModle.findOne({_id : req.body.authorId})
    if (!exists) {
      return res.status(404).send({
        status: "Failed",
        Message:
          "Author not found ! Please enter a valid registered author ID.",
      });
    }
    const created = await BlogModel.create(req.body);

    return res.status(201).send({ status: "Success", message: created });
  } catch (error) {
    return res.status(404).send({ status: "Failed", message: error.message });
  }
}

async function getAllBlogs(req, res) {
  try {
    const filters = Object.keys(req.body).map((k) => ({ [k]: req.body[k] }));
    if (req.body.tags) {
      filters.push({ tags: { $in: req.body.tags } });
    }
    if (req.body.subcategory) {
      filters.push({ subcategory: { $in: req.body.subcategory } });
    }
    const query =
      filters.length === 0
        ? { isDeleted: false, isPublished: true }
        : {
            $and: [{ isDeleted: false, isPublished: true }, { $or: filters }],
          };

    const data = await BlogModel.find(query);
    if (data.length == 0) {
      return res
        .status(404)
        .send({ status: "Failed", message: "No Blogs Found!" });
    }
    return res.status(200).send({ status: "Success", message: data });
  } catch (error) {
    return res.status(404).send({ status: "Failed", message: error.message });
  }
}

async function updateBlogs(req, res) {
  try {
    let b = req.body;
    let id = req.params.id;
    if (!b.tags || !b.subcategory) {
      return res.status(400).send({
        status: "Failed",
        message: "tags and subcategory can't be empty",
      });
    }
    let updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        $set: {
          title: b.title,
          body: b.body,
          category: b.category,
          isPublished: true,
          publishedAt: Date.now()
        },
        $addToSet: { tags : b.tags , subcategory:  b.subcategory  },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({
        status: "Failed",
        message: "Blog does not exist or has been deleted.",
      });
    }
    return res.status(200).send({ status: "Success", message: updatedBlog });
  } catch (error) {
    return res.status(404).send({ status: "Failed", message: error.message });
  }
}

async function deleteBlog(req, res) {
  try {
    let id = req.params.id;
    let deleteBlogRequest = await BlogModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: Date.now() } }
    );
    if (!deleteBlogRequest) {
      return res.status(404).send({
        status: "Failed",
        message:
          "Blog not found either because it was already deleted or not created in the first place!",
      });
    } else {
      return res.status(200).send({
        status: "Blog deleted successfully",
        message: deleteBlogRequest,
      });
    }
  } catch (error) {
    return res.status(404).send({ status: "Failed", message: error.message });
  }
}
async function bulkDeleteBlogs(req, res) {
  try {
    let b = req.body;
    let updatedBlog = await BlogModel.updateMany(
      {...b},
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({
        status: "Failed",
        message: "Blog does not exist or has already been deleted.",
      });
    }
    return res.status(200).send({ status: "Success", message: updatedBlog });
  } catch (error) {
    return res.status(404).send({ status: "Failed", message: error.message });
  }
}


export { createBlog, getAllBlogs, updateBlogs, deleteBlog, bulkDeleteBlogs };
