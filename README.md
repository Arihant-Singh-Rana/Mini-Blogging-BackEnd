# Mini-Blogging-BackEnd

This is the backend component of the Mini-Blogging application. It provides APIs for managing authors and blogs stored in a MongoDB database.

## Folder Structure

```
Mini-Blogging-BackEnd/
│
├── controller/
│   ├── authorApis.mjs
│   └── blogAPIs.mjs
│
├── modle/
│   ├── authormodle.mjs
│   └── blogmodle.mjs
│
├── router/
│   └── APIrouter.mjs
│
├── .gitignore
├── package.json
└── server.mjs
```

- **controller/**: Contains modules for handling HTTP request logic.
  - **authorApis.mjs**: Module for handling author-related API endpoints.
  - **blogAPIs.mjs**: Module for handling blog-related API endpoints.

- **modle/**: Contains Mongoose models for defining MongoDB schemas.
  - **authormodle.mjs**: Defines the schema for the author collection.
  - **blogmodle.mjs**: Defines the schema for the blog collection.

- **router/**: Contains the API router module that maps HTTP requests to controller functions.
  - **APIrouter.mjs**: Defines routes for author and blog APIs.

- **.gitignore**: Specifies intentionally untracked files to ignore.

- **package.json**: Manifest file for Node.js projects, includes metadata and dependencies.

- **server.mjs**: Main server file responsible for starting the Express.js server and connecting to MongoDB.

## Code Explanation

### `authorApis.mjs`

```javascript
import Modle from "../modle/authormodle.mjs";

/**
 * Creates a new author in the database.
 */
async function createAuthor(req, res) {
  try {
    // Validation checks for request body
    // ...

    // Check if author with provided email already exists
    const existingAuthor = await Modle.findOne({ email: req.body.email });
    if (existingAuthor) {
      return res.status(400).send({
        status: false,
        message: "Author with this email already exists!",
      });
    }

    // Create new author
    const createdAuthor = await Modle.create(req.body);
    return res.status(201).send({ status: true, message: createdAuthor });
  } catch (error) {
    return res.status(500).send({ status: false, errorMessage: error.message });
  }
}

/**
 * Retrieves all authors from the database.
 */
async function getAllAuthors(req, res) {
  try {
    const data = await Modle.find();
    if (data.length == 0)
      return res.status(404).send({ status: false, message: "No authors found" });
    return res.status(200).send({ status: true, message: data });
  } catch (error) {
    return res.status(500).send({ status: false, errorMessage: error.message });
  }
}

export { createAuthor, getAllAuthors };
```

### `blogAPIs.mjs`

```javascript
import BlogModel from "../modle/blogmodle.mjs";
import AuthorModle from "../modle/authormodle.mjs";

/**
 * Creates a new blog post in the database.
 */
async function createBlog(req, res) {
  try {
    // Check if author with provided ID exists
    const exists = await AuthorModle.findOne({ _id: req.body.authorId });
    if (!exists) {
      return res.status(404).send({
        status: "Failed",
        Message:
          "Author not found! Please enter a valid registered author ID.",
      });
    }

    // Create new blog post
    const created = await BlogModel.create(req.body);

    return res.status(201).send({ status: "Success", message: created });
  } catch (error) {
    return res.status(404).send({ status: "Failed", message: error.message });
  }
}

/**
 * Retrieves all blog posts from the database.
 */
async function getAllBlogs(req, res) {
  try {
    // Construct query based on request parameters
    // ...

    // Execute query
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

export { createBlog, getAllBlogs };
```
