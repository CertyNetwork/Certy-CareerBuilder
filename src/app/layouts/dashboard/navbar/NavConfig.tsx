import SvgIconStyle from '../../../components/SvgIconStyle';

const getIcon = name => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  home: getIcon('ic_home'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Individual Features',
    items: [
      {
        title: 'Individual Profile',
        path: '/individual/profile',
        icon: ICONS.dashboard,
      },
      { title: 'Find Job', path: '/individual/jobs', icon: ICONS.dashboard },
      { title: 'Applied Job', path: '/dashboard/two', icon: ICONS.ecommerce },
      { title: 'Saved Job', path: '/dashboard/three', icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Recruiter Features',
    items: [
      {
        title: 'Company Profile',
        path: '/dashboard/one',
        icon: ICONS.dashboard,
      },
      {
        title: 'Job Management',
        path: '/dashboard/user',
        icon: ICONS.user,
        children: [{ title: 'Four', path: '/dashboard/user/four' }],
      },
      {
        title: 'Applicant Management',
        path: '/dashboard/one',
        icon: ICONS.dashboard,
      },
    ],
  },
];

export default navConfig;
