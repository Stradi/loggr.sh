import Container from '@/components/ui/container';
import { PropsWithChildren } from 'react';
import DashboardNavigation from './dashboard-navigation';

type Props = PropsWithChildren;
export default function Layout({ children }: Props) {
  return (
    <Container>
      <DashboardNavigation />
      {children}
    </Container>
  );
}
