import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { requestRepository } from '../../domain/requests/repository';
import type {
  RequestAggregate,
  RequestMemberRecord,
  RequestRecord,
  RequestSearchFilters,
  RequestUpdateInput,
} from '../../domain/requests/types';
import { AppCard } from '../../ui/components/AppCard';
import { MemberDetailsDialog } from './MemberDetailsDialog';
import { RequestDetailsDialog } from './RequestDetailsDialog';
import { RequestsSearchForm } from './RequestsSearchForm';
import { RequestsTable } from './RequestsTable';

const defaultFilters: RequestSearchFilters = {
  correlationId: '',
  sourceChannel: '',
  policyId: '',
  producerId: '',
  status: '',
  parentCorrelationId: '',
  memberQuery: '',
};

export const RequestsPage = () => {
  const { t } = useTranslation();
  const [draftFilters, setDraftFilters] = useState<RequestSearchFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<RequestSearchFilters>(defaultFilters);
  const [rows, setRows] = useState<RequestAggregate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [parentModalRequest, setParentModalRequest] = useState<RequestRecord | null>(null);
  const [editModalRequest, setEditModalRequest] = useState<RequestRecord | null>(null);
  const [memberModal, setMemberModal] = useState<RequestMemberRecord | null>(null);

  const load = async (filters: RequestSearchFilters) => {
    try {
      setError(null);
      const result = await requestRepository.getRequests(filters);
      setRows(result);
    } catch (unknownError) {
      const message = unknownError instanceof Error ? unknownError.message : 'Failed to load requests';
      setError(message);
    }
  };

  useEffect(() => {
    void load(appliedFilters);
  }, [appliedFilters]);

  const requestById = useMemo(() => {
    return new Map(rows.map((row) => [row.request.id, row.request]));
  }, [rows]);

  const handleSaveRequest = async (input: RequestUpdateInput) => {
    if (!editModalRequest) {
      return;
    }

    try {
      await requestRepository.updateRequest(editModalRequest.id, input);
      setEditModalRequest(null);
      await load(appliedFilters);
    } catch (unknownError) {
      const message = unknownError instanceof Error ? unknownError.message : 'Failed to update request';
      setError(message);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">{t('requests.title')}</Typography>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <AppCard>
        <RequestsSearchForm
          value={draftFilters}
          onChange={setDraftFilters}
          onSearch={() => setAppliedFilters(draftFilters)}
          onReset={() => {
            setDraftFilters(defaultFilters);
            setAppliedFilters(defaultFilters);
          }}
        />
      </AppCard>

      <AppCard>
        <RequestsTable
          rows={rows}
          onOpenParent={setParentModalRequest}
          onOpenEdit={setEditModalRequest}
          onOpenMember={setMemberModal}
        />
      </AppCard>

      <RequestDetailsDialog
        open={Boolean(parentModalRequest)}
        title={t('requests.parentDetails')}
        request={parentModalRequest ? requestById.get(parentModalRequest.id) ?? parentModalRequest : null}
        editable={false}
        onClose={() => setParentModalRequest(null)}
      />

      <RequestDetailsDialog
        open={Boolean(editModalRequest)}
        title={t('requests.requestDetails')}
        request={editModalRequest ? requestById.get(editModalRequest.id) ?? editModalRequest : null}
        editable
        onClose={() => setEditModalRequest(null)}
        onSave={handleSaveRequest}
      />

      <MemberDetailsDialog
        open={Boolean(memberModal)}
        member={memberModal}
        onClose={() => setMemberModal(null)}
      />
    </Stack>
  );
};

