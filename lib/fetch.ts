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
      .slice(0, 7);
    return sortedData;
  } catch (e) {
    return [];
  }
});

export const getPinnedGithubRepos = cache(async (): Promise<any> => {
  try {
    // GitHub GraphQL API query to get pinned repositories
    const query = `
      query {
        user(login: "poboisvert") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                homepageUrl
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                updatedAt
                createdAt
                isPrivate
                licenseInfo {
                  name
                }
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history {
                        totalCount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN || ''}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      // Fallback to REST API if GraphQL fails (without token)
      console.warn('GraphQL API failed, falling back to REST API');
      return await getFallbackPinnedRepos();
    }

    const data = await response.json();
    
    if (data.errors) {
      console.warn('GraphQL errors:', data.errors);
      return await getFallbackPinnedRepos();
    }

    return data.data?.user?.pinnedItems?.nodes || [];
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return await getFallbackPinnedRepos();
  }
});

// Fallback function to get some featured repositories when GraphQL is not available
const getFallbackPinnedRepos = cache(async (): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/poboisvert/repos?sort=stars&per_page=6`,
      {
        next: { revalidate: 3600 },
      }
    );
    
    const repos = await response.json();
    
    // Transform REST API response to match GraphQL structure
    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      homepageUrl: repo.homepage,
      stargazerCount: repo.stargazers_count,
      forkCount: repo.forks_count,
      primaryLanguage: repo.language ? {
        name: repo.language,
        color: null
      } : null,
      repositoryTopics: {
        nodes: repo.topics?.map((topic: string) => ({
          topic: { name: topic }
        })) || []
      },
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
      isPrivate: repo.private,
      licenseInfo: repo.license ? {
        name: repo.license.name
      } : null,
      defaultBranchRef: null
    }));
  } catch (error) {
    console.error('Fallback fetch failed:', error);
    return [];
  }
});