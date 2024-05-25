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

const ActivePeople = () => {
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'>
        <Avatar src='https://modernize-nextjs.adminmart.com/images/profile/user-10.jpg' />
      </StyledBadge>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'>
        <Avatar src='https://modernize-nextjs.adminmart.com/images/profile/user-1.jpg' />
      </StyledBadge>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'>
        <Avatar src='https://modernize-nextjs.adminmart.com/images/profile/user-5.jpg' />
      </StyledBadge>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'>
        <Avatar src='https://modernize-nextjs.adminmart.com/images/profile/user-3.jpg' />
      </StyledBadge>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'>
        <Avatar src='https://modernize-nextjs.adminmart.com/images/profile/user-4.jpg' />
      </StyledBadge>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'>
        <Avatar src='https://modernize-nextjs.adminmart.com/images/profile/user-8.jpg' />
      </StyledBadge>
    </Stack>
  );
};

export default ActivePeople;
