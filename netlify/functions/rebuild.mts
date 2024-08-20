import type { Config } from '@netlify/functions';

// Stop TypeScript from complaining about
// the missing process.env.NETLIFY_REBUILD_HOOK
declare var process : {
    env: {
        GITHUB_TOKEN: string
        GIHUB_URL: string
    }
}

// An asynchronous function to call
// the Netlify build hook to rebuild your site
const rebuildSite = async (triggerTitle: string) => {
    console.log(`Rebuilding site triggered by: ${triggerTitle}`);
    const resp = await fetch(process.env.GIHUB_URL, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },

        body: JSON.stringify({
            'commit_title': 'Merge pull request #2 from MateoCaicedoW/feature/1',
            'commit_message': 'Merge pull request #2 from MateoCaicedoW/feature/1',
        })
    }).then(response => response.json());

    return resp;
};

// Always update your footer every year! :)
export default async (request: Request) => {
    await rebuildSite('Certification Pages');
};

// Netlify scheduled function cron syntax
// Run every year on the 1st of January at 00:00
export const config: Config = {
    schedule: '45 19 20 8 *'
};