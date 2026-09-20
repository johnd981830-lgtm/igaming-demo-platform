import './globals.css';
import TopNav from '../components/TopNav';

export const metadata = {
  title: 'PrimeBet | iGaming Demo',
  description: 'Casino and sportsbook demo MVP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
