import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"


import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { i18n } from './i18n-config'

function getLocale(request: NextRequest): string | undefined {
  // Check if locale is saved in cookie
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  const country = request.headers.get('x-vercel-ip-country');
  const countryToLocale: Record<string, string> = {
    'RO': 'ro',
    'RU': 'ru',
    'MD': 'ro',
  };
  if (country && countryToLocale[country]) {
    return countryToLocale[country];
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = Array.from(i18n.locales);

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const staticAssetRE = /\.(?:jpg|jpeg|png|svg|webp|gif|ico|json|css|js|map)$/i
  if (staticAssetRE.test(pathname)) return
  if (pathname.startsWith('/socials/') || pathname === '/socials') return
  if (pathname === '/favicon.ico' || pathname === '/manifest.json') return
  if (pathname === '/sitemap.xml') return

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request) || i18n.defaultLocale;

    const redirectUrl = new URL(
      `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url,
    );
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // If pathname has locale, update cookie to match the URL locale
  const urlLocale = pathname.split('/')[1];
  if (i18n.locales.includes(urlLocale as any)) {
    const response = NextResponse.next();
    response.cookies.set('locale', urlLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return response;
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
