import Book from "../models/bookModel.js";
import Library from "../models/libraryModel.js";

export const createLibrary = async (req, res) => {
  const { name } = req.body;

  try {
    const library = await Library.create({
      name,
      status: "active",
    });
    if (!library) {
      return res.status(500).json("error creating library");
    }

    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLibraries = async (req, res) => {
  try {
    const libraries = await Library.findAll({
      order: [["createdAt", "DESC"]],
      include: Book,
    });
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ message: "ERROR FETCHING LIBRAIRIES" });
  }
};

export const getLibrary = async (req, res) => {
  const { id } = req.params;

  try {
    const library = await Library.findByPk(id);
    if (library) {
      return res.status(200).json(library);
    }
    return res.status(404).json({ error: "no such library" });
  } catch (error) {
    res.status(500).json({ message: "ERROR FETCHING library" });
  }
};

export const updateLibrary = async (req, res) => {
  const { id, name } = req.body;

  try {
    const library = await Library.findOne({ where: { id: id } });
    if (!library) {
      res.status(404).json({ error: "Library Not Found!" });
    }
    const updated = await library.update(
      { name: name },
    );
    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLibrary = async (req, res) => {
  const { id } = req.query;
  try {
    const library = await Library.findByPk(id);
    if (!library) {
      res.status(404).json("Library Not Found");
    }
    await library.destroy();
    res.status(200).json("Library deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateLibraryStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const library = await Library.findByPk(id);
    if (!library) {
      res.status(404).json({ message: "Library Not Found" });
    }
    library.status = status;
    await library.save();
    res.status(200).json("updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating a Library status" });
  }
};
