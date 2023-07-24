import React from "react";
import { Typography } from "@mui/material";
import ProjectCard from "../Components/Cards/ProjectCard"; // Import the project card component
import Header from "./Header";
function RunningProjectsPage() {
  // Mock data for running projects
  const runningProjects = [
    {
      id: 1,
      title: "Project 1",
      description: "Description of Project 1",
      investors: "10",
      amount: "234MATIC",
      profit: "500MATIC",
      status: "Running",
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description of Project 2",
      investors: "78",
      amount: "2334MATIC",
      profit: "600MATIC",
      status: "Closed",
    },
    // Add more running projects data
  ];

  return (
    <>
      <Header />
      <div style={{ marginTop: "70px" }}>
        <Typography
          variant="h4"
          style={{ fontSize: "24px", fontWeight: "200px", color: "#066e6e" }}
        >
          Running Projects
        </Typography>
        {runningProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default RunningProjectsPage;
