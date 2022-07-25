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

const navConfigRecruiter = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Recruiter Features',
    items: [
      // {
      //   title: 'Company Profile',
      //   path: '/certy-career/recruiter/company-profile',
      //   icon: ICONS.dashboard,
      // },
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

export default navConfigRecruiter;
