import { useQuery } from "react-query";
import axios from "axios";
import type { Data } from "./types";
import ProjectTable from "./components/ProjectTable/ProjectTable";
import Header from "./components/Header/Header";

function App() {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const data: Data = await axios.get("http://localhost:3000/projects");
      return data;
    },
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
        <Header />
        <ProjectTable projects={data?.data.projects} />
    </>
  );
}

export default App;
