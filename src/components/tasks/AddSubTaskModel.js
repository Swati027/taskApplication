import React, { useState, useEffect, useContext } from "react";
import { IconButton, Typography, Box, Modal, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThemeContext from "../../theme/ThemeContex";

const LOCAL_STORAGE_KEY = "subtasks"; 

const AddSubtaskDialog = ({ open, onClose, onAddSubtask, selectedCardId }) => {
    const [subtasks, setSubtasks] = useState([]);
    const [newSubtask, setNewSubtask] = useState("");
    const [isEditingIndex, setIsEditingIndex] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const savedSubtasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        const cardSubtasks = savedSubtasks[selectedCardId] || [];
        setSubtasks(cardSubtasks);
    }, [selectedCardId]);

    const saveSubtasksToLocalStorage = (subtasks) => {
        const savedSubtasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        savedSubtasks[selectedCardId] = subtasks;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedSubtasks));
    };

    const handleAddField = () => {
        if (newSubtask.trim()) {
            if (isEditingIndex !== null) {
                const updatedSubtasks = [...subtasks];
                updatedSubtasks[isEditingIndex] = newSubtask.trim();
                setSubtasks(updatedSubtasks);
                saveSubtasksToLocalStorage(updatedSubtasks);
                setIsEditingIndex(null);
            } else {
                const updatedSubtasks = [...subtasks, newSubtask.trim()];
                setSubtasks(updatedSubtasks);
                saveSubtasksToLocalStorage(updatedSubtasks);
            }
            setNewSubtask("");
        }
    };

    const handleRemoveField = (index) => {
        const updatedSubtasks = subtasks.filter((_, i) => i !== index);
        setSubtasks(updatedSubtasks);
        saveSubtasksToLocalStorage(updatedSubtasks);
    };

    const handleEditField = (index) => {
        setNewSubtask(subtasks[index]);
        setIsEditingIndex(index);
    };

    const handleSaveSubtasks = () => {
        const validSubtasks = subtasks.filter((subtask) => subtask.trim() !== "");
        if (validSubtasks.length > 0) {
            onAddSubtask(validSubtasks);
            setSubtasks(validSubtasks);
            saveSubtasksToLocalStorage(validSubtasks);
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose} className={`${theme}`}>
            <Box className="modal-container">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Subtasks</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Add Subtask
                    </Typography>
                    <TextField
                        fullWidth
                        size="small"
                        value={newSubtask}
                        className="textfield-blue"
                        onChange={(e) => setNewSubtask(e.target.value)}
                        label="Add Subtask"
                        sx={{ mb: 2 }}
                        InputProps={{
                            style: { color: theme === "dark" ? "#fff" : "#000" },
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mb: 2, width: "100%" }}
                        onClick={handleAddField}
                    >
                        {isEditingIndex !== null ? "Update" : "ADD"}
                    </Button>
                    <Box>
                        {subtasks.map((subtask, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={subtask}
                                    className="textfield-blue"
                                    InputProps={{
                                        style: { color: theme === "dark" ? "#fff" : "#000" },
                                    }}
                                    onChange={(event) =>
                                        setSubtasks((prev) => {
                                            const updated = [...prev];
                                            updated[index] = event.target.value;
                                            saveSubtasksToLocalStorage(updated);
                                            return updated;
                                        })
                                    }
                                    sx={{ flexGrow: 1, mr: 1 }}
                                />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleRemoveField(index)}
                                    sx={{ ml: 1 }}
                                >
                                    <Typography sx={{ fontWeight: "bold" }}>Delete</Typography>
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleEditField(index)}
                                    sx={{ ml: 1 }}
                                >
                                    <Typography sx={{ fontWeight: "bold" }}>Edit</Typography>
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Button
                    variant="outlined"
                    className="add-task-button"
                    sx={{ mt: 3, width: "100%" }}
                    onClick={handleSaveSubtasks}
                >
                    Save Subtasks
                </Button>
            </Box>
        </Modal>
    );
};

export default AddSubtaskDialog;
