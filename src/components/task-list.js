import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TaskCard from "../components/taskCard";
import AddTaskModal from "./tasks/addTaskModel";

const TaskList = ({
  selectedCategories = [],
  selectedPriorities = [],
  activeTab,
  searchQuery = "",
}) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const userId = localStorage.getItem("userId");

        const userSpecificTasks = storedTasks.filter(
          (task) => task.userId === userId
        );
        setTasks(userSpecificTasks);
        console.log("Cards data from localStorage:", userSpecificTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []); 

  useEffect(() => {
    const applyFilters = () => {
      const filtered = tasks.filter((task) => {
        const matchesTab =
          activeTab === 0 ||
          (activeTab === 1 &&
            (task.status === "Pending" || task.status === "In Progress")) ||
          (activeTab === 2 && task.status === "Completed");

        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(task.category);

        const matchesPriority =
          selectedPriorities.length === 0 || selectedPriorities.includes(task.priority);

        const matchesSearchQuery =
          searchQuery.trim() === "" || task.task.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesCategory && matchesPriority && matchesSearchQuery;
      });

      setFilteredTasks(filtered);
    };

    if (tasks.length > 0) {
      applyFilters();
    }
  }, [tasks, activeTab, selectedCategories, selectedPriorities, searchQuery]); 

  const handleEditTask = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
    setEditTask(null);
  };

  const handleAddTask = () => {
    setEditTask(null);
    setIsModalOpen(true);
  };

  const handleUpdateTaskStatus = (taskIndex, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].status = newStatus;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {filteredTasks.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ width: "100%" }}>
          No tasks found for the selected filters.
        </Typography>
      ) : (
        filteredTasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onEditTask={() => handleEditTask(task)}
            onDeleteTask={(taskIndex) => {
              const updatedTasks = tasks.filter((_, i) => i !== taskIndex);
              setTasks(updatedTasks);
              localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            }}
            onTaskCompletionToggle={(taskIndex) => {
              const updatedTasks = [...tasks];
              updatedTasks[taskIndex].status =
                updatedTasks[taskIndex].status === "Completed" ? "Pending" : "Completed";
              setTasks(updatedTasks);
              localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            }}
            onUpdateTaskStatus={handleUpdateTaskStatus} // Pass the status update function here
          />
        ))
      )}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTask={editTask}
        onSave={handleSaveTask}
      />
    </Box>
  );
};

export default TaskList;
