import { cache } from "react";

export const getProfileGitHub = cache(async (): Promise<any> => {
  try {
    const data = await fetch("https://api.github.com/users/poboisvert").then(
      (res) => res.json()
    );
    return data;
  } catch (err) {
    return null;
  }
});

export const getGithubProject = cache(async (): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/poboisvert/repos?per_page=100`,
      {
        next: { revalidate: 3600 },
      }
    );
    const sortedData = (await response.json())
      .sort((a: any, b: any) => b.id - a.id)
      .slice(0, 5);
    return sortedData;
  } catch (e) {
    return [];
  }
});

const _compareBy = (key: string, ascending: boolean) => {
  let reverse = ascending ? -1 : 1;
  return function (a: any, b: any) {
    if (a[key] < b[key]) return 1 * reverse;
    if (a[key] > b[key]) return -1 * reverse;
    return 0;
  };
};
