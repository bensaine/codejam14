import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: 'StrideSafe',
				short_name: 'StrideSafe',
				description: 'StrideSafe',
				theme_color: '#ffffff',
			},

			workbox: {
				globPatterns: ['**/*.{js,json,css,html,svg,png,ico}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
				maximumFileSizeToCacheInBytes: 10000000,
			},

			devOptions: {
				enabled: false,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module',
			},
		}),
	],
})
