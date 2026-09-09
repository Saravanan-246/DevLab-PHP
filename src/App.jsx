import React, { useEffect, useState, useCallback } from "react";

import Landing from "./pages/Landing";
import Programs from "./pages/Programs";
import ProgramView from "./pages/ProgramView";

import phpPrograms from "./data/programs";
import androidPrograms from "./data/androidPrograms";

const allPrograms = [...phpPrograms, ...androidPrograms];

function App() {
  const [page, setPage] = useState("landing");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activeCategory, setActiveCategory] = useState("PHP");

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("devlab-theme");
    return savedTheme === "light" ? "light" : "dark";
  });

  // Keep theme attribute synchronized on root document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("devlab-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Directory navigation with category target
  const openPrograms = useCallback((category = "ALL") => {
    const targetCat = category === "ALL" ? "PHP" : category;
    setActiveCategory(targetCat);
    setSelectedProgram(null);
    setPage("programs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Practical view navigation
  const openProgram = useCallback((programId) => {
    const program = allPrograms.find(
      (item) =>
        String(item.id) === String(programId) ||
        String(item.number) === String(programId)
    );

    if (!program) return;

    setSelectedProgram(program);
    setPage("program");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const backToLanding = useCallback(() => {
    setSelectedProgram(null);
    setPage("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const backToPrograms = useCallback(() => {
    setSelectedProgram(null);
    setPage("programs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Global 'Escape' Key Handler for backwards navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (page === "program") {
          backToPrograms();
        } else if (page === "programs") {
          backToLanding();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page, backToPrograms, backToLanding]);

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
          programs={allPrograms}
          initialCategory={activeCategory}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenProgram={openProgram}
          onClose={backToLanding}
        />
      )}

      {page === "program" && (
        <ProgramView
          programs={allPrograms}
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