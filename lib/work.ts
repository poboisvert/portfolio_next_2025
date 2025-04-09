import { z } from 'zod';

const RoleAndContributionSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const WorkContentSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  overview: z.string(),
  roleAndContribution: z.array(RoleAndContributionSchema),
  link: z.string().url(),
  imageSrc: z.string().url(),
  imageAlt: z.string(),
});

export type WorkContent = z.infer<typeof WorkContentSchema>;

export const getWorkContentDetail = async (slug: string): Promise<WorkContent | undefined> => {
  const contents: WorkContent[] = [
    {
      slug: "pca-services",
      title: "PCA Services - Corporate Website",
      date: "June 2025",
      overview:
        "Developed a modern corporate website for PCA Services using Next.js and WordPress as a headless CMS. The project focused on creating a performant, SEO-friendly website that effectively showcases their corporate services while maintaining easy content management through WordPress. The headless architecture ensures optimal performance and flexibility while retaining the familiar WordPress admin experience for content editors.",
      roleAndContribution: [
        {
          title: "Headless CMS Architecture",
          description:
            "Implemented WordPress as a headless CMS with Next.js, setting up custom post types, ACF fields, and REST API endpoints for seamless content management and delivery.",
        },
        {
          title: "Performance Optimization",
          description:
            "Utilized Next.js's static site generation and incremental static regeneration features to ensure optimal loading speeds while maintaining dynamic content updates.",
        },
        {
          title: "SEO Implementation",
          description:
            "Implemented comprehensive SEO strategies including structured data, dynamic meta tags, and optimized content delivery for improved search engine visibility.",
        },
        {
          title: "Content Management System",
          description:
            "Developed a user-friendly content management interface in WordPress, allowing easy updates to services, team members, and corporate news without technical knowledge.",
        },
        {
          title: "Responsive Design",
          description:
            "Created a fully responsive design that maintains professional appearance and functionality across all device sizes and screen types.",
        }
      ],
      link: "https://www.pcaservices.ca/",
      imageSrc:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
      imageAlt: "PCA Services Corporate Website",
    },
    {
      slug: "proxim-pharmacie-du-village",
      title: "Pharmacie du Village - Website Optimization",
      date: "October 2024",
      overview:
        "This project focuses on optimizing the WordPress website for Pharmacie du Village. The scope includes content SEO optimization, and strategy, while maintaining the website in line with Google's Core Updates. Additionally, it involves updating and adding features to plugins, ensuring the site remains up-to-date and functional, optimizing front end layout using Elementor to generate CTA in the sales funnel.",
      roleAndContribution: [
        {
          title: "SEO Optimization",
          description:
            "Provided strategy and conducted keyword research to optimize the content for search engines, improving visibility and performance on relevant searches.",
        },
        {
          title: "Plugin Management",
          description:
            "Updated and added new features to existing WordPress plugins to enhance functionality and user experience while maintaining compatibility with the latest WordPress version.",
        },
        {
          title: "Website Maintenance",
          description:
            "Maintained the overall health of the website, ensuring timely updates and monitoring the site's performance against Google's Core Updates to prevent ranking drops.",
        },
        {
          title: "Content Strategy",
          description:
            "Refined the website's content strategy to align with SEO best practices, driving organic traffic and boosting overall engagement.",
        },
      ],
      link: "https://pharmacieduvillage.ca/",
      imageSrc:
        "https://logosandtypes.com/wp-content/uploads/2020/08/proxim-pharmacies.png",
      imageAlt: "Pharmacie du Village - Website Optimization",
    },
    {
      slug: "condollo",
      title: "Condollo - AI Home Valuation",
      date: "2023-2024",
      overview:
        "Developed an innovative AI-powered home valuation system that leverages municipal open data APIs to provide accurate property valuations across Canada. The system combines historical transaction data, property characteristics, and real-time market trends to generate precise valuations, helping users make informed real estate decisions. By integrating municipal assessment data with machine learning algorithms, we've created a robust solution that considers local market dynamics and property-specific features.",
      roleAndContribution: [
        {
          title: "Municipal API Integration",
          description:
            "Developed robust integrations with multiple municipal open data APIs to fetch property assessment data, tax information, and historical transaction records. Implemented data normalization processes to handle varying data formats across different municipalities.",
        },
        {
          title: "AI Valuation Model",
          description:
            "Created a sophisticated machine learning model that combines municipal assessment data with market trends to generate accurate property valuations. The model incorporates features such as property size, location, recent sales, and neighborhood demographics.",
        },
        {
          title: "Data Pipeline Development",
          description:
            "Built automated ETL pipelines to continuously update the valuation model with fresh data from municipal sources. Implemented data validation and cleaning processes to ensure high-quality inputs for the AI model.",
        },
        {
          title: "Real-time Market Analysis",
          description:
            "Developed algorithms to analyze real-time market trends and adjust valuations accordingly. Integrated multiple data sources to provide comprehensive market insights alongside property valuations.",
        },
        {
          title: "User Interface Development",
          description:
            "Designed and implemented an intuitive interface for users to access property valuations and market insights. Created interactive visualizations to help users understand valuation factors and market trends.",
        }
      ],
      link: "https://condollo.com",
      imageSrc:
        "https://i.ibb.co/JsJqjMG/Screenshot-2024-06-19-at-7-48-09-AM.png",
      imageAlt: "Condollo AI Home Valuation",
    },
    {
      slug: "bettingnews",
      title: "Betting News - Sports Analytics Platform",
      date: "Actual",
      overview:
        "Betting News is a comprehensive sports analytics platform that provides users with the latest news, statistics, and insights for various leagues. The platform aims to enhance the betting experience by offering real-time data and analytics.",
      roleAndContribution: [
        {
          title: "Full Stack Developer",
          description:
            "Worked on optimizing the REDIS key value buffer to improve data retrieval speeds and overall application performance.",
        },
        {
          title: "SEO Optimization",
          description:
            "Implemented SEO strategies using Google API Indexing to enhance the platform's visibility and search engine ranking.",
        },
        {
          title: "League Management",
          description:
            "Created new leagues and integrated comprehensive statistics to provide users with detailed insights into their favorite sports.",
        },
      ],
      link: "https://bettingnews.com",
      imageSrc:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/0bbefa70-bc6c-4762-b5aa-73ef28b6c5df-profile_banner-480.png",
      imageAlt: "Betting News Sports Analytics Platform",
    },
    {
      slug: "ladies-night",
      title: "ComediHa! - ladies-night Comedy Show Website",
      date: "October 2022",
      overview:
        "ComediHa! is a project where I created a WordPress theme for the comedy show ladies-night.ca. This theme was built using popular components to ensure easy maintenance and content creation for the 2022 road show.",
      roleAndContribution: [
        {
          title: "WordPress Theme Development",
          description:
            "Designed and developed a custom WordPress theme that leverages reusable components for easy updates and scalability.",
        },
        {
          title: "Content Creation",
          description:
            "Assisted in creating and organizing content for the comedy show's website to promote the 2022 road show.",
        },
      ],
      link: "https://ladies-night.ca",
      imageSrc:
        "https://ladies-night.ca/wp-content/uploads/2022/09/paralax02.jpg",
      imageAlt: "ComediHa! Comedy Show",
    },
  ];

  return contents.find((content) => content.slug === slug);
};