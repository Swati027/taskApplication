import React, { useState, useEffect,useContext } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton, MenuItem, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../../theme/ThemeContex";
const AddTaskModal = ({ isOpen, onClose, initialTask, onSave }) => {
  const { theme } = useContext(ThemeContext);

  const [newTask, setNewTask] = useState({
    task: "",
    description: "",
    status: "Pending",
    date: "",
    DueDate: '',
    category: "",
    priority: "",
    subtasks: [],
  });

  const [errors, setErrors] = useState({
    task: "",
    description: "",
    date: "",
    DueDate: '',
    category: "",
    priority: "",
  });

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState(["Work", "Personal"]);

  useEffect(() => {
    const today = getTodayDate();
    setNewTask((prev) => ({ ...prev, date: today }));
  }, []);


  useEffect(() => {
    if (initialTask) {
      setNewTask(initialTask);
    } else {
      setNewTask({
        id: "",
        task: "",
        category: "",
        priority: "",
        status: "Pending",
        description: "",
        subtasks: ''
      });
    }
  }, [initialTask]);

  const handleSave = () => {
    if (validateFields()) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      const userId = localStorage.getItem("userId");
      const generateId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      };

      const newTaskWithId = { ...newTask, id: generateId(), userId: userId };

      if (initialTask) {
        const updatedTasks = storedTasks.map((task) =>
          task.id === initialTask.id ? { ...task, ...newTask } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      } else {
        storedTasks.push(newTaskWithId);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      }
      toast.success(initialTask ? "Task updated successfully!" : "Task added successfully!", {
        autoClose: 2000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);


      onClose();
      setNewTask({
        task: "",
        description: "",
        status: "Pending",
        date: getTodayDate(),
        DueDate: "",
        category: "",
        priority: "",
        subtasks: [],
      });
      setErrors({});
    }
  };


  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const validateFields = () => {
    const newErrors = {};
    if (!newTask.task.trim()) newErrors.task = "Task name is required.";
    if (!newTask.description.trim()) newErrors.description = "Description is required.";
    if (!newTask.date) newErrors.date = "Date is required.";
    if (!newTask.DueDate) newErrors.DueDate = "Date is required.";
    if (!newTask.category) newErrors.category = "Category is required.";
    if (!newTask.priority) newErrors.priority = "Priority is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategoriesList((prev) => [...prev, newCategory]);
      setNewCategory("");
      setOpenCategoryModal(false);
    }
  };

  const handleCancel = () => {
    onClose();
    setErrors({ task: "", description: "", date: "", DueDate: "", category: "", priority: "" });
    setNewTask({
      task: "",
      description: "",
      status: "Pending",
      date: getTodayDate(),
      DueDate: "",
      category: "",
      priority: "",
      subtasks: [],
    });
  };


  return (
    <>
          <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ background: "green", color: "white", minHeight: "50px" }}
                theme="#F5F5FC"
            />
 

      <Modal open={isOpen} onClose={onClose} aria-labelledby="add-task-modal" 
      aria-describedby="add-task-description" className={`${theme}`}>
        <Box className="modal-container">
          <Box className="box-container" sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}>
            <Typography variant="h6" component="h2">
              {initialTask ? "Edit Task" : "Add New Task"}
            </Typography>
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            className="textfield-blue"
            label="Task"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            error={!!errors.task}
            helperText={errors.task}
            sx={{ mb: 2 }}
            InputProps={{
              style: { color: theme === "dark" ? "#fff" : "#000" }, 
            }}
          />
          <TextField
            fullWidth
            multiline
            className="textfield-blue"
            label="Description"
            value={newTask.description}
            onChange={(e) => {
              setNewTask({ ...newTask, description: e.target.value });
              if (errors.description) setErrors({ ...errors, description: "" });
            }}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ mb: 2 }}
            InputProps={{
              style: { color: theme === "dark" ? "#fff" : "#000" }, 
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <span>Created Date</span>
              <TextField
                fullWidth    className="textfield-blue"
                type="date"
                value={newTask.date}
                onChange={(e) => {
                  setNewTask({ ...newTask, date: e.target.value });
                  if (errors.date) setErrors({ ...errors, date: "" });
                }}
                error={!!errors.date}
                helperText={errors.date}
                sx={{ mb: 2 }}
                inputProps={{ min: getTodayDate() }}
                InputProps={{
                  style: { color: theme === "dark" ? "#fff" : "#000" }, 
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <span> Due Date</span>
              <TextField
                fullWidth
                type="date"
                value={newTask.DueDate}
                className="textfield-blue"
                onChange={(e) => {
                  setNewTask({ ...newTask, DueDate: e.target.value });
                  if (errors.DueDate) setErrors({ ...errors, DueDate: "" });
                }}
                error={!!errors.DueDate}
                helperText={errors.DueDate}
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: theme === "dark" ? "#fff" : "#000" }, 
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                select
                label="Priority"
                value={newTask.priority}
                className="textfield-blue"
                onChange={(e) => {
                  setNewTask({ ...newTask, priority: e.target.value });
                  if (errors.priority) setErrors({ ...errors, priority: "" });
                }}
                fullWidth
                error={!!errors.priority}
                helperText={errors.priority || " "}
                InputProps={{
                  style: { color: theme === "dark" ? "#fff" : "#000" }, 
                }}
              >
                {["High", "Medium", "Low"].map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </TextField>

            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                label="Category"
                className="textfield-blue"
                value={newTask.category}
                onChange={(e) => {
                  setNewTask({ ...newTask, category: e.target.value });
                  if (errors.category) setErrors({ ...errors, category: "" });
                }}
                fullWidth
                error={!!errors.category}
                helperText={errors.category || " "}
                InputProps={{
                  style: { color: theme === "dark" ? "#fff" : "#000" }, 
                }}
              >
                {categoriesList.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Button variant="outlined" className="add-task-button" onClick={handleSave}>
            {initialTask ? "Update Task" : "Add Task"}
          </Button>
          <Button variant="outlined" className="add-task-button" sx={{ ml: 1 }} onClick={() => setOpenCategoryModal(true)}>
            Add Category
          </Button>

          <Modal open={openCategoryModal} onClose={() => setOpenCategoryModal(false)}>
            <Box className="modal-container">
              <Box className="box-container" sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}>
                <Typography variant="h6" component="h2">
                  Add Category
                </Typography>
                <IconButton onClick={() => setOpenCategoryModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                size="small"
                 className="textfield-blue"
                label="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  style: { color: theme === "dark" ? "#fff" : "#000" }, 
                }}
              />
              <Button variant="outlined" className="add-task-button" onClick={handleAddCategory}>
                Add Category
              </Button>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </>
  );
};

export default AddTaskModal;
