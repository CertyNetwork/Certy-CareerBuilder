import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

export const CustomLink = styled(Link)(({ theme }: any) => ({
  textDecoration: 'none',
  color: theme.palette.text.title,
  '&:hover': {
    color: '#2A85FF',
  },
}));
