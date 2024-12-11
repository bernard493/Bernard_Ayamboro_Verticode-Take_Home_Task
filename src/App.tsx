import { useState } from "react";
import { IProject } from "./models/Project";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";

export default function App() {
  const [project, setProject] = useState<IProject | null>(null);

  const handleFormSubmit = (project: IProject) => {
    // handle form submission
    setProject({
      ...project,
      status: project.status || "Not Started",
    });
  };

  return (
    <main className="flex flex-col">
      <header className="flex h-24 bg-light-green">
        <img src="/logo.png" height={64} className="h-16 m-auto" />
      </header>
      <section className="flex flex-grow items-center justify-center  pt-10">
        {!project ? (
          <ProjectForm handleFormSubmit={handleFormSubmit} />
        ) : (
          <ProjectDetails project={project} />
        )}
      </section>
    </main>
  );
}
