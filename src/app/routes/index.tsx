import { Suspense, lazy } from 'react';

import { Navigate, useLocation, useRoutes } from 'react-router-dom';

import LoadingScreen from '../components/LoadingScreen';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import DashboardLayout from '../layouts/dashboard';

const Loadable = Component => props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/individual/profile" replace />,
    },
    {
      path: '/individual',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/individual/profile" replace />, index: true },
        { path: 'profile', element: <IndividualProfile /> },
        { path: 'jobs', element: <FindJob /> },
        { path: 'jobs/:id', element: <JobDetail /> },
        { path: 'applied-job', element: <AppliedJob /> },
        {
          path: 'user',
          children: [
            {
              element: <Navigate to="/dashboard/user/four" replace />,
              index: true,
            },
            { path: 'four', element: <PageFour /> },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const IndividualProfile = Loadable(
  lazy(() => import('../pages/IndividualProfile')),
);
const FindJob = Loadable(lazy(() => import('../pages/FindJob')));
const JobDetail = Loadable(lazy(() => import('../pages/JobDetail')));
const AppliedJob = Loadable(lazy(() => import('../pages/AppliedJob')));
const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
