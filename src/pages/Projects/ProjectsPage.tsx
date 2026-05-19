import { memo } from "react";
import { Projects } from "./Projects";

const ProjectsPage = memo(() => {
  return (
    <div className="w-full min-h-screen bg-bg-primary transition-colors duration-500 overflow-x-hidden pt-24 md:pt-28 pb-16">
      <Projects isHome={false} />
    </div>
  );
});

export default ProjectsPage;
