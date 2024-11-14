import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#08426F',
        color: '#fff',
        padding: '20px 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          width:"100vh",
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        <Typography variant="h6" sx={{ mb: { xs: 2, sm: 0 } }}>
          SegurAI
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <LinkedInIcon />
        </Box>
      </Box>
    </Box>
  );
}
