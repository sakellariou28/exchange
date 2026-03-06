import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Fragment, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { RequestAggregate, RequestMemberRecord, RequestRecord } from '../../domain/requests/types';
import { AppButton } from '../../ui/components/AppButton';
import { AppPagination } from '../../ui/components/AppPagination';

interface RequestsTableProps {
  rows: RequestAggregate[];
  onOpenParent: (request: RequestRecord) => void;
  onOpenEdit: (request: RequestRecord) => void;
  onOpenMember: (member: RequestMemberRecord) => void;
}

export const RequestsTable = ({ rows, onOpenParent, onOpenEdit, onOpenMember }: RequestsTableProps) => {
  const { t } = useTranslation();
  const [expandedRowIds, setExpandedRowIds] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedRows = useMemo(() => {
    const from = page * rowsPerPage;
    return rows.slice(from, from + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  const toggleExpanded = (requestId: number) => {
    setExpandedRowIds((value) =>
      value.includes(requestId) ? value.filter((item) => item !== requestId) : [...value, requestId],
    );
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={70} />
            <TableCell>{t('requests.correlationId')}</TableCell>
            <TableCell>{t('requests.sourceChannel')}</TableCell>
            <TableCell>{t('requests.policyId')}</TableCell>
            <TableCell>{t('requests.producerId')}</TableCell>
            <TableCell>{t('requests.status')}</TableCell>
            <TableCell>{t('requests.parentRequest')}</TableCell>
            <TableCell>{t('requests.actions')}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedRows.map((row) => {
            const isExpanded = expandedRowIds.includes(row.request.id);
            return (
              <Fragment key={row.request.id}>
                <TableRow hover>
                  <TableCell>
                    <AppButton
                      size="small"
                      variant="outlined"
                      onClick={() => toggleExpanded(row.request.id)}
                    >
                      {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </AppButton>
                  </TableCell>
                  <TableCell>{row.request.correlationId}</TableCell>
                  <TableCell>{row.request.sourceChannel}</TableCell>
                  <TableCell>{row.request.policyId}</TableCell>
                  <TableCell>{row.request.producerId}</TableCell>
                  <TableCell>{row.request.status}</TableCell>
                  <TableCell>
                    {row.parentRequest ? (
                      <Link
                        component="button"
                        type="button"
                        onClick={() => {
                          if (row.parentRequest) {
                            onOpenParent(row.parentRequest);
                          }
                        }}
                      >
                        {t('requests.view')}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <AppButton size="small" onClick={() => onOpenEdit(row.request)}>
                      {t('requests.edit')}
                    </AppButton>
                  </TableCell>
                </TableRow>

                {isExpanded ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight={600}>
                          {t('requests.members')}
                        </Typography>
                        {row.members.map((member) => (
                          <Link
                            key={member.id}
                            component="button"
                            type="button"
                            underline="hover"
                            onClick={() => onOpenMember(member)}
                            sx={{ textAlign: 'left', width: 'fit-content' }}
                          >
                            {`${member.firstName} ${member.lastName} (${member.status})`}
                          </Link>
                        ))}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ) : null}
              </Fragment>
            );
          })}

          {!paginatedRows.length ? (
            <TableRow>
              <TableCell colSpan={8}>{t('requests.noResults')}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>

      <AppPagination
        count={rows.length}
        page={page}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value));
          setPage(0);
        }}
      />
    </TableContainer>
  );
};

