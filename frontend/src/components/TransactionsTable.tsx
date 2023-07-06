import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ITransaction } from "../api/transactions";
import moment from "moment";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 30 },
  {
    field: "symbol",
    headerName: "Symbol",
    type: "string",
    width: 100,
    valueGetter: (params: GridValueGetterParams) => `${params.row.sourceCurrency} - ${params.row.targetCurrency}`,
  },
  {
    field: "sourceAmount",
    headerName: "Source Amount",
    type: "number",
    width: 120,
  },
  {
    field: "targetAmount",
    headerName: "Target Amount",
    type: "number",
    width: 120,
  },
  {
    field: "fee",
    headerName: "Fee",
    type: "number",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "string",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => moment(params.row.createdAt).format("DD-MMM-YY hh:mm:ss A"),
  },
];

interface IProps {
  rows: ITransaction[];
}

export default function DataTable({ rows }: IProps) {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor:"white", borderRadius:"10px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
