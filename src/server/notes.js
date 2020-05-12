let notes = { 0: [], 1: [], 2: [] };

let noteId = 0;
const addNote = (columnId, name, text, isAnonymous, rate, realUserName, color, funs = []) => {
  notes = {
    ...notes,
    [columnId]: [{ noteId, columnId, name, text, isAnonymous, rate, realUserName, color, funs }, ...notes[columnId]],
  };
  noteId++;
  return notes;
};

const removeNote = (noteId, columnId) => {
  let columnNotes = [...notes[columnId]];
  let noteIndex = columnNotes.findIndex((item) => item.noteId === noteId);
  columnNotes.splice(noteIndex, 1);
  notes = { ...notes, [columnId]: columnNotes };
  return notes;
};

const updateNoteRate = (noteId, columnId, funName, action) => {
  let columnNotes = [...notes[columnId]];
  let noteIndex = columnNotes.findIndex((item) => item.noteId === noteId);
  if (action === 'increment') {
    // increment likes
    columnNotes[noteIndex].rate += 1;
    // add funs
    columnNotes[noteIndex].funs.push(funName);
  }
  if (action === 'decrement') {
    // decrease likes
    columnNotes[noteIndex].rate -= 1;
    // remove fun from funs
    let filtered = columnNotes[noteIndex].funs.filter((fun) => fun !== funName);
    columnNotes[noteIndex].funs = filtered;
  }
  notes = { ...notes, [columnId]: columnNotes };
  return notes;
};

const moveNote = (noteId, destColumnId, currentColumnId) => {
  if (destColumnId !== currentColumnId) {
    let columnNotes = [...notes[currentColumnId]];
    let noteIndex = columnNotes.findIndex((item) => item.noteId === noteId);
    let dragNote = columnNotes.splice(noteIndex, 1)[0];
    dragNote['columnId'] = destColumnId;
    let destNotes = [...notes[destColumnId]];
    destNotes.push(dragNote);
    notes = { ...notes, [currentColumnId]: columnNotes, [destColumnId]: destNotes };
    return notes;
  }
};

const getAllnotes = () => notes;

module.exports = { addNote, removeNote, getAllnotes, moveNote, updateNoteRate };
