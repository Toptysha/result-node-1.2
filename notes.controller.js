const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function editNote(id, title) {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  const updatedNotes = JSON.parse(notes).map((note) => {
    if (note.id === id) {
      return {
        ...note,
        title,
      };
    }
    return note;
  });

  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
}

async function removeNote(id) {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  const updatedNotes = JSON.parse(notes).filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
}

module.exports = {
  addNote,
  getNotes,
  editNote,
  removeNote,
};
