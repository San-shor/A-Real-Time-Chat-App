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

const findFriend = (id) => {
  return users.find((user) => user.userId === id);
};

io.on('connection', (socket) => {
  console.log('socket is connecting');

  socket.on('addUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    io.emit('getUser', users);
  });

  socket.on('sendMessage', (data) => {
    const user = findFriend(data.receiverId);
    console.log(user);

    if (user !== undefined) {
      socket.to(user.socketId).emit('getMessage', {
        senderId: data.senderId,
        senderName: data.senderName,
        receiverId: data.receiverId,
        createAt: data.time,
        message: {
          text: data.message.text,
          image: URL.createObjectURL(
            new Blob([new Uint8Array(data.message.image)], {
              type: 'image/png',
            })
          ),
        },
      });
    } else {
      console.log('User not found for receiverId:', data.receiverId);
    }
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUser', users);
  });
});
