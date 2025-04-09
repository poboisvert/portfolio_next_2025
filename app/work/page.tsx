import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getWorkContentDetail } from "@/lib/work";

const workItems = [
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
    <main className='min-h-screen bg-white'>
      <Navigation />

      {/* Hero Section */}
      <section className='pt-32 pb-20 px-4 bg-gray-50'>
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
          <div className='grid md:grid-cols-2 gap-8'>
            {projects.map(
              (project, index) =>
                project && (
                  <div key={project.slug} className='group'>
                    <Link href={`/work/${project.slug}`}>
                      <div className='bg-white rounded-2xl overflow-hidden border border-gray-100 transition-shadow hover:shadow-xl'>
                        <div className='relative aspect-video'>
                          <img
                            src={project.imageSrc}
                            alt={project.imageAlt}
                            className='object-cover w-full h-full'
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                        </div>
                        <div className='p-6'>
                          <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-2xl font-bold text-gray-900 group-hover:text-[#21cd99] transition-colors'>
                              {project.title}
                            </h2>
                            <ArrowRight className='w-5 h-5 text-[#21cd99] transform translate-x-0 group-hover:translate-x-2 transition-transform' />
                          </div>
                          <p className='text-gray-600 line-clamp-2'>
                            {project.overview}
                          </p>
                          <div className='mt-4 text-[#21cd99] font-medium'>
                            {project.date}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
