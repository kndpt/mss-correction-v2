/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// i18n
import 'src/locales/i18n';

// ----------------------------------------------------------------------
import { Analytics } from '@vercel/analytics/react';

import ThemeProvider from 'src/theme';
import { LocalizationProvider } from 'src/locales';
import { primaryFont } from 'src/theme/typography';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { AuthProvider } from 'src/auth/context';
import { APP_DOMAIN } from 'src/config-global';
import Script from 'next/script';
import { isEnvironment } from 'src/utils/utils';
import { EENV } from 'src/types/env';

// ----------------------------------------------------------------------

export const metadata = {
  metadataBase: new URL(APP_DOMAIN ?? 'https://msscorrection.fr'),
  title: 'Service de correction de texte en ligne - Mss Correction',
  description:
    "Optimisez vos écrits avec mon service de correction de texte. De romans à mémoires, profitez d'une précision optimale. Améliorez vos textes pour atteindre vos objectifs.",
  keyWords: "correction texte en ligne roman mémoire fin d'études cv lettre de motivation",
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
  publisher: 'Mss Correction',
  openGraph: {
    images: '/assets/images/home/thumbnail.webp',
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  const buildGoogleAnalytics = () => (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-8XFKGQRSL6" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-8XFKGQRSL6');
        `}
      </Script>
    </>
  );

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

  return (
    <html lang="fr" className={primaryFont.className}>
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'horizontal', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'blue', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <CheckoutProvider>
                      <SettingsDrawer />
                      <ProgressBar />
                      {children}
                    </CheckoutProvider>
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
        {isEnvironment(EENV.PRODUCTION) && buildHotjar()}
        {isEnvironment(EENV.PRODUCTION) && buildGoogleAnalytics()}
      </body>
    </html>
  );
}
