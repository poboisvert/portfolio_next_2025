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

export const getWorkContentDetail = async (slug: string) => {
  const contents = [
    {
      slug: "proxim-pharmacie-du-village",
      title: "Pharmacie du Village - Website Optimization",
      date: "October 2024",
      overview:
        "This project focuses on optimizing the WordPress website for Pharmacie du Village. The scope includes content SEO optimization, keyword research, and strategy, while maintaining the website in line with Google's Core Updates. Additionally, it involves updating and adding features to plugins, ensuring the site remains up-to-date and functional.",
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
            "Maintained the overall health of the website, ensuring timely updates and monitoring the site’s performance against Google's Core Updates to prevent ranking drops.",
        },
        {
          title: "Content Strategy",
          description:
            "Refined the website’s content strategy to align with SEO best practices, driving organic traffic and boosting overall engagement.",
        },
      ],
      link: "https://pharmacieduvillage.ca/",
      imageSrc:
        "https://logosandtypes.com/wp-content/uploads/2020/08/proxim-pharmacies.png", // Replace with actual image URL if available
      imageAlt: "Pharmacie du Village - Website Optimization",
    },
    {
      slug: "condollo",
      title: "Condollo - AI Home Valuation",
      date: "2023-2024",
      overview:
        "AI Home Valuation is an innovative project aimed at providing accurate home valuations across Canada. By leveraging advanced AI algorithms, the project analyzes recent listings to generate reliable property valuations, helping users make informed real estate decisions.",
      roleAndContribution: [
        {
          title: "Full Stack Developer",
          description:
            "Collaborated with an external designer to create a user-friendly interface that enhances the user experience for home valuation inquiries.",
        },
        {
          title: "API Research",
          description:
            "Conducted extensive research on API schema to ensure seamless integration and data retrieval for home valuation processes.",
        },
        {
          title: "Supabase API Development",
          description:
            "Developed a Supabase API RPC function to facilitate efficient data handling and processing for the valuation model.",
        },
        {
          title: "Model Creation",
          description:
            "Created a basic model to generate home valuations based on recent listings, ensuring accuracy and reliability in the valuation process.",
        },
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

  const content = contents.find((item) => item.slug === slug);
  return content || null;
};
