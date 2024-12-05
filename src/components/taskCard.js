import React, { useState, useContext } from "react";
import {
  Card,
  CardActions,
  Box,
  CardContent,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationDialog from "../layouts/comfirmDialog.js";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddSubtaskDialog from "./tasks/AddSubTaskModel.js";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Progess from "../assets/images/progress.png";
import ThemeContext from "../theme/ThemeContex.js";


const TaskCard = ({ task, index, onEditTask, onDeleteTask, onUpdateTaskStatus }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [subtaskDialogOpen, setSubtaskDialogOpen] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleDeleteClick = () => setConfirmOpen(true);

  const handleConfirmDelete = () => {
    setConfirmOpen(false);
    onDeleteTask(index);
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const getProgressValue = () => {
    if (task.status === "Pending") return 0;
    if (task.status === "In Progress") return 50;
    if (task.status === "Completed") return 100;
    return 0;
  };

  const isOverdue = () => {
    const currentDate = new Date();
    const dueDate = new Date(task.DueDate);
    return currentDate > dueDate && task.status !== "Completed";
  };

  const handleStatusChange = (newStatus) => {
    onUpdateTaskStatus(index, newStatus);
    setAnchorEl(null);
  };


  return (
    <Box sx={{ p: "1ch" }} className={`${theme}`}>
      <Card className={`card-container ${theme}`} sx={{maxWidth:'38ch'}}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-color-black" >
            <b>{task.task}</b>
          </Typography>
          <Typography variant="body2" className="text-color-black">
            <p>{task.description}</p>
          </Typography>
          <Box sx={{ display: "flex", gap: 6 }}>
            <Typography
              variant="body2"
              className={
                task.status === "Pending"
                  ? "status-pending"
                  : task.status === "In Progress"
                    ? "status-in-progress"
                    : "status-completed"
              }
            >
              {task.status}
            </Typography>
            <Typography
              variant="body2"
              className={
                task.priority === "High"
                  ? "priority-high"
                  : task.priority === "Medium"
                    ? "priority-medium"
                    : "priority-low"
              }
            >
              {task.priority}
            </Typography>
            <Typography variant="body2" className="text-color-black">
              {task.category}
            </Typography>
          </Box>
          <Typography variant="body2" className="text-color-black">
            Created on: {task.date}
          </Typography>
          <Typography
            variant="body2"
            className={`text-color-black ${isOverdue() ? "overdue" : ""}`}
          >
            Due Date: {task.DueDate}
          </Typography>

          <div className="progress">
            <div
              className="progress-bar"
              style={{
                width: `${getProgressValue()}%`}}
              aria-valuemax="100"
              aria-valuenow={getProgressValue()}
            >
              {`${getProgressValue()}%`}
            </div>
          </div>

        </CardContent>

        <CardActions >
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon className="menu-icon" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} className="card-actions">
            <MenuItem onClick={() => handleStatusChange("Pending")}>
              <ListItemIcon>
                <AccessTimeFilledIcon />
              </ListItemIcon>
              <Typography> Pending</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("In Progress")}>
              <ListItemIcon>
                <img src={Progess} height={25} width={25} alt="Progress" />
              </ListItemIcon>
              <Typography> In Progress</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("Completed")}>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <Typography> Completed</Typography>
            </MenuItem>
          </Menu>
          <IconButton onClick={() => setSubtaskDialogOpen(true)} className="menu-icon">
            <AddCircleIcon />
          </IconButton>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              className="add-task-button"
              startIcon={<EditIcon />}
              onClick={() => onEditTask(index)}
            >
              <b>Edit</b>
            </Button>
            <Button
              variant="outlined"
              className="add-task-button"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
            >
              <b>Delete</b>
            </Button>
          </Box>
        </CardActions>
      </Card>

      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      <AddSubtaskDialog
        open={subtaskDialogOpen}
        onClose={() => setSubtaskDialogOpen(false)}
        onAddSubtask={setSubtasks}
        initialSubtasks={subtasks}
      />
    </Box>
  );
};

export default TaskCard;
