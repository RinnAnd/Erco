import { FC } from "react";
import { Project } from "../../types";

interface SingleProjectProps {
  project: Project;
}

const SingleProject: FC<SingleProjectProps> = ({project}) => {
  return <div>
    <h3>{project.system_name}</h3>
    <h4>{project.location}</h4>
  </div>;
};

export default SingleProject;
