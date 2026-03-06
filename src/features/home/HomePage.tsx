import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { AppCard } from '../../ui/components/AppCard';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <AppCard>
      <Typography variant="h4" gutterBottom>
        {t('navigation.home')}
      </Typography>
      <Typography>{t('home.welcome')}</Typography>
    </AppCard>
  );
};

