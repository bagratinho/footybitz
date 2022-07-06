import * as React from "react";
import { Avatar, Box, Button, Chip, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogTitle,
  Divider, IconButton, InputAdornment, InputBase, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material";
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
export interface IAdminMatchdaysProps {
  className?: string;
  intl?: any;
}

const AdminMatchdays = (props: IAdminMatchdaysProps) =>  {
  const [matchdays, setCompetitions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentSelectedMatchday, setCurrentSelectedMatchday] = useState<{ name: string, kickOffDate: string, id: string; isArchived: boolean; isFinished: boolean } | undefined>();
  const [currentEditedMatchday, setCurrentEditedMatchday] = useState<{ name?: string, kickOffDate?: string; isArchived: boolean; isFinished: boolean } | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const collectionName = "matchdays";
  const theme = useTheme();

  const getTeams = async (nameFilter?: string) => {
    setIsLoading(true);
    const q = nameFilter ?
      query(collection(db, collectionName), where("name", ">=", nameFilter), where("name", "<", nameFilter + "z"), orderBy("name", "desc"), limit(40)) :
      query(collection(db, collectionName), orderBy("kickOffDate", "desc"), limit(40));
    const querySnapshot = await getDocs(q);
    const tms: any[] = [];
    querySnapshot.forEach((doc) => {
      tms.push({
        ...doc.data() as Object,
      });
    });
    setIsLoading(false);
    setCompetitions(tms);
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
    if (currentSelectedMatchday && currentEditedMatchday && currentEditedMatchday.name && currentEditedMatchday.avatar) {
      const teamRef = doc(db, collectionName, currentSelectedMatchday.id);
      const unsubscribe = onSnapshot(doc(db, collectionName, teamRef.id), (doc) => {
        const team = doc.data();
        if (!team) { return; }
        const newTeams = matchdays.map(i => i.id === team.id ? team : i);
        setCompetitions(newTeams);
        unsubscribe();
      });
      await updateDoc(teamRef, {
        name: currentEditedMatchday.name,
        kickOffDate: currentEditedMatchday.kickOffDate,
        isArchived: currentEditedMatchday.isArchived,
        isFinished: currentEditedMatchday.isFinished,
      });
    } else {
      if (!currentEditedMatchday || !currentEditedMatchday.name || !currentEditedMatchday.avatar) { return; }
      const newTeamRef = doc(collection(db, collectionName));
      const unsubscribe = onSnapshot(doc(db, collectionName, newTeamRef.id), (doc) => {
        const team = doc.data();
        if (!team) { return; }
        setCompetitions([...matchdays, team]);
        unsubscribe();
      });
      await setDoc(newTeamRef, {
        name: currentEditedMatchday.name,
        kickOffDate: currentEditedMatchday.kickOffDate,
        isArchived: currentEditedMatchday.isArchived,
        isFinished: currentEditedMatchday.isFinished,
        id: newTeamRef.id,
      });
    }
  }

  const handleDelete = (docRef: string) => async () => {
    await deleteDoc(doc(db, collectionName, docRef)).then(r => {
      setCompetitions(matchdays.filter(i => i.id !== docRef));
    });
  }

  const handleClose = () => {
    setCurrentSelectedMatchday(undefined);
    setCurrentEditedMatchday(undefined);
    setIsModalOpen(false);
  }

  const handleOpen = () => {
    setIsModalOpen(true);
  }

  const handleOpenWithEdit = (item: any) => () => {
    setCurrentSelectedMatchday(item);
    setCurrentEditedMatchday({
      name: item.name,
      isArchived: item.isArchived,
      isFinished: item.isFinished,
      kickOffDate: item.kickOffDate,
    });
    handleOpen();
  }

  const handleNameChange = (e: any) => {
    setCurrentEditedMatchday({
      ...currentEditedMatchday,
      name: e.target.value,
    });
  }

  const handleIsArchivedChange = (e: any) => {
    setCurrentEditedMatchday({
      ...currentEditedMatchday,
      isArchived: Boolean(e.target.value),
    });
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
    if (!matchdays.length) {
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
    return matchdays.map(item => {
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
                onClick={handleDelete(item.id)}
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
                <Dictionary label="matchdays"/>
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
        open={isModalOpen}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: 0,
        }}
      >
        <DialogTitle>
          <Dictionary
            label={currentSelectedMatchday ? "editEntity" : "newCompetition"}
            values={currentSelectedMatchday ? { name: currentSelectedMatchday.name } : undefined}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            placeholder={props.intl.formatMessage(messages.matchdayName)}
            onChange={handleNameChange}
            value={currentEditedMatchday?.name || ""}
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={`${currentEditedMatchday?.isArchived}` || "true"}
            label="Age"
            onChange={handleIsArchivedChange}
          >
            <MenuItem value="true">true</MenuItem>
            <MenuItem value="false">false</MenuItem>
          </Select>
          <TextField
            margin="dense"
            type="datetime-local"
            label={props.intl.formatMessage(messages.kickOffDate)}
            defaultValue={currentEditedMatchday?.kickOffDate || ""}
            variant="outlined"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
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
            <Dictionary label={currentSelectedMatchday ? "update" : "create"}/>
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}

export default injectIntl(AdminMatchdays);