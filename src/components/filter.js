import React, { useState } from "react";
import {
  Box,
  Button,
  SwipeableDrawer,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const categories = ["Work", "Personal", "Shopping", "Others"];
const priorities = ["High", "Medium", "Low"];

const Filter = ({ isOpen, onClose, onApply}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handlePriorityChange = (priority) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((item) => item !== priority)
        : [...prev, priority]
    );
  };

  const applyFilters = () => {
    onApply(selectedCategories, selectedPriorities);
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      onOpen={() => {}}
    >
      <Box
        sx={{
          width: 250,
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          marginLeft:'2ch'
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <h3>Tasks Filter</h3>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p:'2ch' }}>
          <h5>Category</h5>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </Box>
        <Box sx={{p:'2ch'}}>
          <h5>Priority</h5>
          <FormGroup>
            {priorities.map((priority) => (
              <FormControlLabel
                key={priority}
                control={
                  <Checkbox
                    checked={selectedPriorities.includes(priority)}
                    onChange={() => handlePriorityChange(priority)}
                  />
                }
                label={priority}
              />
            ))}
          </FormGroup>
        </Box>
        <Button
          variant="outlined" className="add-task-button"
          onClick={applyFilters}
          sx={{ mt: "auto" }}
        >
          Apply Filters
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};

export default Filter;
