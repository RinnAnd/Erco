import { FC, useState } from "react";
import { useMutation } from "react-query";
import { Project } from "../../types";
import axios from "axios";
import "./Form.css";
import Loader from "../Loader/Loader";

interface FormProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: FC<FormProps> = ({ setModal }) => {
  const [info, setInfo] = useState<Omit<Project, "system_id">>({
    system_name: "",
    location: "",
    inverter_brand: "",
    panel_brand: "",
    panel_power: 0,
    panel_quantity: 0,
    installed_power: 0,
    current_generation: 0,
    total_generation: 0,
  });

  //IMPORTANT! Add validations for the possible data being sent
  //FIX CSS For creation panel

  const createProject = async (data: Omit<Project, "system_id">) => {
    const { data: response } = await axios.post(
      "http://localhost:3000/projects",
      { data: data }
    );
    return response.data;
  };

  const { mutate, isLoading } = useMutation(createProject, {
    onSuccess: (data) => {
      console.log(data);
      const message = "Project created successfully";
      alert(message);
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const handleSubmit = () => {
    const data = {
      ...info,
    };
    mutate(data);
    setInfo({
      system_name: "",
      location: "",
      inverter_brand: "",
      panel_brand: "",
      panel_power: 0,
      panel_quantity: 0,
      installed_power: 0,
      current_generation: 0,
      total_generation: 0,
    });
  };

  return (
    <>
      <div className="overlay" onClick={() => setModal(false)}></div>
      <div className="form">
        <h2>Create a new project</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              System name:
              <input
                type="text"
                value={info.system_name}
                onChange={(e) =>
                  setInfo({ ...info, system_name: e.target.value })
                }
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={info.location}
                onChange={(e) => setInfo({ ...info, location: e.target.value })}
              />
            </label>
            <label>
              Inverter brand:
              <input
                type="text"
                value={info.inverter_brand}
                onChange={(e) =>
                  setInfo({ ...info, inverter_brand: e.target.value })
                }
              />
            </label>
            <label>
              Panel brand:
              <input
                type="text"
                value={info.panel_brand}
                onChange={(e) =>
                  setInfo({ ...info, panel_brand: e.target.value })
                }
              />
            </label>
            <label>
              Panel power:
              <input
                type="number"
                value={info.panel_power}
                onChange={(e) =>
                  setInfo({ ...info, panel_power: Number(e.target.value) })
                }
              />
            </label>
            <label>
              Panel quantity:
              <input
                type="number"
                value={info.panel_quantity}
                onChange={(e) =>
                  setInfo({ ...info, panel_quantity: Number(e.target.value) })
                }
              />
            </label>
            <label>
              Installed power:
              <input
                type="number"
                value={info.installed_power}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    installed_power: Number(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Current generation:
              <input
                type="number"
                value={info.current_generation}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    current_generation: Number(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Total generation:
              <input
                type="number"
                value={info.total_generation}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    total_generation: Number(e.target.value),
                  })
                }
              />
            </label>
            <button type="submit">Create</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Form;
