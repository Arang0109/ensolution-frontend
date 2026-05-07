import { Outlet } from 'react-router';
import { Navigation } from '@widgets/navigation';
import { Footer } from '@widgets/footer';

export const Layout = () => {

  return (
    <div>
      <header className="pb-4">
        <Navigation />
      </header>
      <main className="mx-auto max-w-screen-xl py-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
