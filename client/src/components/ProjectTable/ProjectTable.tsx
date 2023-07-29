import { FC, useState } from "react";
import "./ProjectTable.css";
import { Project, type Projects } from "../../types";
import SingleProject from "../SingleProject/SingleProject";

interface ProjectTableProps {
  projects: Projects | undefined;
}

const ProjectTable: FC<ProjectTableProps> = ({ projects }) => {

  const [visibleProject, setVisibleProject] = useState<Project | null>(null)
  
  function showProject(project: Project) {
    setVisibleProject({...project})
  }

  return (
    <section className="table_section">
      {visibleProject ? <SingleProject project={visibleProject} setter={setVisibleProject} /> : <></>}
      <div className="table_container">
        <table>
          <tr className="table_heads">
            <th>Name</th>
            <th>Current Generation</th>
            <th>Total Generation</th>
            <th>Installed power</th>
          </tr>
          {projects?.map((prj) => (
            <tr className="table_body">
              <th className="project_name" onClick={() => showProject(prj)}>{prj.system_name}</th>
              <th>{prj.current_generation}</th>
              <th>{prj.total_generation}</th>
              <th>{prj.installed_power}</th>
            </tr>
          ))}
        </table>
      </div>
    </section>
  );
};

export default ProjectTable;
