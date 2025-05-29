import "dotenv/config";
import appJson from "./app.json";

export default ({ config }) => {
  return {
    ...config,
    ...appJson.expo,
    extra: {
      ...appJson.expo.extra,
      API_URL: process.env.API_URL ?? "http://192.168.1.117:3000",
    },
  };
};
