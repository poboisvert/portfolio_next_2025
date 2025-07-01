import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getWorkContentDetail } from "@/lib/work";

const workItems = [
  "pomme-olive",
  "pca-services",
  "proxim-pharmacie-du-village",
  "condollo",
  "bettingnews",
  "ladies-night",
];

export default async function WorkPage() {
  const projects = await Promise.all(
    workItems.map((slug) => getWorkContentDetail(slug))
  );

  return (
    <main className='min-h-screen bg-white paper-texture'>
      <Navigation />

      {/* Hero Section */}
      <section className='pt-32 pb-20 px-4 bg-white/50 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
              Our Work
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Explore our portfolio of successful projects and digital solutions
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className='py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.map(
              (project, index) =>
                project && (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className='group block'
                  >
                    <div className='bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2'>
                      {/* Image Container */}
                      <div className='relative aspect-[4/3] overflow-hidden bg-gray-50'>
                        <img
                          src={project.imageSrc}
                          alt={project.imageAlt}
                          className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
                        />
                        
                        {/* Gradient Overlay on Hover */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                        
                        {/* Arrow Icon on Hover */}
                        <div className='absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0'>
                          <ArrowRight className='w-5 h-5 text-white' />
                        </div>
                      </div>

                      {/* Content */}
                      <div className='p-8'>
                        <div className='mb-3'>
                          <span className='text-sm font-medium text-shamrock-600 bg-shamrock-50 px-3 py-1 rounded-full'>
                            {project.date}
                          </span>
                        </div>
                        
                        <h2 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-shamrock-600 transition-colors line-clamp-2'>
                          {project.title}
                        </h2>
                        
                        <p className='text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4'>
                          {project.overview}
                        </p>

                        {/* Technologies/Skills Tags */}
                        <div className='flex flex-wrap gap-2'>
                          {project.roleAndContribution.slice(0, 2).map((role, idx) => (
                            <span
                              key={idx}
                              className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md'
                            >
                              {role.title}
                            </span>
                          ))}
                          {project.roleAndContribution.length > 2 && (
                            <span className='text-xs text-gray-400 px-2 py-1'>
                              +{project.roleAndContribution.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}