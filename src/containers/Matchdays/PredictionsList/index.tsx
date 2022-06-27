import * as React from "react";
import { Box, Chip, Divider, List, ListItem, Paper, Typography } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import Dictionary from "components/Dictionary";
import { FormattedNumber } from "react-intl";

export interface IPredictionsListProps {
  className?: string;
}

export default (props: IPredictionsListProps) =>  {

  return (
    <Box>
      <Box
        p={2}
        display="flex"
      >
        <Box
          flex={1}
          marginRight={2}
        >
          <Paper variant="outlined">
            <Box
              p={2}
            >
              <Typography variant="h6" component="h2" color="success.main">
                ₮
                <FormattedNumber
                  value={1800.05}
                  style="decimal"
                />
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <Dictionary label="currentPrizePool"/>
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box
          flex={1}
        >
          <Paper variant="outlined">
            <Box
              p={2}
            >
              <Typography variant="h6" component="h2" color="textPrimary">
                <FormattedNumber
                  value={1218}
                />
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                <Dictionary label="numberOfParticipants"/>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box>
          <List component="nav" >
            <Divider />
            <ListItem disableRipple button>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body1" color="textSecondary">ID: 156546898</Typography>
                <Chip
                  icon={<FaceIcon />}
                  label="Footybitz user"
                  color="primary"
                />
              </Box>
            </ListItem>
            <Divider />
            <ListItem disableRipple button>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body1" color="textSecondary">ID: 156546898</Typography>
                <Chip
                  icon={<FaceIcon />}
                  label="Footybitz user"
                  color="primary"
                />
              </Box>
            </ListItem>
            <Divider />
            <ListItem disableRipple button>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body1" color="textSecondary">ID: 156546898</Typography>
                <Chip
                  icon={<FaceIcon />}
                  label="Footybitz user"
                  color="primary"
                />
              </Box>
            </ListItem>
            <Divider />
            <ListItem disableRipple button>
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="body1" color="textSecondary">ID: 156546898</Typography>
                <Chip
                  icon={<FaceIcon />}
                  label="Footybitz user"
                  color="primary"
                />
              </Box>
            </ListItem>
          </List>
      </Box>
    </Box>
  );
}
