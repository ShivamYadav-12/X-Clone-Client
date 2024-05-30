import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import {Inter} from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import  { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
    <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="105840397196-o1ubfnekupksqae6m9ts36u6287kgbqk.apps.googleusercontent.com">
    <Component {...pageProps} />
    <Toaster/>
    <ReactQueryDevtools/>
    </GoogleOAuthProvider>
    </QueryClientProvider>
    </div>;
}
