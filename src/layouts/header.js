import React, { useState, useEffect, useContext } from "react";
import {
  Box, AppBar, Tabs, Tab, Button, Toolbar,
  IconButton, Typography,
  Divider
} from "@mui/material";
import { Menu, MenuItem } from "@mui/material";
import AddTaskModal from "../components/tasks/addTaskModel";
import { useNavigate, Link } from "react-router-dom";
import TaskList from "../components/task-list";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Filter from "../components/filter";
import Footer from "./footer";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import ThemeContext from "../theme/ThemeContex";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [fullName, setUserName] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#0f7bed ',
    border: '1px solid #0f7bed ',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const token = localStorage.getItem("token");

    if (token) {
      const loggedUser = users.find((user) =>
        token.includes(user.email)
      );
      setUserName(loggedUser ? loggedUser.fullName : "Guest");
      setEmail(loggedUser ? loggedUser.email : "Guest");

    }
  }, []);
  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      navigate("/all-tasks");
    } else if (newValue === 1) {
      navigate("/pending-tasks");
    } else if (newValue === 2) {
      navigate("/completed-tasks");
    }
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} className={`${theme}`}>
      <AppBar position="fixed" className="appbar-header">
        <Toolbar
          sx={{ justifyContent: "space-between", alignItems: "center", px: 2 }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="#fff"
            indicatorColor="warning"
            sx={{
              "& .MuiTab-root": { fontWeight: "bold" },
              "& .Mui-selected": { backgroundColor: "#FFF", m: "5px", color:'#0f7bed '},
            }}
          >
            <Tab label="All Tasks" />
            <Tab label="Pending Tasks" />
            <Tab label="Completed Tasks" />
          </Tabs>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {theme === "light" ? <LightModeOutlinedIcon /> : <ModeNightIcon />}
            </IconButton>
            <IconButton edge="end" color="inherit" onClick={handleClick}>
              <AccountCircle sx={{ height: "4ch", width: "4ch" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "Bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "Bottom",
                horizontal: "Left",
              }}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: 1,
                  border: '1px solid orange',
                  mt: 5,
                  minWidth: 200,
                },
              }}

            >
              <MenuItem>
              <AccountCircle sx={{ height: "4ch", width: "4ch", color:'grey'}} />
              {fullName}   
                 </MenuItem>
                 <Divider></Divider>
              <MenuItem >
                <Typography variant="body1">{email}</Typography>
              </MenuItem>
              <MenuItem >
                <LogoutIcon sx={{ mr: '1ch' }} />
                <Typography variant="body1"><Link to="/"
                  style={{ textDecoration: "none", color: 'black' }}
                  tabIndex={0} >Logout</Link></Typography>
              </MenuItem>
            </Menu>
            <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold" }}>
              {fullName}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
    className="invisible-scrollbar"
    sx={{
      flex: 1,
      overflowY: "auto",
      mt: "73px",
      mb: "6px", 
    }}
  >      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <Search sx={{ marginRight: 2 }} >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            label="Search"
            value={searchQuery} sx={{ height: '5ch' }}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button
          sx={{ marginRight: 2 }}
          className="add-task-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add Task
        </Button>

        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ToggleButton
            value="left"
            aria-label="right aligned"
            onClick={handleFilterToggle}
            className="add-task-button"

          >
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <Filter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(categories, priorities) => {
          setSelectedCategories(categories || []);
          setSelectedPriorities(priorities || []);
          setIsFilterOpen(false);
        }}
      />

      <TaskList
        activeTab={activeTab}
        selectedCategories={selectedCategories}
        selectedPriorities={selectedPriorities}
        searchQuery={searchQuery}
      />
      </Box>
      <AddTaskModal isOpen={isModalOpen} onClose={closeTaskModal} />
    <Box className="footer"> 
      <Footer />
        </Box>
     

    </Box>
  );
}

export default Header;
