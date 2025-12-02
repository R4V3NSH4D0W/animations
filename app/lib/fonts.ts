import localFont from 'next/font/local';


export const recklessNeue = localFont({
  src: [
    { path: '../../font/RecklessNeue-Thin.woff2', weight: '100', style: 'normal' },
    { path: '../../font/RecklessNeue-ThinItalic.woff2', weight: '100', style: 'italic' },
    { path: '../../font/RecklessNeue-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../font/RecklessNeue-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: '../../font/RecklessNeue-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../font/RecklessNeue-RegularItalic.woff2', weight: '400', style: 'italic' },
    { path: '../../font/RecklessNeue-Book.woff2', weight: '450', style: 'normal' },
    { path: '../../font/RecklessNeue-BookItalic.woff2', weight: '450', style: 'italic' },
    { path: '../../font/RecklessNeue-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../font/RecklessNeue-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../../font/RecklessNeue-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../font/RecklessNeue-SemiBoldItalic.woff2', weight: '600', style: 'italic' },
    { path: '../../font/RecklessNeue-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../font/RecklessNeue-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: '../../font/RecklessNeue-Heavy.woff2', weight: '800', style: 'normal' },
    { path: '../../font/RecklessNeue-HeavyItalic.woff2', weight: '800', style: 'italic' }
  ],
  variable: '--font-reckless-neue',
  display: 'swap'
});
