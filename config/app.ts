export const appConfig = {
  env: process.env.NODE_ENV || 'production',
  version: process.env.VERSION || '1.4.1',
  name: 'Aliniex Mini App',
  description: 'A mini app for Aliniex',
  apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001',
  manifestUrl: 'https://amp.aliniex.com/tonconnect-manifest.json',
  twaReturnUrl: 'https://t.me/aliniex_bot',
  tonApiKey: process.env.TON_API_KEY || 'AEH37Z55IOEISSYAAAAH2X25L6UCPV3HL5ATGXVB3GNCK4FCKOWOUJ6BEJITDP24F6N25BA',
  pagination: {
    pageSize: 8,
  },
  defaultCurrency: 'EXP',
  jwtSecret: "aliniex@123",
  minSwapEXP: 100000,
  sendKycThreshold: 200
};
