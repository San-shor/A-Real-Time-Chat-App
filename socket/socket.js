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
    // console.log(`User with ID ${userId} joined their room`);
  });
  socket.on('addActiveUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);

    io.emit('getActiveUser', activeUsers);
  });

  socket.on('sendMessage', (message) => {
    const user = findUser(message.receiverId);
    console.log('Message to send:', message);
    console.log('Receiver user:', user);
    if (user) {
      io.to(user.socketId).emit('receiveMessage', message);
    }
  });

  socket.on('typing-msg', (data) => {
    io.to(data.receiverId).emit('receiveTypingMsg', data);
  });

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit('activeUsers', activeUsers);
  });
});
