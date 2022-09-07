// components
import { useState } from 'react';

import GridViewIcon from '@mui/icons-material/GridView';
import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';

export default function OurProductsPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        size="small"
        startIcon={<GridViewIcon />}
        sx={{
          color: 'text.primary',
        }}
      >
        Our Products
      </Button>

      <Menu
        anchorEl={open}
        id="account-menu"
        open={Boolean(open)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: '500px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack sx={{ p: 1 }}>
          <MenuItem
            sx={{
              backgroundColor: '#2da7710d',
              whiteSpace: 'unset',
            }}
          >
            <a
              href="https://dev-cert.certy.network/categories"
              target="_blank"
              style={{
                textDecoration: 'none',
              }}
              rel="noreferrer"
            >
              <Box
                display="flex"
                sx={{
                  width: '100%',
                }}
              >
                <Box>
                  <svg
                    className="-mt-2"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_727_15891)">
                      <circle cx="36" cy="29" r="21" fill="white"></circle>
                      <circle
                        cx="36"
                        cy="29"
                        r="20"
                        stroke="#2DA771"
                        strokeWidth="2"
                      ></circle>
                    </g>
                    <path
                      d="M38.3885 26.2759C38.3405 25.7875 38.1271 25.4079 37.7482 25.137C37.3741 24.8617 36.8393 24.7241 36.1439 24.7241C35.6835 24.7241 35.2998 24.7796 34.9928 24.8906C34.6859 25.0016 34.4556 25.1548 34.3022 25.3501C34.1487 25.5411 34.0695 25.7609 34.0647 26.0095C34.0552 26.2138 34.0983 26.3936 34.1942 26.549C34.295 26.7044 34.4388 26.8421 34.6259 26.9619C34.8177 27.0774 35.048 27.1795 35.3165 27.2683C35.5851 27.3571 35.8873 27.4348 36.223 27.5014L37.4892 27.7678C38.2182 27.9144 38.8609 28.1097 39.4173 28.3539C39.9784 28.5982 40.4484 28.889 40.8273 29.2265C41.211 29.5639 41.5012 29.9524 41.6978 30.392C41.8945 30.8316 41.9952 31.3245 42 31.8706C41.9952 32.732 41.7602 33.4713 41.295 34.0885C40.8297 34.7057 40.1607 35.1786 39.2878 35.5071C38.4197 35.8357 37.3717 36 36.1439 36C34.9113 36 33.8369 35.8291 32.9209 35.4872C32.0048 35.1453 31.2926 34.6258 30.7842 33.9286C30.2758 33.2315 30.0144 32.3501 30 31.2845H33.4101C33.4388 31.7241 33.5659 32.0904 33.7914 32.3834C34.0168 32.6765 34.3261 32.8985 34.7194 33.0495C35.1175 33.2004 35.5779 33.2759 36.1007 33.2759C36.5803 33.2759 36.988 33.216 37.3237 33.0961C37.6643 32.9762 37.9257 32.8097 38.1079 32.5966C38.2902 32.3834 38.3837 32.1392 38.3885 31.8639C38.3837 31.6064 38.2974 31.3866 38.1295 31.2046C37.9616 31.0181 37.7026 30.8582 37.3525 30.725C37.0072 30.5874 36.5659 30.4608 36.0288 30.3454L34.4892 30.0124C33.2134 29.7415 32.2086 29.3042 31.4748 28.7003C30.741 28.092 30.3765 27.2705 30.3813 26.236C30.3765 25.3923 30.6211 24.653 31.1151 24.0181C31.6091 23.3831 32.2926 22.888 33.1655 22.5328C34.0384 22.1776 35.0336 22 36.1511 22C37.2926 22 38.283 22.1798 39.1223 22.5395C39.9664 22.8947 40.6211 23.3942 41.0863 24.0381C41.5516 24.6819 41.789 25.4278 41.7986 26.2759H38.3885Z"
                      fill="#2DA771"
                    ></path>
                    <defs>
                      <filter
                        id="filter0_d_727_15891"
                        x="0"
                        y="0"
                        width="72"
                        height="72"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset dy="7"></feOffset>
                        <feGaussianBlur stdDeviation="7.5"></feGaussianBlur>
                        <feComposite
                          in2="hardAlpha"
                          operator="out"
                        ></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.164706 0 0 0 0 0.521569 0 0 0 0 1 0 0 0 0.1 0"
                        ></feColorMatrix>
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_727_15891"
                        ></feBlend>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_727_15891"
                          result="shape"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ color: '#2DA771' }}>
                    CeStorage
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'text.secondary' }}
                  >
                    One-click function and customizable configuration
                    parameters, users can quickly mint and issue degrees and
                    certificates as Non-Fungible Tokens (NFT) and securely store
                    them on-chain.
                  </Typography>
                </Box>
              </Box>
            </a>
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: 'rgba(255,106,28,.05)',
              whiteSpace: 'unset',
              mt: 2,
            }}
          >
            <a
              href="https://dev-cert.certy.network/categories"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
              }}
            >
              <Box display="flex">
                <Box>
                  <svg
                    className="-mt-2"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_727_15904)">
                      <circle cx="36" cy="29" r="21" fill="white"></circle>
                      <circle
                        cx="36"
                        cy="29"
                        r="20"
                        stroke="#FF6A1C"
                        strokeWidth="2"
                      ></circle>
                    </g>
                    <path
                      d="M44 26.8099H39.0062C38.9708 26.4106 38.8764 26.0485 38.7229 25.7234C38.5753 25.3983 38.3687 25.1188 38.1031 24.885C37.8434 24.6454 37.5276 24.4629 37.1557 24.3375C36.7839 24.2063 36.3618 24.1407 35.8896 24.1407C35.0632 24.1407 34.3637 24.3346 33.7911 24.7224C33.2245 25.1103 32.7936 25.6664 32.4984 26.3907C32.2092 27.115 32.0646 27.9848 32.0646 29C32.0646 30.0722 32.2122 30.9705 32.5073 31.6949C32.8083 32.4135 33.2422 32.9553 33.8089 33.3203C34.3755 33.6797 35.0573 33.8593 35.8542 33.8593C36.3087 33.8593 36.716 33.8051 37.076 33.6968C37.4361 33.5827 37.749 33.4202 38.0146 33.2091C38.2802 32.9981 38.4957 32.7443 38.6609 32.4477C38.8321 32.1454 38.9472 31.8061 39.0062 31.4297L44 31.4639C43.941 32.2053 43.7255 32.961 43.3536 33.731C42.9818 34.4952 42.4535 35.2025 41.7687 35.8527C41.0899 36.4972 40.2488 37.0162 39.2453 37.4097C38.2418 37.8032 37.076 38 35.7479 38C34.0833 38 32.5899 37.6549 31.2677 36.9648C29.9514 36.2747 28.9095 35.2595 28.1422 33.9192C27.3807 32.5789 27 30.9392 27 29C27 27.0494 27.3896 25.4068 28.1687 24.0722C28.9479 22.7319 29.9986 21.7196 31.3208 21.0352C32.6431 20.3451 34.1187 20 35.7479 20C36.8931 20 37.9467 20.1511 38.9089 20.4534C39.871 20.7557 40.7151 21.1977 41.4411 21.7795C42.1672 22.3555 42.7516 23.0656 43.1943 23.9097C43.637 24.7538 43.9056 25.7205 44 26.8099Z"
                      fill="#FF6A1C"
                    ></path>
                    <defs>
                      <filter
                        id="filter0_d_727_15904"
                        x="0"
                        y="0"
                        width="72"
                        height="72"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        ></feFlood>
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        ></feColorMatrix>
                        <feOffset dy="7"></feOffset>
                        <feGaussianBlur stdDeviation="7.5"></feGaussianBlur>
                        <feComposite
                          in2="hardAlpha"
                          operator="out"
                        ></feComposite>
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.164706 0 0 0 0 0.521569 0 0 0 0 1 0 0 0 0.1 0"
                        ></feColorMatrix>
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_727_15904"
                        ></feBlend>
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_727_15904"
                          result="shape"
                        ></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#FF6A1C' }}>
                    CeCareer
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'text.secondary' }}
                  >
                    Certy will be building the Career Builder feature, working
                    as a portal using a recommender system to connect users
                    looking for desired jobs with the world‘s leading companies.
                  </Typography>
                </Box>
              </Box>
            </a>
          </MenuItem>
        </Stack>
      </Menu>
    </>
  );
}
