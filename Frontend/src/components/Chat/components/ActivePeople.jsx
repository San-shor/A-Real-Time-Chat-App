import { Avatar, Stack, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#389900',
    color: '#389900',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',

      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

// eslint-disable-next-line react/prop-types
const ActivePeople = ({ activeUser }) => {
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      {activeUser && activeUser.length > 0
        ? activeUser.map((user) => (
            <StyledBadge
              key={user.id} // Assuming each user has a unique 'id' property
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'>
              <Avatar
                src={`http://localhost:5000/${user?.userInfo?.image}`}
                alt={user?.userInfo?.name}
              />
            </StyledBadge>
          ))
        : null}
    </Stack>
  );
};

export default ActivePeople;
