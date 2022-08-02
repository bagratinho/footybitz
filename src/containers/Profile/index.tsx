import * as React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import { FormattedNumber } from "react-intl";
import PageWrapper from "containers/PageWrapper";

export interface IProfileProps {
  className?: string;
}

export default (props: IProfileProps) =>  {

  return (
    <PageWrapper>
      <Box>
        <StickyBar position="top">
          <Box
            pt={1}
            pb={1}
            pr={2}
            pl={2}
            sx={{
              color: "divider",
              borderBottom: "1px solid",
              minHeight: "59px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
          <Typography variant="h6" component="h2" color="text.primary">
            <Dictionary label="profile"/>
          </Typography>
          </Box>
        </StickyBar>
        <Box
          pt="59px"
          sx={{
            display: "flex",
          }}
        >
          <Box
            p={2}
            sx={{
              display: "flex",
              alignItems: "center",
              // backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/002/869/964/non_2x/football-stadium-background-free-vector.jpg)",
            }}
          >
            <Avatar
              src="https://pbs.twimg.com/profile_images/1428702978303791106/06e0QASS_400x400.jpg"
              sx={{
                width: 80,
                height: 80,
              }}
            />
            <Box
              pl={2}
            >
              <Typography variant="h6" color="text.primary">
                pvzkbfcs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Dictionary label="joined" values={{ date: "2016" }}/>
              </Typography>
            </Box>
          </Box>
          <Box
            p={2}
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                width: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <Dictionary label="predictions"/>
              </Typography>
              <Typography variant="h5" color="text.secondary">
                <FormattedNumber
                  value={500}
                  style="unit"
                />
              </Typography>
            </Box>
            <Box
              sx={{
                width: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <Dictionary label="earnings"/>
              </Typography>
              <Typography variant="h5" color="text.secondary">
                ₮
                <FormattedNumber
                  value={1800.05}
                  style="decimal"
                />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
}