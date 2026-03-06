import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import type { RequestSearchFilters } from '../../domain/requests/types';
import { AppButton } from '../../ui/components/AppButton';
import { AppTextField } from '../../ui/components/AppTextField';

interface RequestsSearchFormProps {
  value: RequestSearchFilters;
  onChange: (value: RequestSearchFilters) => void;
  onSearch: () => void;
  onReset: () => void;
}

export const RequestsSearchForm = ({ value, onChange, onSearch, onReset }: RequestsSearchFormProps) => {
  const { t } = useTranslation();

  const setField = (field: keyof RequestSearchFilters, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppTextField
            label={t('requests.correlationId')}
            value={value.correlationId}
            onChange={(event) => setField('correlationId', event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppTextField
            label={t('requests.policyId')}
            value={value.policyId}
            onChange={(event) => setField('policyId', event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppTextField
            label={t('requests.producerId')}
            value={value.producerId}
            onChange={(event) => setField('producerId', event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppTextField
            label={t('requests.sourceChannel')}
            value={value.sourceChannel}
            onChange={(event) => setField('sourceChannel', event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppTextField
            label={t('requests.status')}
            value={value.status}
            onChange={(event) => setField('status', event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AppTextField
            label={t('requests.parentCorrelationId')}
            value={value.parentCorrelationId}
            onChange={(event) => setField('parentCorrelationId', event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <AppTextField
            label={t('requests.memberQuery')}
            value={value.memberQuery}
            onChange={(event) => setField('memberQuery', event.target.value)}
          />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1}>
        <AppButton onClick={onSearch}>{t('requests.search')}</AppButton>
        <AppButton variant="outlined" onClick={onReset}>
          {t('requests.reset')}
        </AppButton>
      </Stack>
    </Stack>
  );
};

