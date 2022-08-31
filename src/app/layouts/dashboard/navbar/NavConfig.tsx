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
        title: 'Profile',
        path: '/profile',
        icon: ICONS.dashboard,
      },
      {
        title: 'Find Job',
        path: '/jobs',
        icon: ICONS.dashboard,
      },
      {
        title: 'Applied Job',
        path: '/applied-job',
        icon: ICONS.ecommerce,
      },
      // { title: 'Saved Job', path: '/individual/three', icon: ICONS.analytics },
    ],
  },
];

export default navConfig;
