import * as React from "react";
import { ArrowDropDown, Settings } from "@mui/icons-material";
import Dictionary from "components/Dictionary";
import { Avatar, Box, Button, IconButton, styled, Typography } from "@mui/material";
import { useAuth } from "context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "api/queries";
import StickyBar from "components/StickyBar";
import { FormattedDate, FormattedNumber } from "react-intl";

export interface ISidebarNavigationProps {
  className?: string;
}

export default (props: ISidebarNavigationProps) =>  {
  const { signOut, user } = useAuth();
  const { isLoading, isError, data } = useQuery(["user"], () => getUserData(user.uid));
  if (isLoading || isError) { return null; }
  console.log(data);
  return (
    <StickyBar
      position="top"
    >
      <Box
        ml={2}
      >
        <Box
          p={1}
          bgcolor="background.paper"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "0 0 20px 20px"
          }}
        >
          <Avatar
            src="https://pbs.twimg.com/profile_images/1428702978303791106/06e0QASS_400x400.jpg"
            sx={{
              width: 40,
              height: 40,
            }}
          />
          <Box
            pl={1}
          >
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: 700,
                lineHeight: "20px",
              }}
            >
              {data!.username}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: 12,
                lineHeight: "20px",
              }}
            >
              <Dictionary
                label="joinedDate"
                values={{
                  date: (
                    <FormattedDate
                      value={data!.createdAt.seconds * 1000}
                      // @ts-ignore:next-line
                      dateStyle="short"
                    />
                  )
                }}
              />
            </Typography>
          </Box>
          <IconButton
            color="default"
            size="small"
            sx={{
              ml: "auto",
            }}
          >
            <ArrowDropDown/>
          </IconButton>
        </Box>
        <Box
          p={1}
          mt={2}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            backgroundImage: "linear-gradient(45deg, rgb(120 29 242 / 21%) 0%,rgb(255 255 255 / 0%) 100%)",
          }}
        >
          <Box
            p={1}
          >
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontSize: 18,
                fontWeight: 700,
                lineHeight: "20px",
              }}
            >
              <Dictionary label="yourBalance"/>
            </Typography>
            <Box
              pt={2}
              pb={1}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                <Dictionary label="tetherUsdt"/>
              </Typography>
              <Typography variant="h6" component="h2" color="info.main">
                ₮
                <FormattedNumber
                  value={0}
                  maximumFractionDigits={2}
                  minimumFractionDigits={2}
                  style="decimal"
                />
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="info"
              size="small"
              disableElevation={true}
            >
              <Dictionary label="withdraw"/>
            </Button>
          </Box>
          <Box
            p={1}
          >
          </Box>
        </Box>

        <Button
          onClick={signOut}
        >
          <Dictionary label="signOut"/>
        </Button>
      </Box>
    </StickyBar>
  );
}


const StyledContainer = styled(Box)`
`;