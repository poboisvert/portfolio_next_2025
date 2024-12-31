import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      name: "Proxim - Pharmacie du Village",
      html_url: "/work/proxim-pharmacie-du-village",
      homepage: "https://pharmacieduvillage.ca/",
      owner: { login: "poboisvert" },
      topics: [
        "wordpress",
        "seo",
        "website optimization",
        "google core update",
        "keywords research",
      ],
      description:
        "Applying canvas design and SERP SEO for WordPress site & health maintenance.",
      date: "December 2024",
    },
    {
      name: "Condollo Real Estate Analytics",
      html_url: "/work/condollo",
      homepage: "https://condollo.com/",
      description:
        "Full stack Python backend, Supabase API, PostgreSQL, and frontend integration.",
      owner: { login: "poboisvert" },
      date: "June 2023",
      topics: ["next.js", "python", "go", "supabase", "rpc"],
    },
    {
      name: "BettingNews Sports Betting",
      html_url: "/work/bettingnews",
      homepage: "https://www.bettingnews.com/",
      description:
        "Backend sports data implementation, Redis, frontend integration, and optimized games data with odds API integration.",
      owner: { login: "poboisvert" },
      topics: ["python", "next.js", "redis", "nosqldb"],
      date: "Avril 2022",
    },
    {
      name: "Ladies Night - ComediHa!",
      html_url: "/work/ladies-night",
      homepage: "https://ladies-night.ca/",
      description:
        "Conversion from HTML to Wordpress, shows scheduled and tickets sales",
      owner: { login: "poboisvert" },
      topics: ["wordpress", "design", "comedy"],
      date: "October 2022",
    },
    // border border-[#e5e7eb0f] rounded-[0.5rem]
  ];

  return (
    <section className='p-4 sm:p-6'>
      <h2 className='text-3xl font-bold mb-6 sm:mb-8'>Projects</h2>
      <div className='space-y-4'>
        {projects.map((project, index) => (
          <div
            key={index}
            className='rounded-[0.5rem] p-3 sm:p-4 shadow-md outline outline-1 outline-[#e5e7eb0f] relative overflow-hidden'
          >
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between'>
              <div className='flex flex-col gap-2 mb-3 sm:mb-0'>
                {project.homepage && (
                  <Link
                    href={project.homepage}
                    className='hover:text-neon-blue hover:dark:text-green  block whitespace-nowrap overflow-hidden overflow-ellipsis' // Added width style for stable width
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <h3 className='text-xl font-semibold flex items-center'>
                      {project.name}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='ml-1 w-4 h-4'
                      >
                        <path d='M15 3h6v6'></path>
                        <path d='M10 14 21 3'></path>
                        <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
                      </svg>
                    </h3>
                  </Link>
                )}

                <p className='text-gray-800 dark:text-gray-400'>
                  {project.description}
                </p>

                <div className='flex flex-row items-center sm:items-end gap-2'>
                  <p className='text-sm flex items-center'>
                    <Link
                      href={project.html_url}
                      className='block whitespace-nowrap overflow-hidden overflow-ellipsis' // Added width style for stable width
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View Project Details
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 inline-block ml-2'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-8a1 1 0 00-2 0v4a1 1 0 002 0V8z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </Link>
                  </p>
                </div>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {project.topics.map((topic, i) => (
                    <span
                      key={i}
                      className='bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs'
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex flex-row items-center sm:items-end gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-12 h-12 text-neon-blue dark:text-green mr-2'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
                  <circle cx='9' cy='7' r='4'></circle>
                  <path d='M22 21v-2a4 4 0 0 0-3-3.87'></path>
                  <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                </svg>
                <span className='text-sm text-gray-800 dark:text-gray-400'>
                  Collaborative Project
                </span>
              </div>
            </div>
            <div className='py-4'>
              {project.date && (
                <p className='text-sm text-purple-400'>Date: {project.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
