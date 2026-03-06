import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { RequestRecord, RequestUpdateInput } from '../../domain/requests/types';
import { AppButton } from '../../ui/components/AppButton';
import { AppDialog } from '../../ui/components/AppDialog';
import { AppTextField } from '../../ui/components/AppTextField';

interface RequestDetailsDialogProps {
  open: boolean;
  title: string;
  request: RequestRecord | null;
  editable: boolean;
  onClose: () => void;
  onSave?: (value: RequestUpdateInput) => void;
}

export const RequestDetailsDialog = ({
  open,
  title,
  request,
  editable,
  onClose,
  onSave,
}: RequestDetailsDialogProps) => {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<RequestUpdateInput>({
    sourceChannel: '',
    producerId: '',
    status: '',
    expirationDate: '',
  });

  useEffect(() => {
    if (!request) {
      return;
    }

    setDraft({
      sourceChannel: request.sourceChannel,
      producerId: request.producerId,
      status: request.status,
      expirationDate: request.expirationDate,
    });
  }, [request]);

  if (!request) {
    return null;
  }

  const handleChange = (field: keyof RequestUpdateInput, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  return (
    <AppDialog
      open={open}
      title={title}
      onClose={onClose}
      actions={
        <>
          <AppButton variant="outlined" onClick={onClose}>
            {t('requests.close')}
          </AppButton>
          {editable && onSave ? (
            <AppButton onClick={() => onSave(draft)}>
              {t('requests.save')}
            </AppButton>
          ) : null}
        </>
      }
    >
      <Stack spacing={2} mt={1}>
        <AppTextField label={t('requests.correlationId')} value={request.correlationId} disabled />
        <AppTextField
          label={t('requests.sourceChannel')}
          value={draft.sourceChannel}
          onChange={(event) => handleChange('sourceChannel', event.target.value)}
          disabled={!editable}
        />
        <AppTextField label={t('requests.policyId')} value={request.policyId} disabled />
        <AppTextField
          label={t('requests.producerId')}
          value={draft.producerId}
          onChange={(event) => handleChange('producerId', event.target.value)}
          disabled={!editable}
        />
        <AppTextField
          label={t('requests.status')}
          value={draft.status}
          onChange={(event) => handleChange('status', event.target.value)}
          disabled={!editable}
        />
        <AppTextField
          label={t('requests.expirationDate')}
          value={draft.expirationDate}
          onChange={(event) => handleChange('expirationDate', event.target.value)}
          disabled={!editable}
        />
      </Stack>
    </AppDialog>
  );
};
