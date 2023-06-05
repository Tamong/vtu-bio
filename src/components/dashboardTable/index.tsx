import { userLink, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

type Props = {
  data: userLink[];
};

export const LinkTable: React.FC<Props> = ({ data }) => (
  <DataTable columns={columns} data={data} />
);
