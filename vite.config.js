import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Babel 플러그인 설정
      babel: {
        plugins: [
          '@emotion/babel-plugin', // Emotion Babel 플러그인 추가
        ],
      },
      server: {
        historyApiFallback: true, // Vite에서 SPA 라우팅을 지원하도록 설정
      },
    }),
  ],
});
