import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";

import Title from "./Title";

const preventDefault = (event: React.MouseEvent): void => {
  event.preventDefault();
};

const Deposits = (): JSX.Element => {
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
};
export default Deposits;
