<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let translated = false;

	const handleTranslate = () => {
		translated = !translated;
	};

	const handleReload = () => {
		if (!translated) {
			location.reload();
			return;
		}

		const umgiElement = document.getElementById('umgi');
		umgiElement?.classList.remove('hidden');
	};
</script>

<div
	class={`${
		translated ? 'font-sans' : 'font-rune'
	} text-center max-w-screen-lg mx-auto px-2.5 sm:px-10`}
>
	<header class="flex justify-between py-3 border-b-2">
		<h1 class="text-xl font-bold align-middle">The GROG</h1>
		<button
			class="font-sans border-2 rounded border-slate-400 bg-slate-300 hover:bg-slate-200 active:bg-slate-500 px-4 py-1"
			on:click={handleTranslate}
		>
			Translate
		</button>
	</header>
	<main>
		<p class="mt-16 mb-8">
			{data.grudgeText}
		</p>
		<p class="mb-12">
			{data.grudgeInfo}
		</p>
		<button on:click={handleReload} class="border-2 rounded border-slate-400 bg-slate-300 hover:bg-slate-200 active:bg-slate-500 px-4 py-1 mb-12"> Get another grudge </button>
		<p id="umgi" class="hidden">Reload the page yourelf, you lazy umgi</p>
	</main>
</div>
