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
        path: '/certy-career/individual/profile',
        icon: ICONS.dashboard,
      },
      {
        title: 'Find Job',
        path: '/certy-career/individual/jobs',
        icon: ICONS.dashboard,
      },
      {
        title: 'Applied Job',
        path: '/certy-career/individual/applied-job',
        icon: ICONS.ecommerce,
      },
      // { title: 'Saved Job', path: '/individual/three', icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Recruiter Features',
    items: [
      {
        title: 'Company Profile',
        path: '/certy-career/recruiter/company-profile',
        icon: ICONS.dashboard,
      },
      {
        title: 'Job Management',
        icon: ICONS.user,
        children: [
          {
            title: 'Posted Job',
            path: '/certy-career/recruiter/management-posted-job',
          },
        ],
      },
      {
        title: 'Applicant Management',
        path: '/certy-career/recruiter/applicant-management',
        icon: ICONS.dashboard,
      },
    ],
  },
];

export default navConfig;
