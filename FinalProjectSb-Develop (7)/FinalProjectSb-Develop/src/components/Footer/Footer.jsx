import { Box, Container, Link, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="http://pm1.narvii.com/7531/c5a07a6fd28673dd35bc2539a9e6377f86e5243cr1-474-374v2_uhq.jpg">
        Йо вэбсайт
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          Совсем не липкий футер.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
export default Footer;
