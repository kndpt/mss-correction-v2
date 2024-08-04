/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------

import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';
import { primaryFont } from 'src/theme/typography';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context';
import { APP_DOMAIN } from 'src/config-global';
import Script from 'next/script';
import { isEnvironment } from 'src/utils/utils';
import { EENV } from 'src/types/env';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Viewport } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';

// ----------------------------------------------------------------------

const metaDescription =
  'Optimisez vos textes sans faute avec mon service professionnel de correction de texte. De romans à mémoires, précision optimale - Simulateur gratuit.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
};

export const metadata = {
  metadataBase: new URL(APP_DOMAIN ?? 'https://msscorrection.fr'),
  title: 'Service de correction de texte - Mss Correction',
  description: metaDescription,
  keyWords: "service correction texte roman mémoire fin d'études cv lettre de motivation",
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', type: 'image/x-icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
  publisher: 'Mss Correction',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://msscorrection.fr',
    site_name: 'Mss Correction',
    title: 'Service de relecture et correction de texte - Mss Correction',
    description: metaDescription,
    images: '/assets/images/home/thumbnail.webp',
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  // const buildGoogleAnalytics = () => (
  //   <>
  //     <Script src="https://www.googletagmanager.com/gtag/js?id=G-LZKET791B3" />
  //     <Script id="google-analytics">
  //       {`
  //         window.dataLayer = window.dataLayer || [];
  //         function gtag(){dataLayer.push(arguments);}
  //         gtag('js', new Date());

  //         gtag('config', 'G-LZKET791B3');
  //       `}
  //     </Script>
  //   </>
  // );

  // const buildConsent = () => (
  //   <>
  //     <Script src="https://www.googletagmanager.com/gtag/js?id=G-LZKET791B3" />
  //     <Script id="google-analytics">
  //       {`
  //         window.dataLayer = window.dataLayer || [];

  //         function gtag(){dataLayer.push(arguments);}
  //         // Définissez le consentement par défaut pour des régions spécifiques selon vos besoins
  //         gtag('consent', 'default', {

  //           'ad_storage': 'denied',
  //           'ad_user_data': 'denied',
  //           'ad_personalization': 'denied',
  //           'analytics_storage': 'denied',
  //         'functionality_storage': 'denied',
  //         'personalization_storage': 'denied',
  //         'security_storage': 'denied',
  //         'regions': ['FR']
  //         });

  //         // Définissez le consentement par défaut pour toutes les autres régions selon vos besoins

  //         gtag('consent', 'default', {
  //           'ad_storage': 'denied',
  //           'ad_user_data': 'denied',
  //           'ad_personalization': 'denied',
  //           'analytics_storage': 'denied'
  //         'functionality_storage': 'denied',
  //         'personalization_storage': 'denied',
  //         'security_storage': 'denied',
  //         });
  //       `}
  //     </Script>
  //   </>
  // );

  const buildHotjar = () => (
    <Script
      id="hotjar-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3647932,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  );

  const buildChatbot = () => (
    <Script
      id="chatbot-script"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/658b428e07843602b805b959/1hijvnv6o';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
              `,
      }}
    />
  );

  // const buildTagManager = () => (
  //   <>
  //     {/* Google Tag Manager */}
  //     <Script
  //       id="google-tag-manager"
  //       strategy="afterInteractive"
  //       dangerouslySetInnerHTML={{
  //         __html: `
  //           (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  //           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  //           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  //           'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  //           })(window,document,'script','dataLayer','GTM-T4NMPXX9');
  //         `,
  //       }}
  //     />
  //     {/* End Google Tag Manager */}

  //     {/* Google Tag Manager (noscript) */}
  //     <noscript>
  //       <iframe
  //         title="google-tag-manager"
  //         src="https://www.googletagmanager.com/ns.html?id=GTM-T4NMPXX9"
  //         height="0"
  //         width="0"
  //         style={{ display: 'none', visibility: 'hidden' }}
  //       />
  //     </noscript>
  //     {/* End Google Tag Manager (noscript) */}
  //   </>
  // );

  const buildCounterAnalytics = () => (
    <Script
      id="counter-dev-script"
      src="https://cdn.counter.dev/script.js"
      data-id="7a999196-c909-4480-9af6-f7d08bc00fc4"
      data-utcoffset="1"
      strategy="afterInteractive"
    />
  );

  // const buildOsano = () => (
  //   <Script
  //     src="https://cmp.osano.com/16BafaUKVNrkmG2ku/d453c4aa-405f-441d-8611-39d402876da7/osano.js"
  //     strategy="afterInteractive"
  //   />
  // );

  return (
    <html lang="fr" className={primaryFont.className}>
      {isEnvironment(EENV.PRODUCTION) && <GoogleTagManager gtmId="GTM-T4NMPXX9" />}
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light',
                themeDirection: 'ltr',
                themeContrast: 'default',
                themeLayout: 'horizontal',
                themeColorPresets: 'blue',
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <SettingsDrawer />
                    <ProgressBar />
                    {children}
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
        <Script
          id="trustpilot-script"
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          async
        />
        {isEnvironment(EENV.PRODUCTION) && <Analytics />}
        {isEnvironment(EENV.PRODUCTION) && <SpeedInsights />}
        {isEnvironment(EENV.PRODUCTION) && buildHotjar()}
        {isEnvironment(EENV.PRODUCTION) && buildChatbot()}
        {isEnvironment(EENV.PRODUCTION) && buildCounterAnalytics()}
      </body>
    </html>
  );
}
