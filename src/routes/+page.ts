import type { PageLoad } from './$types';

type RepoTrees = {
	tree: Array<{ path: string; type: string; url: string }>;
};

const fromBinary = (str: string) => {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

const regex = /\d{2}\/\d{2}\/\d{4}\s(.*)/;

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(
		'https://api.github.com/repos/Qworel97/The-Great-Repository-Of-Grudges/git/trees/main?recursive=1'
	);
	const repoTrees = (await res.json()) as RepoTrees;

	const grudges = repoTrees.tree.filter((item: { path: string; type: string }) => {
		if (item.path !== 'LICENSE' && item.path !== 'README.md' && item.type === 'blob') return item;
	});

	const resGrudge = await fetch(grudges[Math.floor(Math.random() * grudges.length)].url);
	const grudge = await resGrudge.json();

    const grudgeTextRaw = fromBinary(grudge.content);

	const grudgeInfo = grudgeTextRaw.match(regex)?.at(0);
	const grudgeText = grudgeTextRaw.slice(0, grudgeTextRaw.search(regex))

	return { grudgeText, grudgeInfo };
};
