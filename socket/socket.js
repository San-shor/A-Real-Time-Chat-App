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
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (userId) => {
    socket.join(userId);
    // console.log(`User with ID ${userId} joined their room`);
  });
  socket.on('addActiveUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    console.log(activeUsers);
    io.emit('getActiveUser', activeUsers);
  });

  socket.on('sendMessage', (message) => {
    io.to(message.receiverId).emit('receiveMessage', message); // Broadcast message to all connected clients
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      activeUsers = activeUsers.filter((user) => user !== socket.userId);
      io.emit('activeUsers', activeUsers); // Broadcast updated active users list to all clients
    }
  });
});
