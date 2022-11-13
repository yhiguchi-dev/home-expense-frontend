import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const CSR = dynamic(
    async () => import("@/components/organisms/CSRComponent"),
    {
      ssr: false,
    }
  );
  return (
    <RecoilRoot>
      <CSR>
        <Component {...pageProps} />
      </CSR>
    </RecoilRoot>
  );
};

export default App;
