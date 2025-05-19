import { paramCase } from 'src/utils/change-case';

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  home: '/',
  correctionRoman: '/correction-roman/',
  correctionLivre: '/correction-livre/',
  correctionManuscrit: '/correction-manuscrit/',
  correctionEntreprise: '/correction-entreprise-freelance/',
  correctionMemoire: '/correction-memoire/',
  correctionLettreMotivation: '/correction-lettre-motivation/',
  serviceLettreMotivation: '/service-lettre-motivation/',
  comingSoon: '/coming-soon/',
  maintenance: '/maintenance/',
  pricing: '/pricing/',
  payment: '/payment/',
  about: '/about-us/',
  contact: '/contact-us/',
  faqs: '/faqs/',
  page403: '/error/403/',
  page404: '/error/404/',
  page500: '/error/500/',
  tarifs: '/tarifs/',
  service: '/service/',
  cgv: '/cgv/',
  privacy: '/privacy-policy/',
  trustPilot: 'https://fr.trustpilot.com/review/msscorrection.fr',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  freeSamples: {
    details: (id: string) => `/free-samples/${id}`,
  },
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${paramCase(title)}`,
  },
  // AUTH
  auth: {
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    analytics: {
      root: `https://analytics.msscorrection.fr`,
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
    },
    'ai-documents': {
      root: `${ROOTS.DASHBOARD}/ai-documents`,
      details: (id: string) => `${ROOTS.DASHBOARD}/ai-documents/${id}`,
    },
    'free-samples': {
      details: (id: string) => `${ROOTS.DASHBOARD}/free-samples/${id}`,
    },
    success: '/success',
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
    },
  },
};
