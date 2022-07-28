import * as React from "react";
import { Autocomplete, Avatar, Box, Button, Checkbox, Chip, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogTitle,
  Divider, FormControlLabel, FormGroup, IconButton, InputAdornment, InputBase, List, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material";
import StickyBar from "components/StickyBar";
import Dictionary from "components/Dictionary";
import PageWrapper from "containers/PageWrapper";
import { useEffect, useState } from "react";
import { db } from "firebaseInstance";
import { Timestamp, collection, getDocs, query, setDoc, doc, updateDoc, onSnapshot, orderBy, limit, deleteDoc, where } from "firebase/firestore";
import { injectIntl } from "react-intl";
import messages from "components/Dictionary/messages";
import { AddRounded, ArrowBack, Delete, EditOutlined, Outlet, Search } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ConfirmationPrompt from "components/ConfirmationPrompt";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { EntityImagesMap } from "components/EntityImage";
import { transparentize } from "utils"
import NumberInput from "components/NumberInput";


export interface IMatchdayProps extends RouteComponentProps<{matchdayId: string}> {
  className?: string;
  intl?: any;
}

interface IEditedMatch {
  id?: string;
  awayTeamAvatar?: string;
  awayTeamGoals?: number;
  awayTeamName?: string;
  awayTeamId?: string;
  competitionAvatar?: string;
  competitionName?: string;
  homeTeamAvatar?: string;
  homeTeamGoals?: number;
  homeTeamName?: string;
  homeTeamId?: string;
  competitionId?: string;
  isFinished?: boolean;
  kickOffDate?: any;
  matchdayId?: string;
  stage?: string;
}

interface ISelectedMatch {
  id: string;
  awayTeamAvatar: string;
  awayTeamGoals: number;
  awayTeamName: string;
  awayTeamId: string;
  competitionAvatar: string;
  competitionName: string;
  homeTeamAvatar: string;
  homeTeamGoals: number;
  homeTeamName: string;
  homeTeamId: string;
  competitionId: string;
  isFinished: boolean;
  kickOffDate: any;
  matchdayId: string;
  stage: string;
}

interface IEntitySelectOption {
  id: string;
  name: string;
  avatar: string;
}

const Matchday = (props: IMatchdayProps) =>  {
  const [matches, setMatches] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState<boolean>(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState<boolean>(false);
  const [currentSelectedMatch, setCurrentSelectedMatch] = useState<ISelectedMatch | undefined>();
  const [currentEditedMatch, setCurrentEditedMatch] = useState<IEditedMatch | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [matchdayId, matchdayName] = props.match.params.matchdayId.split("_");
  const collectionName = `matchdays/${matchdayId}/matches`;
  const history = useHistory();
  const theme = useTheme();
  const getMatches = async () => {
    setIsLoading(true);
    const q = query(collection(db, collectionName), where("matchdayId", "==", matchdayId));
    const querySnapshot = await getDocs(q);
    const mchds: any[] = [];
    querySnapshot.forEach((doc) => {
      mchds.push({
        ...doc.data() as Object,
      });
    });
    const teams = await getEntities("teams");
    const competitions = await getEntities("competitions");
    setIsLoading(false);
    setMatches(mchds);
    setTeams(teams);
    setCompetitions(competitions);
  };

  const getEntities = async (cname: string) => {
    const q = query(collection(db, cname), orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);
    const entities: any[] = [];
    querySnapshot.forEach((doc) => {
      entities.push({
        ...doc.data() as Object,
      });
    });
    return entities;
  };

  useEffect(() => {
    getMatches();
  }, []);

  const handleSave = async () => {
    if (currentSelectedMatch &&
      currentEditedMatch &&
      currentEditedMatch.homeTeamId &&
      currentEditedMatch.awayTeamId &&
      currentEditedMatch.competitionId &&
      currentEditedMatch.kickOffDate &&
      currentEditedMatch.stage !== undefined) {
      const matchdayRef = doc(db, collectionName, currentSelectedMatch.id);
      const unsubscribe = onSnapshot(doc(db, collectionName, matchdayRef.id), (doc) => {
        const matchday = doc.data();
        if (!matchday) { return; }
        const newTeams = matches.map(i => i.id === matchday.id ? matchday : i);
        setMatches(newTeams);
        unsubscribe();
      });
      await updateDoc(matchdayRef, {
        awayTeamAvatar: currentEditedMatch.awayTeamAvatar,
        awayTeamGoals: currentEditedMatch.awayTeamGoals,
        awayTeamName: currentEditedMatch.awayTeamName,
        awayTeamId: currentEditedMatch.awayTeamId,
        competitionAvatar: currentEditedMatch.competitionAvatar,
        competitionName: currentEditedMatch.competitionName,
        competitionId: currentEditedMatch.competitionId,
        homeTeamAvatar: currentEditedMatch.homeTeamAvatar,
        homeTeamGoals: currentEditedMatch.homeTeamGoals,
        homeTeamName: currentEditedMatch.homeTeamName,
        homeTeamId: currentEditedMatch.homeTeamId,
        kickOffDate: currentEditedMatch.kickOffDate,
        stage: currentEditedMatch.stage,
      });
    } else {
      if (!currentEditedMatch ||
        !currentEditedMatch.stage ||
        !currentEditedMatch.kickOffDate ||
        !currentEditedMatch.homeTeamId ||
        !currentEditedMatch.awayTeamId ||
        !currentEditedMatch.competitionId
      ) { return; }
      const newTeamRef = doc(collection(db, collectionName));
      const unsubscribe = onSnapshot(doc(db, collectionName, newTeamRef.id), (doc) => {
        const matchday = doc.data();
        if (!matchday) { return; }
        setMatches([...matches, matchday]);
        unsubscribe();
      });
      await setDoc(newTeamRef, {
        awayTeamAvatar: currentEditedMatch.awayTeamAvatar,
        awayTeamGoals: currentEditedMatch.awayTeamGoals,
        awayTeamName: currentEditedMatch.awayTeamName,
        awayTeamId: currentEditedMatch.awayTeamId,
        competitionAvatar: currentEditedMatch.competitionAvatar,
        competitionName: currentEditedMatch.competitionName,
        competitionId: currentEditedMatch.competitionId,
        homeTeamAvatar: currentEditedMatch.homeTeamAvatar,
        homeTeamGoals: currentEditedMatch.homeTeamGoals,
        homeTeamName: currentEditedMatch.homeTeamName,
        homeTeamId: currentEditedMatch.homeTeamId,
        kickOffDate: currentEditedMatch.kickOffDate,
        stage: currentEditedMatch.stage,
        matchdayId,
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

  const handleOpen = async () => {
    setCurrentEditedMatch({
      awayTeamAvatar: "",
      awayTeamGoals: -1,
      awayTeamName: "",
      awayTeamId: "",
      competitionAvatar: "",
      competitionName: "",
      competitionId: "",
      homeTeamAvatar: "",
      homeTeamGoals: -1,
      homeTeamName: "",
      homeTeamId: "",
      isFinished: false,
      kickOffDate: "",
      matchdayId,
      stage: "",
    });
    setIsMatchModalOpen(true);
  }

  const handleOpenWithEdit = (item: any) => () => {
    setCurrentSelectedMatch(item);
    setCurrentEditedMatch({
      ...item,
      id: undefined,
    });
    setIsMatchModalOpen(true);
  }

  const handleKickOffDateChange = (e: any) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      kickOffDate: Timestamp.fromDate(new Date(e.target.value)),
    });
  }

  const handleStageChange = (e: any) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      stage: e.target.value,
    });
  }

  const handleGoBack = () => {
    history.goBack();
  }

  const handleCompetitionChange = (e: any, value: IEntitySelectOption) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      competitionId: value.id,
      competitionAvatar: value.avatar,
      competitionName: value.name,
    })
  }

  const handleHomeTeamChange = (e: any, value: IEntitySelectOption) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      homeTeamId: value.id,
      homeTeamAvatar: value.avatar,
      homeTeamName: value.name,
    })
  }
  const handleAwayTeamChange = (e: any, value: IEntitySelectOption) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      awayTeamId: value.id,
      awayTeamAvatar: value.avatar,
      awayTeamName: value.name,
    })
  }

  const handleHomeTeamGaolsChange = (value: number) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      homeTeamGoals: value,
    })
  }

  const handleAwayTeamGaolsChange = (value: number) => {
    setCurrentEditedMatch({
      ...currentEditedMatch,
      awayTeamGoals: value,
    })
  }

  const renderMatches = () => {
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
            flexDirection: "column",
          }}
        >
          <Outlet
            sx={{
              fontSize: 80,
              mb: 1,
            }}
          />
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
                label={`${item.homeTeamName} vs ${item.awayTeamName}`}
                disabled={item.isFinished}
                color={item.isArchived ? "default" : "primary"}
                onClick={handleOpenWithEdit(item)}
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
            sx={{
              color: "divider",
              borderBottom: "1px solid",
              minHeight: "59px",
              display: "flex",
              alignItems: "center",
              background: transparentize(theme.palette.background.default, 0.8),
            }}
          >
            <IconButton
              color="default"
              size="small"
              onClick={handleGoBack}
              sx={{
                mr: 1,
                ml: -1,
              }}
            >
              <ArrowBack/>
            </IconButton>
            <Typography variant="h6" component="h2" color="text.primary">
              <Dictionary
                label="matchdayMatches"
                values={{
                  matchdayName: (
                    <Typography
                      component="span"
                      variant="h6"
                      color="text.secondary"
                    >
                      {matchdayName}
                    </Typography>
                  )
                }}
              />
            </Typography>
            <IconButton
              color="default"
              size="small"
              onClick={handleOpen}
              sx={{
                ml: "auto",
              }}
            >
              <AddRounded/>
            </IconButton>
          </Box>
        </StickyBar>
        <Box
          pt="58px"
        >
          <List component="nav" >
            {renderMatches()}
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
            values={currentSelectedMatch ? { entity: `${currentSelectedMatch?.homeTeamName} vs ${currentSelectedMatch?.awayTeamName}` } : undefined}
          />
        </DialogTitle>
        <DialogContent
          sx={{ width: 600 }}
        >
          <Autocomplete
            options={competitions}
            autoHighlight
            color="secondary"
            getOptionLabel={(option: IEntitySelectOption) => option.name}
            value={competitions.find(i => i.id === currentEditedMatch?.competitionId)}
            onChange={handleCompetitionChange}
            renderOption={(p, option) => (
              <Box component="li" sx={{ }} {...p}>
                <Avatar src={EntityImagesMap.competition.find(i => i.id === option.avatar)!.img} sx={{ p: 0.5 }}/>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                color="secondary"
                label={props.intl.formatMessage(messages.competition)}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Autocomplete
            options={teams}
            autoHighlight
            color="secondary"
            getOptionLabel={(option: IEntitySelectOption) => option.name}
            value={teams.find(i => i.id === currentEditedMatch?.homeTeamId)}
            onChange={handleHomeTeamChange}
            renderOption={(p, option) => (
              <Box component="li" sx={{ }} {...p}>
                <Avatar src={EntityImagesMap.team.find(i => i.id === option.avatar)!.img} sx={{ mr: 1, borderRadius: 0 }}/>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                color="secondary"
                label={props.intl.formatMessage(messages.homeTeam)}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Autocomplete
            options={teams}
            autoHighlight
            color="secondary"
            getOptionLabel={(option: IEntitySelectOption) => option.name}
            value={teams.find(i => i.id === currentEditedMatch?.awayTeamId)}
            onChange={handleAwayTeamChange}
            renderOption={(p, option) => (
              <Box component="li" sx={{ }} {...p}>
                <Avatar src={EntityImagesMap.team.find(i => i.id === option.avatar)!.img} sx={{ mr: 1, borderRadius: 0 }}/>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                color="secondary"
                label={props.intl.formatMessage(messages.awayTeam)}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <TextField
            sx={{ display: "flex" }}
            margin="normal"
            type="datetime-local"
            label={props.intl.formatMessage(messages.kickOffDate)}
            value={(currentEditedMatch?.kickOffDate ?
              currentEditedMatch?.kickOffDate.toDate().toISOString() :
              "").slice(0, 16)
            }
            variant="outlined"
            color="secondary"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleKickOffDateChange}
          />
          <NumberInput
            label={props.intl.formatMessage(messages.homeTeamGoals)}
            onChange={handleHomeTeamGaolsChange}
            value={currentEditedMatch?.homeTeamGoals || 0}
          />
          <NumberInput
            label={props.intl.formatMessage(messages.awayTeamGoals)}
            onChange={handleAwayTeamGaolsChange}
            value={currentEditedMatch?.awayTeamGoals || 0}
          />
          <TextField
            sx={{ display: "flex" }}
            margin="normal"
            label={props.intl.formatMessage(messages.stage)}
            onChange={handleStageChange}
            value={currentEditedMatch?.stage || ""}
            type="text"
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
            <Dictionary label={currentSelectedMatch ? "update" : "create"}/>
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationPrompt
        isOpen={isDeletePromptOpen}
        onClose={handleDeletePromptClose}
        onConfirm={handleDelete}
        titleLabel="deleteEntityPromptTitle"
        titleValues={{ entity: `${currentSelectedMatch?.homeTeamName} vs ${currentSelectedMatch?.awayTeamName}` }}
        descriptionLabel="deleteEntityPromptDescription"
        descriptionValues={{ entity: `${currentSelectedMatch?.homeTeamName} vs ${currentSelectedMatch?.awayTeamName}` }}
      />
    </PageWrapper>
  );
}

// @ts-ignore:next-line
export default injectIntl(Matchday);