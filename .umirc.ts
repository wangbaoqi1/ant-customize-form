import { defineConfig } from 'dumi';
const repo = 'wbq-dumiapp';

export default defineConfig({
  title: 'wbq-components',
  favicon: '/public/1579967293471.jpeg',
  logo: '/public/1579967293471.jpeg',
  mode: 'site',
  devServer: {
    port: 1998 // 自定义端口号
  },
  base: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  publicPath: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
  // more config: https://d.umijs.org/config
});
