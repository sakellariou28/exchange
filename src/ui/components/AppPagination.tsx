import TablePagination, { type TablePaginationProps } from '@mui/material/TablePagination';

export const AppPagination = (props: TablePaginationProps) => {
  return <TablePagination component="div" rowsPerPageOptions={[5, 10, 25]} {...props} />;
};

