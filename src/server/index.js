const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

/* import action handlers */
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const { addNote, removeNote, getAllnotes, moveNote, updateNoteRate } = require('./notes');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

// on init call
io.on('connect', (socket) => {
  socket.on('join', ({ name, room, color }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, color });
    if (error) return callback(error);
    socket.join(user.room);

    io.to(user.room).emit('initData', {
      room: user.room,
      users: getUsersInRoom(user.room),
      allNotes: getAllnotes(),
    });

    callback();
  });

  // noteid
  socket.on('addNote', (columnId, text, isAnonymous, rate) => {
    const user = getUser(socket.id);
    // check if isAnonymous
    const userName = isAnonymous ? 'Mister X' : user.name;
    if (user) {
      io.to(user.room).emit('addedNote', addNote(columnId, userName, text, isAnonymous, rate, user.name, user.color));
    }
  });

  socket.on('removeNote', (noteId, columnId) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('removedNote', removeNote(noteId, columnId));
    }
  });

  socket.on('moveNote', (noteId, destColumnId, currentColumnId) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('movedNote', moveNote(noteId, destColumnId, currentColumnId));
  });

  socket.on('updateNote', (userName, noteId, columnId, action) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('updatedNote', updateNoteRate(noteId, columnId, userName, action));
    }
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('initData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
