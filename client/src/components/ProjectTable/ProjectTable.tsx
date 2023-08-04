import { FC, FormEvent, useState } from "react";
import "./ProjectTable.css";
import { Project, type Projects } from "../../types";
import SingleProject from "../SingleProject/SingleProject";

interface ProjectTableProps {
  projects: Projects | undefined;
}

const ProjectTable: FC<ProjectTableProps> = ({ projects }) => {
  const [visibleProject, setVisibleProject] = useState<Project | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  
  

  function showProject(project: Project) {
    setVisibleProject({ ...project });
  }

  function findProject(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let projectToFind = projects?.filter(pr => pr.system_name.toLowerCase().includes(input.toLowerCase()))
    if (projectToFind && projectToFind[0]) {
      showProject(projectToFind[0])
    } else {
      setError(true)
    }
  }

  return (
    <section className="table_section">
      <form onSubmit={(e) => findProject(e)} className="search_form">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Find Project</button>
        {error ? <div onClick={() => setError(false)}>Project not found</div> : <></>}
      </form>
      {visibleProject ? (
        <SingleProject project={visibleProject} setter={setVisibleProject} />
      ) : (
        <></>
      )}
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
              <th className="project_name" onClick={() => showProject(prj)}>
                {prj.system_name}
              </th>
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
