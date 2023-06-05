import { defineConfig } from 'dumi';
const repo = 'wbq-dumiapp';

export default defineConfig({
  title: '小尧',
  favicon: '/public/1579967293471.jpeg',
  logo: '/public/1579967293471.jpeg',
  mode: 'site',
  devServer: {
    port: 8000 // 自定义端口号
  },
  base: process.env.NODE_ENV === 'production' ? `/${repo}/public/` : '/public/',
  publicPath: process.env.NODE_ENV === 'production' ? `/${repo}/public/` : '/public/',
  // more config: https://d.umijs.org/config
});
