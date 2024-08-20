import { ThemeConfig } from "antd";


const theme: ThemeConfig = {
    token: {
        fontSize: 16,
        colorPrimary: '#c0d310',
    },
    components: {
        Button: {
            colorTextLightSolid: "rgb(0,0,0)",
            onlyIconSize: 6,
            paddingBlockLG: 5,
            contentFontSize: 10,
            onlyIconSizeLG: 12
          },
    }
};

export default theme;