import Modle from "../modle/authormodle.mjs";

function validity(val) {
  if (val === null || val === undefined) return false;
  if (typeof val === "string" && val.trim().length == 0) return false;
  return true;
}

function checktitle(val) {
  if (["Mrs", "Mr", "Miss", "Master"].indexOf(val) === -1) return false;
  return true;
}

async function createAuthor(req, res) {
  try {
    let arr = Object.keys(req.body);
    for (let i of arr) {
      if (!validity(req.body[i])){
        return res
          .status(400)
          .send({ status: false, message: `Please enter a valid ${i}!` });
      }
    }

    if (!checktitle(req.body.title))
      return res.status(400).send({
        status: false,
        message: `The title should contains either one of the following : 1. Mr, 2. Mrs, 3. Miss, 4. Master`,
      });

     const existingAuthor = await Modle.findOne({ email: req.body.email });
     if (existingAuthor){
       return res
         .status(400)
         .send({
           status: false,
           message: `Author with this email already exists!`,
         });
        }

    const createdAuthor = await Modle.create(req.body);
    return res.status(201).send({ status: true, message: createdAuthor });
  } catch (error) {
    return res.status(500).send({ status: false, errorMessage: error.message });
  }
}

async function getAllAuthors(req, res) {
  const data = await Modle.find();
  if (data.length == 0)
    return res.status(404).send({ status: false, message: "No authors found" });
  return res.status(200).send({ status: true, message: data });
}

export { createAuthor, getAllAuthors };
