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
import EntitySelect, { IEntitySelectOption } from "components/EntitySelect";
import { EntityImage, EntityImagesMap } from "components/EntityImage";
export interface ICompetitionsProps {
  className?: string;
  intl?: any;
}
interface IEditedCompetition {
  name?: string,
  avatar?: string;
}
interface ISelectedCompetition {
  id: string;
  name: string,
  avatar: string;
}

const Competitions = (props: ICompetitionsProps) =>  {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCompetitionModalOpen, setIsCompetitionModalOpen] = useState<boolean>(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState<boolean>(false);
  const [currentSelectedCompetition, setCurrentSelectedCompetition] = useState<ISelectedCompetition | undefined>();
  const [currentEditedCompetition, setCurrentEditedCompetition] = useState<IEditedCompetition | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const collectionName = "competitions";
  const theme = useTheme();

  const getCompetitions = async (nameFilter?: string) => {
    setIsLoading(true);
    const q = nameFilter ?
      query(collection(db, collectionName), where("name", ">=", nameFilter), where("name", "<", nameFilter + "z"), orderBy("name", "desc"), limit(40)) :
      query(collection(db, collectionName), orderBy("name", "desc"), limit(40));
    const querySnapshot = await getDocs(q);
    const cmps: any[] = [];
    querySnapshot.forEach((doc) => {
      cmps.push({
        ...doc.data() as Object,
      });
    });
    setIsLoading(false);
    setCompetitions(cmps);
  };
  const debouncedGetItems = debounce(getCompetitions, 300);

  useEffect(() => {
    getCompetitions();
  }, []);

  const onSearchQueryChange = (e: any) => {
    setSearchQuery(e.target.value);
    debouncedGetItems(e.target.value);
  }

  const handleSave = async () => {
    if (currentSelectedCompetition && currentEditedCompetition && currentEditedCompetition.name && currentEditedCompetition.avatar) {
      const competitionRef = doc(db, collectionName, currentSelectedCompetition.id);
      const unsubscribe = onSnapshot(doc(db, collectionName, competitionRef.id), (doc) => {
        const competition = doc.data();
        if (!competition) { return; }
        const newCompetitions = competitions.map(i => i.id === competition.id ? competition : i);
        setCompetitions(newCompetitions);
        unsubscribe();
      });
      await updateDoc(competitionRef, {
        name: currentEditedCompetition.name,
        avatar: currentEditedCompetition.avatar,
      });
    } else {
      if (!currentEditedCompetition || !currentEditedCompetition.name || !currentEditedCompetition.avatar) { return; }
      const newCompetitionRef = doc(collection(db, collectionName));
      const unsubscribe = onSnapshot(doc(db, collectionName, newCompetitionRef.id), (doc) => {
        const competition = doc.data();
        if (!competition) { return; }
        setCompetitions([...competitions, competition]);
        unsubscribe();
      });
      await setDoc(newCompetitionRef, {
        name: currentEditedCompetition.name,
        avatar: currentEditedCompetition.avatar,
        id: newCompetitionRef.id,
      });
    }
    handleClose();
  }

  const handleDelete = async () => {
    if (!currentSelectedCompetition) { return; }
    const docRef = currentSelectedCompetition?.id;
    await deleteDoc(doc(db, collectionName, docRef)).then(r => {
      setCompetitions(competitions.filter(i => i.id !== docRef));
    });
    setIsDeletePromptOpen(false);
  }

  const handleDeletePromptOpenGenerator = (item: ISelectedCompetition) => () => {
    setCurrentSelectedCompetition(item);
    setIsDeletePromptOpen(true);
  }

  const handleDeletePromptClose = () => {
    setCurrentSelectedCompetition(undefined);
    setIsDeletePromptOpen(false);
  }

  const handleClose = () => {
    setCurrentSelectedCompetition(undefined);
    setCurrentEditedCompetition(undefined);
    setIsCompetitionModalOpen(false);
  }

  const handleOpen = () => {
    setIsCompetitionModalOpen(true);
  }

  const handleOpenWithEdit = (item: any) => () => {
    setCurrentSelectedCompetition(item);
    setCurrentEditedCompetition({
      name: item.name,
      avatar: item.avatar,
    });
    handleOpen();
  }

  const handleNameChange = (e: any) => {
    setCurrentEditedCompetition({
      ...currentEditedCompetition,
      name: e.target.value,
    })
  }

  const handleAvatarChange = (e: React.SyntheticEvent, value: IEntitySelectOption) => {
    setCurrentEditedCompetition({
      ...currentEditedCompetition,
      avatar: value.id,
    })
  }

  const renderCompetitions = () => {
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
    if (!competitions.length) {
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
    return competitions.map(item => {
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
                avatar={<Avatar src={EntityImagesMap.competition.find(i => i.id === item.avatar)!.img} sx={{ p: 0.5 }}/>}
                onClick={handleOpenWithEdit(item)}
                label={item.name}
                color="secondary"
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
                <Dictionary label="competitions"/>
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
            {renderCompetitions()}
          </List>
        </Box>
      </Box>
      <Dialog
        open={isCompetitionModalOpen}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: 0,
        }}
      >
        <DialogTitle>
          <Dictionary
            label={currentSelectedCompetition ? "editEntity" : "newCompetition"}
            values={currentSelectedCompetition ? { entity: currentSelectedCompetition.name } : undefined}
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={props.intl.formatMessage(messages.name)}
            onChange={handleNameChange}
            value={currentEditedCompetition?.name || ""}
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <EntitySelect
            onOptionChange={handleAvatarChange}
            value={currentEditedCompetition?.avatar || ""}
            type="competition"
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
            <Dictionary label={currentSelectedCompetition ? "update" : "create"}/>
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationPrompt
        isOpen={isDeletePromptOpen}
        onClose={handleDeletePromptClose}
        onConfirm={handleDelete}
        titleLabel="deleteEntityPromptTitle"
        titleValues={{ entity: currentSelectedCompetition?.name || "" }}
        descriptionLabel="deleteEntityPromptDescription"
        descriptionValues={{ entity: currentSelectedCompetition?.name || "" }}
      />
    </PageWrapper>
  );
}

export default injectIntl(Competitions);