import Card, { type CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface AppCardProps extends CardProps {
  children: React.ReactNode;
}

export const AppCard = ({ children, ...props }: AppCardProps) => {
  return (
    <Card {...props}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

