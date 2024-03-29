import * as React from "react";
import { Avatar, Box, Chip, Divider, List, ListItem, Paper, TableContainer, Typography, Table, TableBody, TableRow, TableHead, TableCell } from "@mui/material";
import Dictionary from "components/Dictionary";
import { FormattedNumber } from "react-intl";

export interface IPredictionsListProps {
  className?: string;
}

function createData(position: string, user: { login: string; image: string }, points: number, wining: number) {
  return { position, user: { login: user.login, image: user.image}, points, wining };
}

const rows = [
  createData(
    "1",
    {
      login: "ratinho",
      image: "https://scontent.faep24-1.fna.fbcdn.net/v/t1.6435-1/cp0/c8.32.38.37a/p56x56/146624692_4293890287293377_8139523603888420447_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=5Nh_1KYtISsAX-Q4NF9&_nc_ht=scontent.faep24-1.fna&oh=7cb47ca3c35a8bd7e87f8b9b6da6c2d7&oe=61546089",
    },
    4500,
    8000,
  ),
  createData(
    "1",
    {
      login: "ratinho",
      image: "https://scontent.faep24-1.fna.fbcdn.net/v/t1.6435-1/cp0/c8.32.38.37a/p56x56/146624692_4293890287293377_8139523603888420447_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=5Nh_1KYtISsAX-Q4NF9&_nc_ht=scontent.faep24-1.fna&oh=7cb47ca3c35a8bd7e87f8b9b6da6c2d7&oe=61546089",
    },
    4500,
    8000,
  ),
  createData(
    "1",
    {
      login: "ratinho",
      image: "https://scontent.faep24-1.fna.fbcdn.net/v/t1.6435-1/cp0/c8.32.38.37a/p56x56/146624692_4293890287293377_8139523603888420447_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=5Nh_1KYtISsAX-Q4NF9&_nc_ht=scontent.faep24-1.fna&oh=7cb47ca3c35a8bd7e87f8b9b6da6c2d7&oe=61546089",
    },
    4500,
    8000,
  ),
];

export default (props: IPredictionsListProps) =>  {

  return (
    <Box>
      <Box
        p={2}
      >
        <Paper variant="outlined">
          <Box
            p={2}
            color="success.main"
          >
            <Typography variant="h6" component="h2">
              ₮
              <FormattedNumber
                value={1800.05}
                style="decimal"
              />
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              <Dictionary label="prizePool"/>
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box>
        <TableContainer component={Box}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Wining</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.user.login}>
                  <TableCell component="th" scope="row">
                    {row.position}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      avatar={<Avatar src={row.user.image} />}
                      label={row.user.login}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="right"><FormattedNumber value={row.points}/></TableCell>
                  <TableCell align="right">
                    ₮
                    <FormattedNumber
                      value={1800.05}
                      style="decimal"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
