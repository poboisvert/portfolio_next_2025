import { getWorkContentDetail } from "@/lib/fetch";
import Image from "next/image";
import { notFound } from "next/navigation";

export type paramsType = Promise<{ slug: string }>;

export default async function Page(props: { params: paramsType }) {
  const { slug } = await props.params;
  const content = await getWorkContentDetail(slug);

  if (!content) {
    notFound();
  }

  return (
    <div className='grid grid-cols-[1fr,min(75ch,100%),1fr] [&>*]:col-[2] min-h-[calc(100vh-13.25rem)]'>
      <main className='py-8'>
        <h1 className='text-3xl font-bold mb-4'>{content.title}</h1>

        <p className='text-gray-600 mb-6'>{content.date}</p>

        <div className='grid grid-cols-1 gap-6'>
          <a href={content.link} className='block p-6'>
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              width={200}
              height={200}
              className='mb-4'
            />
            <div className='mb-4'>
              <h2 className='text-xl font-semibold'>Project Overview:</h2>
              <p className='text-gray-700'>{content.overview}</p>
            </div>

            <h2 className='text-xl font-semibold mb-2'>
              My role and contribution
            </h2>
            <ul className='list-disc list-inside'>
              {content.roleAndContribution.map((item, index) => (
                <li className='mb-2' key={index}>
                  <strong>{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </a>
        </div>
      </main>
    </div>
  );
}
