import { ReactNode } from 'react';

declare global {
  export interface ChildProps {
    children: ReactNode;
  }
}
