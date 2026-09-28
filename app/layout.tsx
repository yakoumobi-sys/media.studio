import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Caractère Media — Réservez votre session studio',description:'Studio podcast, vidéos verticales et YouTube. À partir de 4 000 DA/heure. Choisissez votre session, nous vous appelons pour confirmer.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
