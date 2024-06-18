import React from "react";
import ItemSoftware from "@/components/item-software";
import ItemTimeline from "@/components/item-timeline";
import NextLink from "@/components/common/nextlink";
import SvgIcon from "@/components/common/svg-icon";
import ContactForm from "@/components/common/contactForm";
import PageWrapper from "@/components/layout";
import { timelineData } from "@/lib/content";
import { profile, tags } from "@/lib/content";
import Carousel from "@/components/carousel";
import { getGithubProject } from "@/lib/fetch";
import { ThemeProvider } from "@/components/context/ThemeContext";

const HomePage = async () => {
  const sectionClassName = "flex flex-col px-4 sm:px-8";
  const skillIconClassName = "inline-block w-12 h-12 sm:w-16 sm:h-16";
  const slides = await getGithubProject();
  return (
    <ThemeProvider>
      <PageWrapper>
        <h1 className='px-4 sm:px-8'>
          Hello, I&apos;m <span className='inline-block'>{profile.name}</span>
        </h1>
        <section className={sectionClassName} aria-label='Summary'>
          <p>
            I&apos;m a <strong>Full Stack developer</strong> experienced in
            building web apps for all kinds of devices. I&apos;m based in
            Montreal, Canada, originally from Quebec City, Canada, where I work
            Full Time as a frontend developer and I also do part-time freelance.
          </p>
          <p>
            My focus right now is on <strong>Python, Next.js 13+</strong> and{" "}
            <strong>Golang</strong>. I also have experience with various other
            technologies.
          </p>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag: any) => (
              <div
                key={tag}
                className='text-midnight dark:text-green rounded p-2 border border-midnight dark:border-green rounded-md'
              >
                {tag}
              </div>
            ))}
          </div>
        </section>
        <section>
          <Carousel timeSecAdvance={3} slides={slides} />
        </section>
        <section className={sectionClassName} aria-labelledby='tech-skills'>
          <h2 id='tech-skills'>Tech Skills</h2>
          <p>
            I frequently use and feel comfortable with the following
            technologies and tools:
          </p>
          <ul className='flex flex-wrap sm:px-4'>
            <ItemSoftware
              hoverClassName='text-python'
              label='Python'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='Python logo'
                  id='icon-python'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-golang'
              label='Golang'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='Golang logo'
                  id='icon-golang'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-next'
              label='Next.js'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='Next.js logo'
                  id='icon-nextjs'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-js'
              label='JavaScript'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='TypeScript logo'
                  id='icon-javascript'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-tsc'
              label='TypeScript'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='TypeScript logo'
                  id='icon-typescript'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-node'
              label='Node.js'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='Node.js logo'
                  id='icon-nodejs'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-redis'
              label='Redis'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='Redis logo'
                  id='icon-redis'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-css'
              label='CSS'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='CSS logo'
                  id='icon-css'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-sass'
              label='Sass'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='Sass logo'
                  id='icon-sass'
                  hidden
                />
              }
            />
            <ItemSoftware
              hoverClassName='text-tailwind'
              label='TailwindCSS'
              icon={
                <SvgIcon
                  className={skillIconClassName}
                  title='Tailwind CSS logo'
                  id='icon-tailwindcss'
                  hidden
                />
              }
            />
          </ul>
        </section>
        <section className={sectionClassName} aria-labelledby='timeline'>
          <h2 id='timeline'>Timeline</h2>
          <ul>
            {timelineData.map((item) => (
              <ItemTimeline
                key={item.date}
                type={item.type}
                date={item.date}
                title={item.title}
              >
                <p>{item.description}</p>
              </ItemTimeline>
            ))}
          </ul>
        </section>
        <section className={sectionClassName} aria-labelledby='contact'>
          <h2 id='contact'>Contact</h2>
          <p>
            If you want to reach out please drop me an{" "}
            <NextLink className='focus-outline' href={`/#contact`}>
              email
            </NextLink>{" "}
            or explore my online presence through the links provided below.
          </p>
        </section>
        <ContactForm />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default HomePage;
