import React from 'react';

import Column from './Column';
import ColumnHeader from './ColumnHeader';
import WriteNote from './WriteNote';
import Note from './Note';

type Props = {
  columns: Array<{
    id: number;
    title: string;
    titleBackground: string;
  }>;
  notes: {
    [columnId: number]: Array<{
      noteId: number;
      columnId: number;
      text: string;
      name: string;
      rate: number;
      funs: Array<string>;
      realUserName: string;
      color: string;
    }>;
  };
  addNote: (id: number, value: string, isAnonymous: boolean, rate: number) => void;
  deleteNote: (noteId: number, columnId: number) => void;
  updateNote: (noteId: number, columnId: number) => void;
  moveNote: (noteId: number, destColumnId: number, currentColumnId: number) => void;
  location: { search: string };
  name: string;
} & typeof defaultProps;

const defaultProps = {
  columns: [{ id: 0, title: 'default', titleBackground: 'has-background-danger' }],
  notes: {}, // !Check this default prop
  //? addEntry
};

const Board: React.FunctionComponent<Props> = ({ columns, notes, addNote, deleteNote, updateNote, moveNote, name }) => {
  return notes && !!Object.entries(notes).length ? (
    <div className="board">
      <div className="container is-fluid">
        <div className="columns">
          {columns.map((column, key) => (
            <Column key={key} id={column.id}>
              <ColumnHeader {...column} notesCount={notes[column.id] && notes[column.id].length} />
              <WriteNote addNote={(value, isAnonymous, rate) => addNote(column.id, value, isAnonymous, rate)} />
              {notes[column.id].map((note, key) => (
                <div key={key} className="note-card">
                  <Note
                    key={key}
                    noteId={note.noteId}
                    columnId={note.columnId}
                    text={note.text}
                    deleteNote={deleteNote}
                    updateNote={updateNote}
                    moveNote={moveNote}
                    userName={note.name}
                    rate={note.rate}
                    removeStatus={name ? name.toLowerCase() === note.realUserName.toLowerCase() : false}
                    isFun={note.funs.includes(name)}
                    userColor={note.color}
                  />
                </div>
              ))}
            </Column>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

Board.defaultProps = defaultProps;

export default Board;
