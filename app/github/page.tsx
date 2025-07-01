import { Suspense } from 'react';
import Link from 'next/link';
import { Star, GitFork, ExternalLink, Calendar, Code, Pin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getPinnedGithubRepos } from '@/lib/fetch';

// Loading component for the projects
function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-shamrock-100 animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-3"></div>
          <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Projects component that fetches and displays pinned GitHub repos
async function PinnedGitHubProjects() {
  const projects = await getPinnedGithubRepos();

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <Pin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pinned Projects Found</h3>
        <p className="text-gray-600">No pinned repositories available at the moment.</p>
        <a
          href="https://github.com/poboisvert"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-shamrock-600 hover:text-shamrock-700 transition-colors"
        >
          View all repositories on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any, index: number) => (
        <div
          key={project.id}
          className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-shamrock-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          {/* Pinned Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Pin className="w-4 h-4 text-shamrock-600" />
              <span className="text-xs font-medium text-shamrock-600 bg-shamrock-50 px-2 py-1 rounded-full">
                Pinned
              </span>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-shamrock-600 transition-colors"
              aria-label="View on GitHub"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* Project Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-shamrock-600 transition-colors line-clamp-1 mb-1">
              {project.name}
            </h3>
            <p className="text-sm text-gray-500">
              {project.isPrivate ? 'Private' : 'Public'} Repository
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description || 'No description available for this repository.'}
          </p>

          {/* Language */}
          {project.primaryLanguage && (
            <div className="mb-4">
              <span 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-shamrock-100 text-shamrock-800"
                style={project.primaryLanguage.color ? {
                  backgroundColor: `${project.primaryLanguage.color}20`,
                  color: project.primaryLanguage.color
                } : {}}
              >
                {project.primaryLanguage.name}
              </span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{project.stargazerCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                <span>{project.forkCount}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Topics/Tags */}
          {project.repositoryTopics?.nodes && project.repositoryTopics.nodes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.repositoryTopics.nodes.slice(0, 3).map((topicNode: any, idx: number) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                >
                  {topicNode.topic.name}
                </span>
              ))}
              {project.repositoryTopics.nodes.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs text-gray-400">
                  +{project.repositoryTopics.nodes.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Homepage Link */}
          {project.homepageUrl && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href={project.homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-shamrock-600 hover:text-shamrock-700 transition-colors"
              >
                View Live Demo
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function GitHubPage() {
  return (
    <main className="min-h-screen bg-white paper-texture">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Pin className="w-8 h-8 text-shamrock-600" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Pinned Projects
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              My featured repositories showcasing key projects and contributions
            </p>
            
            {/* GitHub Profile Link */}
            <a
              href="https://github.com/poboisvert"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              <Code className="w-5 h-5" />
              View Full GitHub Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Repositories
            </h2>
            <p className="text-gray-600">
              These are my pinned repositories that showcase my best work and key contributions
            </p>
          </div>

          <Suspense fallback={<ProjectsLoading />}>
            <PinnedGitHubProjects />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}