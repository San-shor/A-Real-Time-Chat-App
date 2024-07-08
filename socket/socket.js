const io = require('socket.io')(7000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let activeUsers = [];
const addUser = (userId, socketId, userInfo) => {
  const checkUser = activeUsers.some((u) => u.userId === userId);
  if (!checkUser) {
    activeUsers.push({ userId, socketId, userInfo });
  }
};

const findUser = (userId) => {
  return activeUsers.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
  });
  socket.on('addActiveUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);

    io.emit('getActiveUser', activeUsers);
  });

  socket.on('sendMessage', (message) => {
    console.log(message);
    io.to(message.receiverId).emit('receiveMessage', message);
  });

  socket.on('typing-msg', (data) => {
    io.to(data.receiverId).emit('receiveTypingMsg', data);
  });

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit('activeUsers', activeUsers);
  });
});
