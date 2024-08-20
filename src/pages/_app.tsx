import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#c2cb16",
          colorInfo: "#c2cb16",
          colorIcon: "#c2cb16",
        },
        components: {
          Card: {
            padding: 0,
            paddingLG: 0
          },
          Button: {
            primaryColor: "rgb(0,0,0)",
            paddingBlock: 20,
            paddingInline: 25,
            fontWeight: 500,
          },
          Input: {
            paddingBlock: 10,
            colorBgContainer: "rgb(243,244,246)",
            colorIcon: "#c2cb16",
            colorIconHover: "rgb(194,203,22)",
          },
          Typography: {
            fontFamilyCode: "Apple Color Emoji",
            marginXS: 1,
            marginXXS: 1,
            paddingSM: 1,
            titleMarginBottom: "10px",
            titleMarginTop: "0",
          },
        },
      }}
    >
        <Component {...pageProps} />
    </ConfigProvider>
  );
}