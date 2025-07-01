export const getWorkContentDetail = async (slug: string) => {
  const contents = [
    {
      slug: "pomme-olive",
      title: "POMME & OLIVE - Creative Web Agency",
      date: "2024",
      overview:
        "POMME & OLIVE is a creative web agency specializing in modern digital experiences. This project involved creating a sophisticated agency website that showcases their creative capabilities while maintaining excellent performance and user experience.",
      roleAndContribution: [
        {
          title: "Frontend Development",
          description:
            "Developed a modern, responsive website using cutting-edge web technologies, ensuring smooth animations and optimal performance across all devices.",
        },
        {
          title: "Creative Implementation",
          description:
            "Translated creative designs into interactive web experiences, implementing custom animations and micro-interactions that enhance user engagement.",
        },
        {
          title: "Performance Optimization",
          description:
            "Optimized the website for speed and SEO, implementing best practices for Core Web Vitals and ensuring fast loading times.",
        },
        {
          title: "Agency Branding",
          description:
            "Collaborated on implementing the agency's visual identity and brand guidelines throughout the digital experience.",
        },
      ],
      link: "https://pomme-olive.com/",
      imageSrc:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      imageAlt: "POMME & OLIVE Creative Web Agency",
    },
    {
      slug: "pca-services",
      title: "PCA Services - Digital Transformation",
      date: "2024",
      overview:
        "Comprehensive digital transformation project for PCA Services, focusing on modernizing their web presence and improving user experience through advanced web technologies.",
      roleAndContribution: [
        {
          title: "Frontend Development",
          description:
            "Built a modern, responsive website using Next.js and React, ensuring optimal performance across all devices and browsers.",
        },
        {
          title: "UI/UX Design",
          description:
            "Created an intuitive user interface with focus on accessibility and user experience, implementing modern design principles.",
        },
        {
          title: "Performance Optimization",
          description:
            "Implemented advanced optimization techniques to achieve excellent Core Web Vitals scores and fast loading times.",
        },
      ],
      link: "https://pca-services.com",
      imageSrc:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      imageAlt: "PCA Services Digital Transformation",
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
