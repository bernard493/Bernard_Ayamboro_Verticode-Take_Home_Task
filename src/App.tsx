import { useState } from "react";
import { IProject } from "./models/Project";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";

export default function App() {
  const [project, setProject] = useState<IProject | null>(null);
  const navigate = useNavigate();

  const handleFormSubmit = (project: IProject) => {
    // handle form submission
    setProject({
      ...project,
      status: project.status || "Not Started",
    });
    navigate("/projects");
  };

  const handleUpdateProjectStatus = (
    newStatus: "Not Started" | "In Progress" | "Completed"
  ) => {
    setProject({
      projectName: project?.projectName || "",
      description: project?.description || "",
      startDate: project?.startDate || "",
      status: newStatus,
    });
  };

  return (
    <main className="flex flex-col">
      <header className="flex h-24 bg-light-green">
        <img src="/logo.png" height={64} className="h-16 m-auto sm:h-16 " />
      </header>
      <Routes>
        <Route
          path="/"
          element={<ProjectForm handleFormSubmit={handleFormSubmit} />}
        />
        <Route
          path="/projects"
          element={
            <ProjectDetails
              project={project}
              handleUpdateProjectStatus={handleUpdateProjectStatus}
            />
          }
        />
      </Routes>
    </main>
  );
}
