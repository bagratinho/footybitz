import * as React from "react";
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider, FormControl, InputAdornment, InputBase, List, ListItem, TextField, Typography } from "@mui/material";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import FaceIcon from "@mui/icons-material/Face";
import PageWrapper from "containers/PageWrapper";
import { useEffect, useState } from "react";
import { db } from "firebaseInstance";
import { collection, getDocs, query, setDoc, doc, updateDoc } from "firebase/firestore";
import { injectIntl } from "react-intl";
import messages from "components/Dictionary/messages";
import { Search } from "@mui/icons-material";

export interface ITeamsProps {
  className?: string;
  intl?: any;
}

const Teams = (props: ITeamsProps) =>  {
  const [teams, setTeams] = useState<any[] | undefined>([]);
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);
  const [currentSelectedTeam, setCurrentSelectedTeam] = useState<{ name: string, avatar: string, id: string } | undefined>();
  const [currentEditedTeam, setCurrentEditedTeam] = useState<{ name?: string, avatar?: string } | undefined>();

  useEffect(() => {
    const teamsCollectionRef = collection(db, "teams");
    const data = async (y: any) => {
      const q = query(y);
      const querySnapshot = await getDocs(q);
      let tms: any[] = [];
      querySnapshot.forEach((doc) => {
        tms.push({
          ...doc.data() as Object,
        });
      });
     setTeams(tms);
    };
    data(teamsCollectionRef);
  }, []);

  const onSearchQueryChange = (e: any) => setSearchQuery(e.target.value);
  const handleSave = async () => {
    if (currentSelectedTeam && currentEditedTeam && currentEditedTeam.name && currentEditedTeam.avatar) {
      const teamRef = doc(db, "teams", currentSelectedTeam.id);
      await updateDoc(teamRef, {
        name: currentEditedTeam.name,
        avatar: currentEditedTeam.avatar,
      }).then(docRef => {
        console.log("Document has been updated successfully");
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      if (!currentEditedTeam || !currentEditedTeam.name || !currentEditedTeam.avatar) { return; }
      const newTeamRef = doc(collection(db, "teams"));
      await setDoc(newTeamRef, {
        name: currentEditedTeam.name,
        avatar: currentEditedTeam.avatar,
        id: newTeamRef.id,
      }).then(docRef => {
        console.log("Document has been added successfully");
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
  const handleClose = () => {
    setIsTeamModalOpen(false);
  }
  const handleOpen = () => {
    setIsTeamModalOpen(true);
  }
  const handleNameChange = (e: any) => {
    setCurrentEditedTeam({
      ...currentEditedTeam,
      name: e.target.value,
    })
  }
  const handleAvatarChange = (e: any) => {
    setCurrentEditedTeam({
      ...currentEditedTeam,
      avatar: e.target.value,
    })
  }
  const getTeams = () => {
    if (!teams) { return null }
    return teams.map(item => {
      return (
        <React.Fragment>
          <Divider />
          <ListItem disableRipple button>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Typography variant="body1" color="textSecondary">ID: {item.id}</Typography>
              <Chip
                avatar={<Avatar src={item.avatar}/>}
                label={item.name}
                color="primary"
              />
            </Box>
          </ListItem>
        </React.Fragment>
      )
    })
  }
  return (
    <PageWrapper>
      <Box>
        <StickyBar position="top">
          <Box
            bgcolor="background.default"
            sx={{
              color: "divider",
              borderBottom: "1px solid",
              minHeight: "59px",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pt={1}
              pb={1}
              pr={2}
              pl={2}
              sx={{
                color: "divider",
                borderBottom: "1px solid",
                minHeight: "59px",
              }}
            >
              <Typography variant="h6" component="h2" color="text.primary">
                <Dictionary label="teams"/>
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                disableElevation
                onClick={handleOpen}
              >
                <Dictionary label="newTeam"/>
              </Button>
            </Box>
            <Box
              sx={{
                height: 49,
                display: "flex",
              }}
            >
              <InputBase
                sx={{
                  m: 1,
                  flex: 1,
                  height: 32,
                  bgcolor: "divider",
                  pl: 1,
                  pr: 1,
                  borderRadius: 16,
                }}
                placeholder={props.intl.formatMessage(messages.search)}
                value={searchQuery}
                onChange={onSearchQueryChange}
                startAdornment={
                  <InputAdornment position="start">
                    <Search/>
                  </InputAdornment>
                }
              />
            </Box>
          </Box>
        </StickyBar>
        <Box
          pt="108px"
        >
          <List component="nav" >
            {getTeams()}
          </List>
        </Box>
      </Box>
      <Dialog
        open={isTeamModalOpen}
        onClose={handleClose}
      >
        <DialogTitle>
          <Dictionary
            label={currentSelectedTeam ? "editEntity" : "newTeam"}
            values={currentSelectedTeam ? { name: currentSelectedTeam.name } : undefined}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            placeholder={props.intl.formatMessage(messages.teamName)}
            onChange={handleNameChange}
            value={currentEditedTeam?.name}
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <TextField
            margin="dense"
            id="avatar"
            placeholder={props.intl.formatMessage(messages.teamAvatar)}
            onChange={handleAvatarChange}
            value={currentEditedTeam?.avatar}
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disableElevation
            color="secondary"
          >
            <Dictionary label="cancel"/>
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disableElevation
            color="secondary"
          >
            <Dictionary label={true ? "create" : "update"}/>
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}

export default injectIntl(Teams);