import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './components/Board';
import Navbar from './components/Navbar';
import {
  END_POINT,
  INIT_PAGE,
  JOIN,
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  MOVE_NOTE,
  INIT_DATA,
  ADDED_NOTE,
  REMOVED_NOTE,
  MOVED_NOTE,
  UPDATED_NOTE,
  DECREMENT,
  INCREMENT,
} from './constants';
import queryString from 'query-string';
import io from 'socket.io-client';
import Swal from 'sweetalert2';

const columns: Array<{
  id: number;
  title: string;
  titleBackground: string;
}> = [
  { id: 0, title: 'Stop Doing', titleBackground: 'has-background-danger' },
  { id: 1, title: 'Continue Doing', titleBackground: 'has-background-info' },
  { id: 2, title: 'Start Doing', titleBackground: 'has-background-success' },
];

interface NoteValue {
  noteId: number;
  columnId: number;
  text: string;
  name: string;
  rate: number;
  funs: Array<string>;
  realUserName: string;
  color: string;
}

const notes: {
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
} = {
  0: [],
  1: [],
  2: [],
};

interface LocationProps {
  location: { search: string };
}

let socket: SocketIOClient.Socket;
class App extends React.Component<LocationProps> {
  state = {
    notes,
    name: '',
    theme: 'light',
    room: [],
    users: [],
  };

  // Create new Note in a column
  addNote = (columnId: number, text: string, isAnonymous: boolean, rate: number) => {
    socket.emit(ADD_NOTE, columnId, text, isAnonymous, rate);
  };

  // Remove Note from a column
  deleteNote = (noteId: number, columnId: number) => {
    socket.emit(REMOVE_NOTE, noteId, columnId);
  };

  // update rate
  updateNote = (noteId: number, columnId: number) => {
    const { name, notes } = this.state;
    let columnNotes = [...notes[columnId]];
    let noteIndex = columnNotes.findIndex((item) => item.noteId === noteId);
    if (columnNotes[noteIndex].funs.indexOf(name) > -1) {
      socket.emit(UPDATE_NOTE, this.state.name, noteId, columnId, DECREMENT);
    }
    if (columnNotes[noteIndex].funs.indexOf(name) === -1) {
      socket.emit(UPDATE_NOTE, this.state.name, noteId, columnId, INCREMENT);
    }
  };

  // Move Note from column to column
  moveNote = (noteId: number, destColumnId: number, currentColumnId: number) => {
    socket.emit(MOVE_NOTE, noteId, destColumnId, currentColumnId);
  };

  // Rate note
  toggleTheme = () => {
    const theme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setState({ theme });
    document.body.setAttribute('data-theme', theme);
  };

  componentDidMount() {
    const { name, room, color } = queryString.parse(this.props.location.search);
    //
    document.body.setAttribute('data-theme', this.state.theme);

    socket = io(END_POINT);
    this.setState({ room: room, name: name });

    // check if exist
    socket.emit(JOIN, { name, room, color }, (error: string) => {
      if (error) {
        Swal.fire({
          title: 'Error!',
          text: `${name} ${error}`,
          icon: 'error',
          timer: 2000,
        }).then(() => window.location.assign(INIT_PAGE));
      }
    });

    /* sockets on connection  */
    socket.on(INIT_DATA, ({ users, allNotes }: any) => {
      this.setState({
        users: users,
        notes: allNotes,
      });
    });

    socket.on(ADDED_NOTE, (updatedNotes: NoteValue) => {
      this.setState({ notes: updatedNotes });
    });

    socket.on(REMOVED_NOTE, (removedNote: NoteValue) => {
      this.setState({ notes: removedNote });
    });

    socket.on(MOVED_NOTE, (movedNote: NoteValue) => {
      this.setState({ notes: movedNote });
    });

    socket.on(UPDATED_NOTE, (updatedNote: NoteValue) => {
      this.setState({ notes: updatedNote });
    });
  }

  render() {
    const { notes, users, name } = this.state;
    const { location } = this.props;
    return !users.length ? (
      <div className="container-loading">
        <button className="button is-loading button-loading is-large">Loading...</button>
      </div>
    ) : (
      <div className="main">
        <Navbar users={users} toggleTheme={this.toggleTheme} />
        <DndProvider backend={HTML5Backend}>
          <Board
            location={location}
            columns={columns}
            notes={notes}
            updateNote={this.updateNote}
            addNote={this.addNote}
            deleteNote={this.deleteNote}
            moveNote={this.moveNote}
            name={name}
          />
        </DndProvider>
      </div>
    );
  }
}

export default App;
