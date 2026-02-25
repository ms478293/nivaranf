import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal - Nivaran Foundation',
  description: 'Admin control panel for news automation',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
