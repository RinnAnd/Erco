import { FC } from "react";
import { Project } from "../../types";
import "./SingleProject.css";

interface SingleProjectProps {
  project: Project;
  setter: React.Dispatch<React.SetStateAction<Project | null>>;
}

const SingleProject: FC<SingleProjectProps> = ({ project, setter }) => {
  return (
    <>
      <div className="overlay" onClick={() => setter(null)}></div>
      <div className="window">
        <div className="id">
          <button onClick={() => setter(null)}>X</button>
          <span>
            ID: <p>{project.system_id}</p>
          </span>
        </div>
        <h3>{project.system_name}</h3>
        <div className="data">
          Location: <p>{project.location}</p>
        </div>
        <div className="data">
          Panel Brand: <p>{project.panel_brand}</p>
        </div>
        <div className="data">
          Panel Power: <p>{project.panel_power}</p>
        </div>
        <div className="data">
          Panel Quantity: <p>{project.panel_quantity}</p>
        </div>
        <div className="data">
          Inverter Brand: <p>{project.inverter_brand}</p>
        </div>
        <div className="data">
          Installed Power: <p>{project.installed_power}</p>
        </div>
        <div className="data">
          Current Generation: <p>{project.current_generation}</p>
        </div>
        <div className="data">
          Total Generation: <p>{project.total_generation}</p>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
