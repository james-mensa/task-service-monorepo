import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Pagination as IPagination} from "@utils/types";

import React from "react";

export type RowItem<T> = { [P in keyof T]: T[P] };

export interface TableProps<T> {
  dataKeys: (keyof T)[];
  headerLabels: string[];
  data: RowItem<T>[];
  rowComponent?: React.ComponentType<{ item: RowItem<T> }>;
  pagination?: IPagination;
  onChangePage?: (page: number) => void;
}

export default function AppTable<T>({
  dataKeys,
  headerLabels,
  data,
  rowComponent,
  pagination,
  onChangePage,
}: TableProps<T>) {
  const handlePageChange = async (
    _: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (onChangePage) {
      await onChangePage(page);
    }
  };
  return (
    <Box>
      <TableContainer sx={{border:`1px solid ${grey[300]}`,minHeight:'60vh',borderRadius:3}}>
        <Table size={"small"} >
          <TableHead sx={{ backgroundColor: grey[800], height: "45px" }}>
            <TableRow>
              {headerLabels.map((label, idx) => (
                <TableCell key={idx} align="left" sx={{color:grey[100]}}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((record, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                  cursor: "pointer",
                }}
              >
                {dataKeys.map((key, idx) => (
                  <TableCell key={idx}>{String(record[key])}</TableCell>
                ))}

                {rowComponent && (
                  <TableCell key={`${index}-row-component`}>
                    {React.createElement(rowComponent, { item: record })}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            siblingCount={1}
          />
        </Box>
      )}
    </Box>
  );
}
