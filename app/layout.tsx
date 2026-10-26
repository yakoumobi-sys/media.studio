import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Caractère Media — Independent Creative Company',description:'Strategy, branding, creative production, advertising and growth. Independent Creative Company based in Algiers.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
