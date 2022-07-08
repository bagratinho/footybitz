import * as React from "react";
import { Avatar, Box, Button, Checkbox, Chip, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogTitle,
  Divider, FormControlLabel, FormGroup, IconButton, InputAdornment, InputBase, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import PageWrapper from "containers/PageWrapper";
import { useEffect, useState } from "react";
import { db } from "firebaseInstance";
import { Timestamp, collection, getDocs, query, setDoc, doc, updateDoc, onSnapshot, orderBy, limit, deleteDoc, where } from "firebase/firestore";
import { injectIntl } from "react-intl";
import messages from "components/Dictionary/messages";
import { AddRounded, Delete, EditOutlined, Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ConfirmationPrompt from "components/ConfirmationPrompt";
import { RouteComponentProps, useHistory } from "react-router-dom";

export interface IMatchdayProps extends RouteComponentProps<{matchdayId: string}> {
  className?: string;
  intl?: any;
}

interface IEditedMatch {
  name?: string,
  kickOffDate?: any;
  isArchived?: boolean;
  isFinished?: boolean
}

interface ISelectedMatch {
  id: string;
  name: string,
  kickOffDate: any;
  isArchived: boolean;
  isFinished: boolean
}

const Matchday = (props: IMatchdayProps) =>  {
  const [matches, setMatches] = useState<any[]>([]);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState<boolean>(false);
  const [currentSelectedMatch, setCurrentSelectedMatch] = useState<ISelectedMatch | undefined>();
  const [currentEditedMatch, setCurrentEditedMatch] = useState<IEditedMatch | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const collectionName = "matches";
  const history = useHistory();
  const theme = useTheme();
  console.log(props.match.params.matchdayId);
  const getMatchs = async () => {
    setIsLoading(true);
    const q = query(collection(db, collectionName), orderBy("kickOffDate", "desc"), limit(40));
    const querySnapshot = await getDocs(q);
    const mchds: any[] = [];
    querySnapshot.forEach((doc) => {
      mchds.push({
        ...doc.data() as Object,
      });
    });
    setIsLoading(false);
    setMatches(mchds);
  };

  useEffect(() => {
    getMatchs();
  }, []);

  const handleSave = async () => {
    if (currentSelectedMatch &&
      currentEditedMatch &&
      currentEditedMatch.name &&
      currentEditedMatch.kickOffDate &&
      currentEditedMatch.isArchived !== undefined &&
      currentEditedMatch.isFinished !== undefined) {
      const matchdayRef = doc(db, collectionName, currentSelectedMatch.id);
      const unsubscribe = onSnapshot(doc(db, collectionName, matchdayRef.id), (doc) => {
        const matchday = doc.data();
        if (!matchday) { return; }
        const newTeams = matches.map(i => i.id === matchday.id ? matchday : i);
        setMatches(newTeams);
        unsubscribe();
      });
      await updateDoc(matchdayRef, {
        name: currentEditedMatch.name,
        kickOffDate: currentEditedMatch.kickOffDate,
        isArchived: currentEditedMatch.isArchived,
        isFinished: currentEditedMatch.isFinished,
      });
    } else {
      if (!currentEditedMatch ||
        !currentEditedMatch.name ||
        !currentEditedMatch.kickOffDate ||
        currentEditedMatch.isArchived === undefined ||
        currentEditedMatch.isFinished === undefined
      ) { return; }
      const newTeamRef = doc(collection(db, collectionName));
      const unsubscribe = onSnapshot(doc(db, collectionName, newTeamRef.id), (doc) => {
        const matchday = doc.data();
        if (!matchday) { return; }
        setMatches([...matches, matchday]);
        unsubscribe();
      });
      await setDoc(newTeamRef, {
        name: currentEditedMatch.name,
        kickOffDate: currentEditedMatch.kickOffDate,
        isArchived: currentEditedMatch.isArchived,
        isFinished: currentEditedMatch.isFinished,
        id: newTeamRef.id,
      });
    }
    handleClose();
  }

  const handleDelete = async () => {
    if (!currentSelectedMatch) { return; }
    const docRef = currentSelectedMatch?.id;
    await deleteDoc(doc(db, collectionName, docRef)).then(r => {
      setMatches(matches.filter(i => i.id !== docRef));
    });
    setIsDeletePromptOpen(false);
  }

  const handleDeletePromptOpenGenerator = (item: ISelectedMatch) => () => {
    setCurrentSelectedMatch(item);
    setIsDeletePromptOpen(true);
  }

  const handleDeletePromptClose = () => {
    setCurrentSelectedMatch(undefined);
    setIsDeletePromptOpen(false);
  }

  const handleClose = () => {
    setCurrentSelectedMatch(undefined);
    setCurrentEditedMatch(undefined);
    setIsMatchModalOpen(false);
  }

  const handleOpen = () => {
    setCurrentEditedMatch({
      name: "",
      isArchived: true,
      isFinished: false,
      kickOffDate: "",
    });
    setIsMatchModalOpen(true);
  }

  const handleOpenWithEdit = (item: any) => () => {
    setCurrentSelectedMatch(item);
    setCurrentEditedMatch({
      name: item.name,
      isArchived: item.isArchived,
      isFinished: item.isFinished,
      kickOffDate: item.kickOffDate,
    });
    setIsMatchModalOpen(true);
  }

  const handleNameChange = (e: any) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      name: e.target.value,
    });
  }

  const handleIsArchivedChange = (e: any) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      isArchived: e.target.checked,
    });
  }

  const handleIsFinishedChange = (e: any) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      isFinished: e.target.checked,
    });
  }

  const handleKickOffDateChange = (e: any) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      kickOffDate: Timestamp.fromDate(new Date(e.target.value)),
    });
  }

  const openMatchGenerator = (item: any) => () => {
    history.push(`/admin-matches/${item.id}`)
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
    if (!matches.length) {
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
    return matches.map(item => {
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
                label={item.name}
                disabled={item.isFinished}
                color={item.isArchived ? "default" : "primary"}
                onClick={openMatchGenerator(item)}
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
            pt={1}
            pb={1}
            pr={2}
            pl={2}
            bgcolor="background.default"
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
              <Dictionary label="matches"/>
            </Typography>
            <IconButton
              color="default"
              size="small"
              onClick={handleOpen}
            >
              <AddRounded/>
            </IconButton>
          </Box>
        </StickyBar>
        <Box
          pt="58px"
        >
          <List component="nav" >
            {renderTeams()}
          </List>
        </Box>
      </Box>
      <Dialog
        open={isMatchModalOpen}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: 0,
        }}
      >
        <DialogTitle>
          <Dictionary
            label={currentSelectedMatch ? "editEntity" : "newMatch"}
            values={currentSelectedMatch ? { entity: currentSelectedMatch.name } : undefined}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label={props.intl.formatMessage(messages.name)}
            onChange={handleNameChange}
            value={currentEditedMatch?.name || ""}
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <TextField
            margin="normal"
            type="datetime-local"
            label={props.intl.formatMessage(messages.kickOffDate)}
            value={(currentEditedMatch?.kickOffDate ?
              currentEditedMatch?.kickOffDate.toDate().toISOString() :
              "").slice(0, 16)
            }
            variant="outlined"
            color="secondary"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleKickOffDateChange}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentEditedMatch?.isArchived}
                  onChange={handleIsArchivedChange}
                  disableRipple
                  color="secondary"
                />
              }
              label={props.intl.formatMessage(messages.isArchived)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentEditedMatch?.isFinished}
                  onChange={handleIsFinishedChange}
                  disableRipple
                  color="secondary"
                />
              }
              label={props.intl.formatMessage(messages.isFinished)}
            />
          </FormGroup>
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
            <Dictionary label={currentSelectedMatch ? "update" : "create"}/>
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationPrompt
        isOpen={isDeletePromptOpen}
        onClose={handleDeletePromptClose}
        onConfirm={handleDelete}
        titleLabel="deleteEntityPromptTitle"
        titleValues={{ entity: currentSelectedMatch?.name || "" }}
        descriptionLabel="deleteEntityPromptDescription"
        descriptionValues={{ entity: currentSelectedMatch?.name || "" }}
      />
    </PageWrapper>
  );
}

// @ts-ignore:next-line
export default injectIntl(Matchday);