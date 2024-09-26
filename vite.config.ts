import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		proxy: {
		  // 使用 proxy 实例
		  '/api': {
			target: 'http://syt.atguigu.cn',
			changeOrigin: true,
		  },
	  },
	},
})
