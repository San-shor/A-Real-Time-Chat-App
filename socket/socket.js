const io = require('socket.io')(7000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let users = [];

const addUser = (userId, socketId, userInfo) => {
  const checkUser = users.some((u) => u.userId === userId);
  if (!checkUser) {
    users.push({ userId, socketId, userInfo });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

console.log(users);
io.on('connection', (socket) => {
  console.log('socket is connecting');
  socket.on('addUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    io.emit('getUser', users);
  });
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUser', users);
  });
});
