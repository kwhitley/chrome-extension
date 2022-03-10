import adapter from 'sveltekit-adapter-chrome-extension'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		appDir: 'app',
	}
};

export default config
