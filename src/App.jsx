import React, { useEffect, useState } from "react";

import Landing from "./pages/Landing";
import Programs from "./pages/Programs";
import ProgramView from "./pages/ProgramView";

import programs from "./data/programs";

function App() {
  const [page, setPage] = useState("landing");
  const [selectedProgram, setSelectedProgram] = useState(null);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("php-lab-theme");
    return savedTheme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("php-lab-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const openPrograms = () => {
    setSelectedProgram(null);
    setPage("programs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProgram = (programId) => {
    const program = programs.find(
      (item) =>
        String(item.id) === String(programId) ||
        String(item.number) === String(programId)
    );

    if (!program) return;

    setSelectedProgram(program);
    setPage("program");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToLanding = () => {
    setSelectedProgram(null);
    setPage("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToPrograms = () => {
    setSelectedProgram(null);
    setPage("programs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      {page === "landing" && (
        <Landing
          theme={theme}
          onToggleTheme={toggleTheme}
          onExplore={openPrograms}
        />
      )}

      {page === "programs" && (
        <Programs
          programs={programs}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenProgram={openProgram}
          onClose={backToLanding}
        />
      )}

      {page === "program" && (
        <ProgramView
          programs={programs}
          selectedProgram={selectedProgram}
          theme={theme}
          onToggleTheme={toggleTheme}
          onSelectProgram={openProgram}
          onClose={backToPrograms}
        />
      )}
    </div>
  );
}

export default App;