import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getWorkContentDetail } from "@/lib/work";
import Navigation from "@/components/Navigation";

export default async function WorkDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const work = await getWorkContentDetail(slug);

  if (!work) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main className='min-h-screen bg-white py-20'>
        <div className='max-w-4xl mx-auto px-4'>
          <Link
            href='/'
            className='inline-flex items-center text-gray-600 hover:text-[#21cd99] mb-8 group transition-colors'
          >
            <ArrowLeft className='w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1' />
            Back to Home
          </Link>

          <div className='mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              {work.title}
            </h1>
            <div className='flex items-center justify-between flex-wrap gap-4'>
              <span className='text-[#21cd99] font-medium'>{work.date}</span>
              <a
                href={work.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-gray-600 hover:text-[#21cd99] transition-colors'
              >
                Visit Website
                <ExternalLink className='w-4 h-4' />
              </a>
            </div>
          </div>

          <div className='relative aspect-video rounded-2xl overflow-hidden mb-12 border border-gray-100 shadow-lg'>
            <img
              src={work.imageSrc}
              alt={work.imageAlt}
              className='object-cover w-full h-full'
            />
          </div>

          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Project Overview
            </h2>
            <p className='text-gray-600 leading-relaxed'>{work.overview}</p>
          </div>

          <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Roles & Contributions
            </h2>
            <div className='grid gap-6'>
              {work.roleAndContribution.map((role, index) => (
                <div
                  key={index}
                  className='bg-gray-50 rounded-xl p-6 border border-gray-100'
                >
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {role.title}
                  </h3>
                  <p className='text-gray-600'>{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
