import 'dotenv/config';
import appJson from './app.json';

export default ({ config }) => {
  return {
    ...appJson.expo,
    extra: {
      ...appJson.expo.extra,
      API_URL: process.env.API_URL ?? 'http://localhost:3000',
    },
  };
};
