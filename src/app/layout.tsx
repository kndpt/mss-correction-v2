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
import PlausibleProvider from 'next-plausible';

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

  const buildOpenWidget = () => (
    <Script
      id="openwidget-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.__ow = window.__ow || {};
          window.__ow.organizationId = "6a0a9d0e-47d3-4619-a9b7-1aeb064283df";
          window.__ow.integration_name = "manual_settings";
          window.__ow.product_name = "openwidget";   
          ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
        `,
      }}
    />
  );

  return (
    <html lang="fr" className={primaryFont.className}>
      <head>
        {isEnvironment(EENV.PRODUCTION) && (
          <PlausibleProvider
            domain="msscorrection.fr"
            taggedEvents
            // trackLocalhost
            enabled
            revenue
          />
        )}
      </head>
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
        {/* {isEnvironment(EENV.PRODUCTION) && buildChatbot()} */}
        {isEnvironment(EENV.PRODUCTION) && buildOpenWidget()}
      </body>
    </html>
  );
}
