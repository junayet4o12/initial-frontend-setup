import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <section className={cn('container mx-auto px-5 md:px-5', className)}>
      {children}
    </section>
  );
}
