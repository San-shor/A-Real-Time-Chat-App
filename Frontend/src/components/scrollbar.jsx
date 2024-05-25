import { Box } from '@mui/material';

const Scrollbar = ({ children, sx, ...other }) => {
  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (mobile) {
    return (
      <Box sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)',
        ...sx,
      }}
      {...other}>
      {children}
    </Box>
  );
};

export default Scrollbar;
