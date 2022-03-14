import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Box, Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const styles = {
    paperContainer: {
        height: 630,
        backgroundImage: `url("https://cdn.pixabay.com/photo/2016/05/24/13/29/olive-oil-1412361_1280.jpg")`
    }
};
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[200]),
    backgroundColor: grey[200],
    '&:hover': {
      backgroundColor: grey[50],
    },
  }));

function Home() {
  return (
    <div style={styles.paperContainer}>
    <Box component="header" position="relative" color="white">
      <Box component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid container flexDirection="row" alignItems="center">
            <Typography
              color="white"
              fontWeight="regular"
              py={0.8125}
              mr={2}
            >
              Website Name
            </Typography>
            <Box
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >
              <Box component="li">
                <Typography
                  component={Link}
                  href="/home"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                >
                  Home
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  component={Link}
                  href="/aboutus"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                >
                  About Us
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  component={Link}
                  href="/aboutDiabetes"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                >
                  About Diabetes
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
      <Container>
          <Grid container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
          <Typography
          variant="h1"
          color="white"
          mt={20}
          >
              Website Name
            </Typography>
            <Typography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
              Sign up with us and record your health data everyday.
            </Typography>
            <Stack direction="row" spacing={1} mt={3}>
              <ColorButton variant="contained">Sign Up</ColorButton>
              <ColorButton variant="contained">
                Sign In
              </ColorButton>
            </Stack>
          </Grid>
        </Container>
      </Box>
      </div>
  );
}

export default Home;
