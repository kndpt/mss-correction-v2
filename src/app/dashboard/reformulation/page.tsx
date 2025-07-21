import AdminGuard from 'src/auth/guard/admin-guard';

import ReformulationView from 'src/sections/reformulation/reformulation-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Reformulation',
};

export default function ReformulationPage() {
  return (
    <AdminGuard>
      <ReformulationView />
    </AdminGuard>
  );
}
