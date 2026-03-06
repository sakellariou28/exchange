import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppButton } from '../../ui/components/AppButton';
import { AppCard } from '../../ui/components/AppCard';
import { AppTextField } from '../../ui/components/AppTextField';
import { useAuth } from './AuthContext';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [username, setUsername] = useState('fallback.user');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ username, password });
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from ?? '/home', { replace: true });
    } catch (unknownError) {
      const message = unknownError instanceof Error ? unknownError.message : 'Unexpected login error';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        p: 2,
      }}
    >
      <AppCard sx={{ width: '100%', maxWidth: 420 }}>
        <Typography variant="h5" mb={2}>
          {t('login.title')}
        </Typography>

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          {error ? <Alert severity="error">{error}</Alert> : null}
          <AppTextField
            label={t('login.username')}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <AppTextField
            label={t('login.password')}
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <AppButton type="submit" disabled={isSubmitting}>
            {t('login.submit')}
          </AppButton>
        </Stack>
      </AppCard>
    </Box>
  );
};

