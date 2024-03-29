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
import { useHistory } from "react-router-dom";
import NoResult from "components/NoResult";
export interface IAdminMatchdaysProps {
  className?: string;
  intl?: any;
}

interface IEditedMatchday {
  name?: string,
  kickOffDate?: any;
  status?: string;
}
interface ISelectedMatchday {
  id: string;
  name: string,
  kickOffDate: any;
  status: string;
}

const AdminMatchdays = (props: IAdminMatchdaysProps) =>  {
  const [matchdays, setMatchdays] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMatchdayModalOpen, setIsMatchdayModalOpen] = useState<boolean>(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState<boolean>(false);
  const [currentSelectedMatchday, setCurrentSelectedMatchday] = useState<ISelectedMatchday | undefined>();
  const [currentEditedMatchday, setCurrentEditedMatchday] = useState<IEditedMatchday | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const collectionName = "matchdays";
  const history = useHistory();
  const theme = useTheme();

  const getMatchdays = async (nameFilter?: string) => {
    setIsLoading(true);
    const q = nameFilter ?
      query(collection(db, collectionName), where("name", ">=", nameFilter), where("name", "<", nameFilter + "z"), orderBy("name", "desc"), limit(40)) :
      query(collection(db, collectionName), orderBy("kickOffDate", "asc"), limit(40));
    const querySnapshot = await getDocs(q);
    const mchds: any[] = [];
    querySnapshot.forEach((doc) => {
      mchds.push({
        ...doc.data() as Object,
      });
    });
    setIsLoading(false);
    setMatchdays(mchds);
  };
  const debouncedGetItems = debounce(getMatchdays, 300);

  useEffect(() => {
    getMatchdays();
  }, []);

  const onSearchQueryChange = (e: any) => {
    setSearchQuery(e.target.value);
    debouncedGetItems(e.target.value);
  }

  const handleSave = async () => {
    if (currentSelectedMatchday &&
      currentEditedMatchday &&
      currentEditedMatchday.name &&
      currentEditedMatchday.kickOffDate &&
      currentEditedMatchday.status !== undefined) {
      const matchdayRef = doc(db, collectionName, currentSelectedMatchday.id);
      const unsubscribe = onSnapshot(doc(db, collectionName, matchdayRef.id), (doc) => {
        const matchday = doc.data();
        if (!matchday) { return; }
        const newTeams = matchdays.map(i => i.id === matchday.id ? matchday : i);
        setMatchdays(newTeams);
        unsubscribe();
      });
      await updateDoc(matchdayRef, {
        name: currentEditedMatchday.name,
        kickOffDate: currentEditedMatchday.kickOffDate,
        status: currentEditedMatchday.status,
      });
    } else {
      if (!currentEditedMatchday ||
        !currentEditedMatchday.name ||
        !currentEditedMatchday.kickOffDate ||
        currentEditedMatchday.status === undefined
      ) { return; }
      const newTeamRef = doc(collection(db, collectionName));
      const unsubscribe = onSnapshot(doc(db, collectionName, newTeamRef.id), (doc) => {
        const matchday = doc.data();
        if (!matchday) { return; }
        setMatchdays([...matchdays, matchday]);
        unsubscribe();
      });
      await setDoc(newTeamRef, {
        name: currentEditedMatchday.name,
        kickOffDate: currentEditedMatchday.kickOffDate,
        status: currentEditedMatchday.status,
        id: newTeamRef.id,
      });
    }
    handleClose();
  }

  const handleDelete = async () => {
    if (!currentSelectedMatchday) { return; }
    const docRef = currentSelectedMatchday?.id;
    await deleteDoc(doc(db, collectionName, docRef)).then(r => {
      setMatchdays(matchdays.filter(i => i.id !== docRef));
    });
    setIsDeletePromptOpen(false);
  }

  const handleDeletePromptOpenGenerator = (item: ISelectedMatchday) => () => {
    setCurrentSelectedMatchday(item);
    setIsDeletePromptOpen(true);
  }

  const handleDeletePromptClose = () => {
    setCurrentSelectedMatchday(undefined);
    setIsDeletePromptOpen(false);
  }

  const handleClose = () => {
    setCurrentSelectedMatchday(undefined);
    setCurrentEditedMatchday(undefined);
    setIsMatchdayModalOpen(false);
  }

  const handleOpen = () => {
    setCurrentEditedMatchday({
      name: "",
      status: "archived",
      kickOffDate: "",
    });
    setIsMatchdayModalOpen(true);
  }

  const handleOpenWithEdit = (item: any) => () => {
    setCurrentSelectedMatchday(item);
    setCurrentEditedMatchday({
      name: item.name,
      status: item.status,
      kickOffDate: item.kickOffDate,
    });
    setIsMatchdayModalOpen(true);
  }

  const handleNameChange = (e: any) => {
    setCurrentEditedMatchday({
      ...currentEditedMatchday,
      name: e.target.value,
    });
  }

  const handleStatusChange = (e: any) => {
    setCurrentEditedMatchday({
      ...currentEditedMatchday,
      status: e.target.value,
    });
  }
  const handleKickOffDateChange = (e: any) => {
    setCurrentEditedMatchday({
      ...currentEditedMatchday,
      kickOffDate: Timestamp.fromDate(new Date(e.target.value)),
    });
  }

  const openMatchdayGenerator = (item: any) => () => {
    history.push(`/admin-matchdays/${item.id}_${item.name}`)
  }

  const renderMatchdays = () => {
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
        <NoResult/>
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
                label={item.name}
                disabled={item.status === "started" || item.status === "finished"}
                color={item.status === "active" ? "primary" : "default"}
                onClick={openMatchdayGenerator(item)}
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
            {renderMatchdays()}
          </List>
        </Box>
      </Box>
      <Dialog
        open={isMatchdayModalOpen}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: 0,
        }}
      >
        <DialogTitle>
          <Dictionary
            label={currentSelectedMatchday ? "editEntity" : "newMatchday"}
            values={currentSelectedMatchday ? { entity: currentSelectedMatchday.name } : undefined}
          />
        </DialogTitle>
        <DialogContent
          sx={{ width: 600 }}
        >
          <TextField
            margin="normal"
            label={props.intl.formatMessage(messages.name)}
            onChange={handleNameChange}
            value={currentEditedMatchday?.name || ""}
            type="text"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <TextField
            margin="normal"
            type="datetime-local"
            label={props.intl.formatMessage(messages.kickOffDate)}
            value={(currentEditedMatchday?.kickOffDate ?
              currentEditedMatchday?.kickOffDate.toDate().toISOString() :
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentEditedMatchday?.status}
            variant="outlined"
            color="secondary"
            fullWidth
            onChange={handleStatusChange}
          >
            <MenuItem value="archived"><Dictionary label="archived"/></MenuItem>
            <MenuItem value="active"><Dictionary label="active"/></MenuItem>
            <MenuItem value="started"><Dictionary label="started"/></MenuItem>
            <MenuItem value="finished"><Dictionary label="finished"/></MenuItem>
          </Select>
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
            <Dictionary label={currentSelectedMatchday ? "update" : "create"}/>
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationPrompt
        isOpen={isDeletePromptOpen}
        onClose={handleDeletePromptClose}
        onConfirm={handleDelete}
        titleLabel="deleteEntityPromptTitle"
        titleValues={{ entity: currentSelectedMatchday?.name || "" }}
        descriptionLabel="deleteEntityPromptDescription"
        descriptionValues={{ entity: currentSelectedMatchday?.name || "" }}
      />
    </PageWrapper>
  );
}

export default injectIntl(AdminMatchdays);