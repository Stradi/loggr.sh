import Container from '@/components/ui/container';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;
export default function Layout({ children }: Props) {
  return <Container>{children}</Container>;
}
