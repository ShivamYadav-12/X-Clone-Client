import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import {Inter} from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import  { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
    <GoogleOAuthProvider clientId="105840397196-o1ubfnekupksqae6m9ts36u6287kgbqk.apps.googleusercontent.com">
    <Component {...pageProps} />
    <Toaster/>
    </GoogleOAuthProvider></div>;
}
