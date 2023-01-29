import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Copyright = (props: { sx?: { pt: number } }): JSX.Element => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
