import { useQuery } from "react-query";
import axios from "axios";
import type { Data } from "./types";
import ProjectTable from "./components/ProjectTable/ProjectTable";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Form from "./components/Form/Form";
import { useState } from "react";

function App() {
  const [modal, setModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const data: Data = await axios.get("http://localhost:3000/projects");
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      {modal ? <Form setModal={setModal} /> : <></>}
      <button onClick={() => setModal(true)}>Add project</button>
      <ProjectTable projects={data?.data.projects} />
    </>
  );
}

export default App;
