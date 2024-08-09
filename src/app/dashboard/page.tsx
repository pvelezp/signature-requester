import axios from "@/api/instance.client";
import Header from "@/components/ui/header/header";
import AddIncidence from "./components/add-incidence";
import { Incidence, columns } from "./components/columns";
import { DataTable } from "./components/table";

async function fetchData(): Promise<Incidence[]> {
  try {
    const response = await axios.get<Incidence[]>(
      `boards/66ace05a85708be4d545cc2d/cards`
    );
    return response.data;
  } catch (error) {
    return [];
  }
}

const Dashboard = async () => {
  const initialData = await fetchData();

  return (
    <>
      <Header
        title="Tabla de incidencias"
        action={<AddIncidence idList={initialData[0].idList} />}
      />

      <DataTable columns={columns} initialData={initialData} />
    </>
  );
};

export default Dashboard;
