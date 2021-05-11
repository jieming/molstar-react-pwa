import IntroductionIcon from '@material-ui/icons/Explore'

export const navItems = [
  {
    Icon: IntroductionIcon,
    label: 'Introduction',
    url: () => `${process.env.PUBLIC_URL}/introduction`
  }
]
