import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import type { RequestMemberRecord } from '../../domain/requests/types';
import { AppButton } from '../../ui/components/AppButton';
import { AppDialog } from '../../ui/components/AppDialog';
import { AppTextField } from '../../ui/components/AppTextField';

interface MemberDetailsDialogProps {
  open: boolean;
  member: RequestMemberRecord | null;
  onClose: () => void;
}

export const MemberDetailsDialog = ({ open, member, onClose }: MemberDetailsDialogProps) => {
  const { t } = useTranslation();

  return (
    <AppDialog
      open={open}
      title={t('requests.memberDetails')}
      onClose={onClose}
      actions={
        <AppButton variant="outlined" onClick={onClose}>
          {t('requests.close')}
        </AppButton>
      }
    >
      {member ? (
        <Stack spacing={2} mt={1}>
          <AppTextField label="First name" value={member.firstName} disabled />
          <AppTextField label="Last name" value={member.lastName} disabled />
          <AppTextField label={t('requests.status')} value={member.status} disabled />
          <AppTextField label="Tax Number" value={member.taxNum ?? ''} disabled />
          <AppTextField label="Error Code" value={member.errorCode ?? ''} disabled />
          <AppTextField
            label="Error Description"
            value={member.errorDescription ?? ''}
            disabled
            multiline
            minRows={2}
          />
        </Stack>
      ) : null}
    </AppDialog>
  );
};
