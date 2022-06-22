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
      element: <Navigate to="/certy-career/individual/profile" replace />,
    },
    {
      path: '/certy-career',
      element: <DashboardLayout />,
      children: [
        {
          element: <Navigate to="/certy-career/individual/profile" replace />,
          index: true,
        },
        { path: 'individual/profile', element: <IndividualProfile /> },
        { path: 'individual/jobs', element: <FindJob /> },
        { path: 'individual/jobs/:id', element: <JobDetail /> },
        { path: 'individual/applied-job', element: <AppliedJob /> },
        { path: 'recruiter/management-posted-job', element: <PostedJob /> },
        { path: 'recruiter/company-profile', element: <CompanyProfile /> },
        {
          path: 'recruiter/applicant-management',
          element: <ApplicantManagement />,
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
const PostedJob = Loadable(lazy(() => import('../pages/PostedJob')));
const CompanyProfile = Loadable(lazy(() => import('../pages/CompanyProfile')));
const ApplicantManagement = Loadable(
  lazy(() => import('../pages/ApplicantManagement')),
);
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
