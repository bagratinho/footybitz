import * as React from "react";
import { Avatar, Box, Button, Chip, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogTitle,
  Divider, IconButton, InputAdornment, InputBase, List, ListItem, TextField, Typography } from "@mui/material";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import PageWrapper from "containers/PageWrapper";
import { useEffect, useState } from "react";
import { db } from "firebaseInstance";
import { collection, getDocs, query, setDoc, doc, updateDoc, onSnapshot, orderBy, limit, deleteDoc, where } from "firebase/firestore";
import { injectIntl } from "react-intl";
import messages from "components/Dictionary/messages";
import { AddRounded, Delete, EditOutlined, Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ConfirmationPrompt from "components/ConfirmationPrompt";
export interface ITeamsProps {
  className?: string;
  intl?: any;
}
interface IEditedTeam {
  name?: string,
  avatar?: string;
}
interface ISelectedTeam {
  id: string;
  name: string,
  avatar: string;
}

const Teams = (props: ITeamsProps) =>  {
  const [teams, setTeams] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState<boolean>(false);
  const [currentSelectedTeam, setCurrentSelectedTeam] = useState<ISelectedTeam | undefined>();
  const [currentEditedTeam, setCurrentEditedTeam] = useState<IEditedTeam | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const collectionName = "teams";
  const theme = useTheme();

  const getTeams = async (nameFilter?: string) => {
    setIsLoading(true);
    const q = nameFilter ?
      query(collection(db, collectionName), where("name", ">=", nameFilter), where("name", "<", nameFilter + "z"), orderBy("name", "desc"), limit(40)) :
      query(collection(db, collectionName), orderBy("name", "desc"), limit(40));
    const querySnapshot = await getDocs(q);
    const tms: any[] = [];
    querySnapshot.forEach((doc) => {
      tms.push({
        ...doc.data() as Object,
      });
    });
    setIsLoading(false);
    setTeams(tms);
  };
  const debouncedGetItems = debounce(getTeams, 300);

  useEffect(() => {
    getTeams();
  }, []);

  const onSearchQueryChange = (e: any) => {
    setSearchQuery(e.target.value);
    debouncedGetItems(e.target.value);
  }

  const handleSave = async () => {
    if (currentSelectedTeam && currentEditedTeam && currentEditedTeam.name && currentEditedTeam.avatar) {
      const teamRef = doc(db, collectionName, currentSelectedTeam.id);
      const unsubscribe = onSnapshot(doc(db, collectionName, teamRef.id), (doc) => {
        const team = doc.data();
        if (!team) { return; }
        const newTeams = teams.map(i => i.id === team.id ? team : i);
        setTeams(newTeams);
        unsubscribe();
      });
      await updateDoc(teamRef, {
        name: currentEditedTeam.name,
        avatar: currentEditedTeam.avatar,
      });
    } else {
      if (!currentEditedTeam || !currentEditedTeam.name || !currentEditedTeam.avatar) { return; }
      const newTeamRef = doc(collection(db, collectionName));
      const unsubscribe = onSnapshot(doc(db, collectionName, newTeamRef.id), (doc) => {
        const team = doc.data();
        if (!team) { return; }
        setTeams([...teams, team]);
        unsubscribe();
      });
      await setDoc(newTeamRef, {
        name: currentEditedTeam.name,
        avatar: currentEditedTeam.avatar,
        id: newTeamRef.id,
      });
    }
    setIsTeamModalOpen(false);
  }

  const handleDelete = async () => {
    if (!currentSelectedTeam) { return; }
    const docRef = currentSelectedTeam?.id;
    await deleteDoc(doc(db, collectionName, docRef)).then(r => {
      setTeams(teams.filter(i => i.id !== docRef));
    });
    setIsDeletePromptOpen(false);
  }

  const handleDeletePromptOpenGenerator = (item: ISelectedTeam) => () => {
    setCurrentSelectedTeam(item);
    setIsDeletePromptOpen(true);
  }

  const handleDeletePromptClose = () => {
    setCurrentSelectedTeam(undefined);
    setIsDeletePromptOpen(false);
  }

  const handleClose = () => {
    setCurrentSelectedTeam(undefined);
    setCurrentEditedTeam(undefined);
    setIsTeamModalOpen(false);
  }

  const handleOpen = () => {
    setIsTeamModalOpen(true);
  }

  const handleOpenWithEdit = (item: any) => () => {
    setCurrentSelectedTeam(item);
    setCurrentEditedTeam({
      name: item.name,
      avatar: item.avatar,
    });
    handleOpen();
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

  const renderTeams = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            height: 300,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      );
    }
    if (!teams.length) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            height: 300,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <Dictionary label="nothingToShow"/>
          </Typography>
        </Box>
      );
    }
    return teams.map(item => {
      return (
        <React.Fragment key={item.id}>
          <Divider />
          <ListItem disableRipple button>
            <Box
              display="flex"
              width="100%"
              alignItems="center"
            >
              <Chip
                avatar={<Avatar src={item.avatar} sx={{ p: 0.5 }}/>}
                label={item.name}
                color="primary"
                sx={{
                  mr: "auto",
                }}
              />
              <IconButton
                color="default"
                size="small"
                onClick={handleOpenWithEdit(item)}
              >
                <EditOutlined/>
              </IconButton>
              <IconButton
                color="default"
                size="small"
                onClick={handleDeletePromptOpenGenerator(item)}
              >
                <Delete/>
              </IconButton>
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
              <IconButton
                color="default"
                size="small"
                onClick={handleOpen}
              >
                <AddRounded/>
              </IconButton>
            </Box>
            <Box
              sx={{
                height: 49,
                display: "flex",
              }}
            >
              <InputBase
                sx={{
                  mt: 1,
                  mb: 1,
                  ml: 2,
                  mr: 2,
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
            {renderTeams()}
          </List>
        </Box>
      </Box>
      <Dialog
        open={isTeamModalOpen}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: 0,
        }}
      >
        <DialogTitle>
          <Dictionary
            label={currentSelectedTeam ? "editEntity" : "newTeam"}
            values={currentSelectedTeam ? { entity: currentSelectedTeam.name } : undefined}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            placeholder={props.intl.formatMessage(messages.name)}
            onChange={handleNameChange}
            value={currentEditedTeam?.name || ""}
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <TextField
            margin="dense"
            placeholder={props.intl.formatMessage(messages.avatar)}
            onChange={handleAvatarChange}
            value={currentEditedTeam?.avatar || ""}
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
            variant="outlined"
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
            <Dictionary label={currentSelectedTeam ? "update" : "create"}/>
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationPrompt
        isOpen={isDeletePromptOpen}
        onClose={handleDeletePromptClose}
        onConfirm={handleDelete}
        titleLabel="deleteEntityPromptTitle"
        titleValues={{ entity: currentSelectedTeam?.name || "" }}
        descriptionLabel="deleteEntityPromptDescription"
        descriptionValues={{ entity: currentSelectedTeam?.name || "" }}
      />
    </PageWrapper>
  );
}

export default injectIntl(Teams);