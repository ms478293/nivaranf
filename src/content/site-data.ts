// site-data.ts
import { getBlogPathBySlug } from "@/lib/blog-routes";

export const siteData = {
  logo: "/NivaranLogo.svg",
  foundationName: "Nivaran Foundation",
  tagline: "Empowering Future",
  description: [
    "The Nivaran Foundation empowers communities through transformative healthcare and education initiatives. By addressing critical needs in medical access and quality learning, we create lasting, positive change for those who need it most.",
    "Be a part of the change! Your time, skills, and generosity have the power to transform lives. Whether you volunteer to share your expertise or donate to support our mission, every contribution matters. Together, we can shape a brighter, more equitable future.",
  ],
  stats: [
    { label: "Health Camps Operated", value: "304" },
    { label: "Patients Targeted (Phase-I)", value: "61,200+" },
    { label: "Phase-I Budget", value: "$18M" },
    { label: "Fund Utilization Rate", value: "85%" },
  ],
  buttons: {
    volunteer: "Volunteer",
    donate: "Donate",
  },
};

export const footerData = {
  foundationName: "Nivaran Foundation",
  logo: {
    src: siteData.logo,
    alt: "Nivaran Foundation Logo",
  },
  ourWork: [
    {
      name: "How to Help",
      link: "/how-to-help",
    },
    {
      name: "Ways to Give",
      link: getBlogPathBySlug("how-to-contribute"),
    },
    {
      name: "News and Stories",
      link: "/blogs",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Donate",
      link: "/donate",
    },
  ],
  others: [
    // {
    //   name: "Careers",
    //   link: "/careers",
    // },
    {
      name: "Corporate",
      link: "/corporate",
    },
    {
      name: "Accountability & Transparency",
      link: "/accountability-and-transparency",
    },
    { name: "Financial Reports", link: "/financial-reports" },
    {
      name: "Financial Responsibility",
      link: "/financial-responsibility",
    },
    {
      name: "Belonging and Inclusion",
      link: "/belonging-and-inclusion",
    },
    { name: "Contact Us", link: "/contact-us" },
  ],
};

type CardType = {
  title: string;
  description: string;
  link: string;
  imgSrc: string;
};

export const ProgramData: CardType[] = [
  {
    title: "Healthcare",
    imgSrc: "/images/healthcare.JPG",
    description:
      "Healthcare is our primary focus, with 70% of our funds dedicated to ensuring underserved communities have access to essential medical services. Through Project Sanjeevani, we've operated 304 health camps and are targeting 61,200+ patients across Nepal with services including eye care, dental care, maternal health, and disease prevention.",
    link: "/programs/health",
  },
  {
    title: "Education",
    imgSrc: "/images/education.JPG",
    description:
      "With 30% of our funds dedicated to education, we empower the next generation by ensuring access to quality learning opportunities. Our focus includes improving teacher training and development, enhancing education standards, and providing scholarships to deserving students in underserved communities.",
    link: "/programs/education",
  },
];

export const VisionData: ServiceDataType = {
  title: "Our Vision",
  description:
    "To create a society where every individual, regardless of location, has access to quality healthcare and education — the two pillars that transform lives and break the cycle of poverty.",
  imgUrl: "/images/childWelfare.jpg",
  altImage: "",
};

export type ServiceDataType = {
  title: string;
  imgUrl: string;
  description: string;
  altImage: string;
};

export type InformationDisplayType = {
  imgUrl: string;
  imgAlt: string;
  imageAlignment: "left" | "right";
  paragraphs: string[];
  title: string;
};

export const InformationAboutusData: InformationDisplayType = {
  imgUrl: "NivaranLogo.svg",
  imageAlignment: "left",
  imgAlt: "Image",

  paragraphs: [
    "Nivaran Foundation is passionate about unlocking the potential of communities worldwide to drive meaningful change through healthcare and education. By working together, we can transform lives and address critical challenges such as limited access to medical services and quality education. At the heart of our mission is a vision to tackle the root causes of these issues and build a brighter future for all.",
    "Our approach focuses on two key areas: healthcare and education. We aim to make a tangible difference by setting up community clinics, organizing medical camps, supporting education programs, and empowering families in need. Through Project Sanjeevani alone, we've operated 304 health camps targeting over 61,200 patients.",
    "Thanks to these efforts, we've witnessed remarkable progress across communities: better maternal and child health outcomes, improved literacy rates, and greater empowerment for marginalized groups. The Nivaran Foundation invites individuals and organizations from across the globe to join us in our mission to create positive, lasting change. Together, we can make a global impact!",
  ],
  title: "",
};

export const InformationData: InformationDisplayType[] = [
  {
    imgAlt: "",
    imageAlignment: "left",
    imgUrl: "/nivaranlogo",
    paragraphs: ["a"],
    title: "",
  },
];

export const navBarData: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Healthcare",
    href: "/programs/health",
    description:
      "Providing essential healthcare services to underserved communities worldwide.",
  },
  {
    title: "Project Sanjeevani",
    href: "/sanjeevani",
    description:
      "Our flagship healthcare initiative — 304 camps, 61,200+ patients targeted across Nepal.",
  },
  {
    title: "Education",
    href: "/programs/education",
    description:
      "Improving access to quality education for children in underprivileged areas.",
  },
];

export const howToHelpData: {
  title: string;
  href: string;
}[] = [
  // { title: "Organize Locally", href: "/organize-locally" },
  // { title: "Attend an Event", href: "/attend" },
  { title: "Join Us", href: "/volunteer" },
  { title: "Support Us", href: "/donate" },
];

export const aboutUsData: { title: string; href: string }[] = [
  { title: "Mission and Vision", href: "/about" },
  { title: "Our Journey", href: "/journey" },
  { title: "Financial Reports", href: "/docs" },
  { title: "Diversity and Inclusion", href: "/dei" },
  { title: "FAQ's", href: "/frequently-asked-questions" },
  { title: "Get in Touch", href: "/contact" },
];

export const newsAndStroiesData: {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}[] = [
  { title: "View All", href: "/blogs" },
  {
    title: "Recent Stories",
    href: "/stories",
    children: [
      { title: "Climate Action", href: getBlogPathBySlug("climate-action") },
      {
        title: "Crisis Management",
        href: getBlogPathBySlug("crisis-management"),
      },
      {
        title: "Education and Employement",
        href: getBlogPathBySlug("education-and-empowerement"),
      },
      { title: "Food and Wellness", href: getBlogPathBySlug("food-and-welfare") },
      { title: "Healthcare", href: getBlogPathBySlug("healthcare") },
      {
        title: "Insights and Leadership",
        href: getBlogPathBySlug("insights-and-leadership"),
      },
    ],
  },
  // {
  //   title: "News and Media",
  //   children: [
  //     { title: "Press Releases", href: "/blogs/press-releases" },
  //     { title: "Media Highlights", href: "/blogs/media-highlights" },
  //     {
  //       title: "Press Kit and Resources",
  //       href: "/blogs/press-kit-and-resources",
  //     },
  //   ],
  // },
];

type siteContent = InformationDisplayType[];

export const siteContentData: siteContent = [
  {
    imgUrl: "/images/healthyLifestyle.jpg",
    imageAlignment: "left",
    imgAlt: "Image",

    paragraphs: [
      "At the Nivaran Foundation, we believe that good health is the foundation of a prosperous and equitable world. However, in many underserved communities across the globe, access to quality healthcare remains a significant challenge due to inadequate facilities and a shortage of trained medical professionals.",
      "Through our mobile health clinics, medical camps, and health education initiatives, we deliver essential services directly to those who need them most. By focusing on critical areas such as maternal and child health, nutrition, and disease prevention, we are creating a lasting impact in communities worldwide.",
      "Improving healthcare access is more than just saving lives—it’s about empowering individuals and families to take control of their health and futures. At Nivaran Foundation, we are committed to ensuring that everyone, regardless of location, has the opportunity to live a healthy, fulfilling life.",
    ],
    title: "Improving Health for Families",
  },
  {
    imgUrl: "/images/childrenStudy.JPG",
    imageAlignment: "right",
    imgAlt: "Image",

    paragraphs: [
      "Education is the key to breaking the cycle of poverty and unlocking a brighter, more equitable future. At the Nivaran Foundation, we are dedicated to empowering the next generation of leaders by improving access to quality education for children in underserved communities around the world.",
      "From providing educational resources and teacher training to building infrastructure for schools in remote and underprivileged areas, we ensure that every child has the opportunity to succeed, no matter where they live. Our initiatives help children gain the knowledge and skills they need to thrive in an increasingly interconnected world.",
      "By investing in education, we are not just shaping individual lives—we are building stronger, more resilient communities and paving the way for a prosperous global future.",
    ],
    title: "Empowering Future Through Education",
  },
];

export type ProgramContentType = {
  name: string;
  data: {
    title: string;
    mainParagraphs: string[];
    subContent: {
      title: string;
      subParagraphs: string[];
      imgUrl: string;
      imgAlt: string;
      imgAlignment: "left" | "right";
    }[];
  };
};
export const HealthContent: ProgramContentType = {
  name: "health",
  data: {
    title: "Innovating Healthcare",
    mainParagraphs: [
      "The healthcare challenges faced by rural and underserved communities around the world are deeply rooted, with limited access to essential services and inadequate infrastructure exacerbating health risks, particularly for vulnerable populations. Alarming statistics, such as high rates of waterborne diseases and elevated maternal mortality, highlight the urgent need for a comprehensive and sustainable healthcare approach. Tackling these issues requires not only immediate medical interventions but also long-term solutions that empower communities with the tools and resources to improve their overall health.",
      "At the Nivaran Foundation, we recognize that bridging the healthcare access gap demands a multifaceted approach. Our strategy focuses on providing immediate care through medical camps, as well as implementing long-term solutions such as community clinics, with a special emphasis on vulnerable populations, particularly mothers and children. By integrating these initiatives, we aim to address not only the symptoms of inadequate healthcare but also the root causes, including lack of medical infrastructure, education, and preventive care. Through these programs, we work to ensure that underserved communities worldwide have the support they need to lead healthier, more sustainable lives.",
    ],
    subContent: [
      {
        title: "Community Clinic",
        subParagraphs: [
          "Community clinics are essential for providing basic healthcare services to underserved populations. These clinics are often established in remote or marginalized areas where access to medical facilities is limited or nonexistent. They offer primary healthcare, immunizations, treatment for common illnesses, and preventive care.",
          "At the Nivaran Foundation, we believe that community clinics are pivotal in overcoming healthcare barriers. By strategically placing clinics in underserved areas, we reduce the need for long travels and high medical costs, ensuring essential services are accessible to all. Our clinics are staffed by trained healthcare professionals and supported by local and international organizations, providing continuous care and improving overall health outcomes in these communities.",
        ],
        imgUrl: "/images/doctorWorking.JPG",
        imgAlignment: "left",
        imgAlt: "doctor checking up a patient",
      },

      {
        title: "Medical Camps",
        subParagraphs: [
          "Medical camps are short-term, focused healthcare initiatives designed to deliver specialized medical services to communities in need. These camps are organized periodically and provide services such as general health check-ups, eye care, dental care, and disease screenings. They often include health education sessions to raise awareness about hygiene for common diseases.",
          "Through our medical camps, we bridge the gap in healthcare accessibility, particularly in regions with limited healthcare infrastructure. These camps allow for early detection and treatment of health issues, preventing more severe complications. By fostering awareness and providing direct medical care, we significantly enhance the well-being of community members and promote long-term health improvements.",
        ],
        imgUrl: "/images/generalHealthService.jpg",
        imgAlignment: "right",
        imgAlt: "general health service",
      },
      {
        title: "Maternal and Child Health",
        subParagraphs: [
          "Maternal and child health programs aim to enhance the health and well-being of mothers and children, particularly in underprivileged areas. These initiatives focus on prenatal and nutritional education. They provide support such as vaccination programs, nutritional supplements, and healthcare education to mothers.",
          "At the Nivaran Foundation, we are committed to reducing maternal mortality and improving child health. By focusing on essential factors such as proper nutrition, vaccination, and prenatal care, we help mothers and children overcome the challenges of malnutrition, disease, and inadequate healthcare. Our approach is holistic, ensuring that mothers receive the necessary education and care to raise healthy children, ultimately contributing to the overall health and sustainability of the community.",
        ],
        imgUrl: "/images/maternalHealth.jpg",
        imgAlignment: "left",
        imgAlt: "safe motherhood",
      },
    ],
  },
};

export const EducationContent: ProgramContentType = {
  name: "education",
  data: {
    title: "Innovating Education",
    mainParagraphs: [
      "High dropout rates and limited access to education remain significant barriers to global education. According to UNICEF, approximately 258 million children and youth are out of school, including 59 million children of primary school age and 61 million children of lower secondary school age. Additionally, the global literacy rate is around 86%, with a marked gender disparity: 90% of men are literate compared to 82% of women. This disparity is even more pronounced in regions like Sub-Saharan Africa and South Asia, where girls face disproportionately high barriers to education. These challenges underscore the critical need for interventions aimed at improving educational access, retention, and equality worldwide.",
    ],
    subContent: [
      {
        title: "Quality Education",
        subParagraphs: [
          "Quality education is the foundation for social and economic development. It ensures that students acquire the skills and knowledge needed to thrive in an evolving world. For underprivileged children, quality education is crucial in breaking the cycle of poverty and fostering opportunities. Programs aimed at improving access to quality education focus on building infrastructure, developing innovative curricula, and providing resources to students and schools.",
          "At the Nivaran Foundation, we are committed to improving education outcomes by working to reduce dropout rates and enhance literacy. Our initiatives focus on providing quality education that empowers students, enabling them to overcome barriers and reach their full potential. Through targeted programs and support, we strive to transform the educational landscape for vulnerable communities.",
        ],
        imgUrl: "/images/qualityEducation.jpg",
        imgAlignment: "left",
        imgAlt: "Children Studying",
      },

      {
        title: "Teacher Training",
        subParagraphs: [
          "Empowering educators through training is essential for ensuring the effectiveness of the education system. Well-trained teachers can better engage students, implement innovative teaching methods, and adapt to diverse learning needs. Training programs often include workshops on modern teaching techniques, classroom management, and subject-specific knowledge.",
          "The Nivaran Foundation places a strong emphasis on teacher development, recognizing that educators are key to improving educational quality. By investing in teacher training, we help ensure that teachers in underserved regions have the skills and resources they need to create impactful learning experiences. This investment strengthens the overall education system and improves outcomes for students.",
        ],
        imgUrl: "/images/teacherTraining.jpg",
        imgAlignment: "right",
        imgAlt: "Teachers training",
      },
      {
        title: "Scholarships",
        subParagraphs: [
          "Scholarships play a vital role in providing opportunities for talented but economically disadvantaged students. They reduce financial barriers, enabling students to pursue higher education and achieve their aspirations.",
          "At the Nivaran Foundation, we offer scholarships to deserving students as part of our mission to empower the next generation. By ensuring that financial limitations do not hinder educational opportunities, we help students continue their education and contribute to the development of their communities. Through these scholarships, we aim to unlock potential and foster future leaders.",
        ],
        imgUrl: "/images/scholarship.jpg",
        imgAlignment: "left",
        imgAlt: "Scholarship programs",
      },
    ],
  },
};

export const ChildWelfareContent: ProgramContentType = {
  name: "childwelfare",
  data: {
    title: "Innovating Child Welfare",
    mainParagraphs: [
      "Child labor affects approximately 152 million children globally, with 73 million of them engaged in hazardous work, depriving them of education and a safe childhood (International Labour Organization). In addition, UNICEF reports that 45% of children under five worldwide suffer from malnutrition, leading to stunting and long-term health complications. Early marriages remain a critical issue, with 12 million girls under 18 married each year, despite legal protections in many countries (UNICEF). These alarming statistics underscore the urgent need for global interventions to protect children's rights and ensure their well-being.",
    ],
    subContent: [
      {
        title: "Nutrition Programs",
        subParagraphs: [
          "Nutrition programs are crucial in combating malnutrition and promoting healthy development, particularly among children. At the Nivaran Foundation, we focus on providing access to nutritious meals and supplements for children under five, addressing global malnutrition challenges. According to the World Health Organization, 45% of children under five worldwide suffer from malnutrition, which leads to stunting and long-term health issues. Our programs often include school-based meal initiatives and community nutrition workshops. By ensuring proper dietary intake, we contribute to improving child health, reducing mortality, and promoting long-term physical and cognitive development.",
        ],
        imgUrl: "/images/nutritionProgram.jpg",
        imgAlignment: "left",
        imgAlt: "nutrition programs",
      },

      {
        title: "Child Protection",
        subParagraphs: [
          "Child protection programs are crucial for safeguarding children from abuse, exploitation, and neglect. The Nivaran Foundation is dedicated to creating safe environments and advocating for children's rights. Our efforts include awareness campaigns, legal assistance, and rehabilitation support for affected children. By addressing the root causes of vulnerability, such as poverty and lack of education, our child protection initiatives aim to build resilience and ensure every child can grow up in a secure, nurturing environment.",
        ],
        imgUrl: "/images/childProtection.jpg",
        imgAlignment: "right",
        imgAlt: "child protection",
      },
      {
        title: "Family Support",
        subParagraphs: [
          "Family support programs are designed to strengthen the stability of vulnerable families, especially those in impoverished areas. The Nivaran Foundation provides resources such as counseling, parenting education, and financial assistance to help families overcome challenges. We also offer microfinance opportunities and skills training to empower families economically. These programs not only address immediate needs but also promote long-term self-reliance, enabling parents to provide better care and opportunities for their children, fostering stronger and healthier communities.",
        ],
        imgUrl: "/images/familySupport.jpg",
        imgAlignment: "left",
        imgAlt: "family support",
      },
    ],
  },
};

export const EnvironmentContent: ProgramContentType = {
  name: "environment",
  data: {
    title: "Innovating Environment Stewardship",
    mainParagraphs: [
      "The world faces significant environmental challenges, including rapid deforestation, with approximately 10 million hectares of forest lost annually, or 0.2% of global forest cover (FAO). Waste management is a growing concern, as globally, over 40% of waste in urban areas is not properly managed or recycled (World Bank). Additionally, the World Wildlife Fund (WWF) reports that 1 million species worldwide are at risk of extinction due to habitat destruction, threatening biodiversity. These pressing issues underscore the urgent need for sustainable practices and conservation efforts to protect the planet’s natural resources and ecosystems.",
    ],
    subContent: [
      {
        title: "Reforestation and Conservation Efforts",
        subParagraphs: [
          "Reforestation and conservation are essential to addressing environmental challenges such as deforestation and climate change. These initiatives restore degraded ecosystems, promote biodiversity, and preserve natural habitats. Reforestation helps combat soil erosion, improves water cycles, and acts as a carbon sink to reduce greenhouse gases. Conservation programs protect endangered species and fragile ecosystems, ensuring environmental balance. The Nivaran Foundation is dedicated to advancing these efforts, supporting sustainable environmental practices for a healthier, more resilient future.",
        ],
        imgUrl: "/images/reforestation.jpg",
        imgAlignment: "left",
        imgAlt: "reforestation program",
      },

      {
        title: "Promoting Sustainable Agriculture Practices",
        subParagraphs: [
          "Sustainable agriculture focuses on meeting the current need for food production while preserving resources for the future. This includes practices such as organic farming, crop rotation, and efficient water management, all of which reduce environmental degradation. Sustainable techniques improve soil fertility, decrease pollution, and promote biodiversity. At the Nivaran Foundation, we work to educate farmers and communities on adopting eco-friendly methods, empowering them to increase productivity while protecting the environment.",
        ],
        imgUrl: "/images/Vegetables.JPG",
        imgAlignment: "right",
        imgAlt: "sustainably grown vegetables",
      },
      {
        title: "Raising Awareness",
        subParagraphs: [
          "Raising awareness is key to fostering collective action against environmental issues like pollution, deforestation, and climate change. Our awareness campaigns educate communities on the consequences of environmental neglect and the importance of conservation. Through educational workshops, media outreach, and community engagement, we encourage individuals to adopt sustainable practices. At the Nivaran Foundation, we believe that raising awareness empowers communities to take responsibility for the environment, leading to greater support for large-scale conservation initiatives.",
        ],
        imgUrl: "/images/childPlanting.jpg",
        imgAlignment: "left",
        imgAlt: "a child planting a small plant",
      },
    ],
  },
};

export const CommunityContent: ProgramContentType = {
  name: "community",
  data: {
    title: "Innovating Community Development",
    mainParagraphs: [
      "Around 9.2% of the global population lives below the international poverty line of $1.90 a day (World Bank), facing significant economic hardship. Many countries also struggle with high unemployment rates, with the global average unemployment rate at around 6.5%, and underemployment affecting up to 13.2% of the working population (International Labour Organization). Additionally, approximately 13% of rural households worldwide lack access to electricity, hindering economic development and quality of life (International Energy Agency). These interconnected challenges highlight the urgent need for economic empowerment, job creation, and improved infrastructure to lift communities out of poverty and ensure access to essential services.",
    ],
    subContent: [
      {
        title: "Community Meetings",
        subParagraphs: [
          "Community meetings are a vital tool for fostering collaboration and engagement within communities. They provide a platform for individuals to come together, voice their concerns, and collectively work toward solutions. These meetings serve as a forum for gathering input on development initiatives, ensuring that projects are aligned with the real needs of the community. They also promote transparency and consensus-building, which are essential for cultivating trust and encouraging active participation. By providing a space for dialogue, community meetings help strengthen ownership of initiatives, empowering individuals to take an active role in their community’s progress.",
        ],
        imgUrl: "/images/teamWorking.JPG",
        imgAlignment: "left",
        imgAlt: "Team meeting program",
      },

      {
        title: "Capacity Building",
        subParagraphs: [
          "Capacity building focuses on equipping individuals and communities with the skills, knowledge, and resources needed for sustainable self-reliance. At the Nivaran Foundation, we implement targeted training programs that help individuals develop critical skills, such as leadership, financial literacy, and technical expertise, enabling them to address local challenges. We emphasize empowering marginalized groups, providing them with the tools to become active contributors to their community’s development. This approach strengthens social structures, fosters independence, and creates resilient communities capable of managing and sustaining their growth.",
        ],
        imgUrl: "/images/boat.jpeg",
        imgAlignment: "right",
        imgAlt: "boat crossing body of water",
      },
      {
        title: "Microfinance Programs",
        subParagraphs: [
          "Microfinance programs are a cornerstone of economic empowerment and poverty alleviation. By offering small loans, savings options, and other financial services, these programs empower individuals and families to start or expand small businesses. Microfinance helps improve livelihoods and strengthens financial inclusion by reaching underserved populations who lack access to traditional banking services. These programs contribute to sustainable economic growth, enabling recipients to generate steady incomes, support education, and improve their overall quality of life. The Nivaran Foundation is proud to support these initiatives, driving long-term change and empowerment in vulnerable communities.",
        ],
        imgUrl: "/images/environment.jpg",
        imgAlignment: "left",
        imgAlt: "microfinance program",
      },
    ],
  },
};

export type ProgramEventDataType = {
  title: string;
  description: string;
  data: {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
  }[];
};

export const BOTTOM_FOOTER = [
  {
    id: 1,
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    id: 1,
    name: "Terms of Service",
    link: "/terms-of-service",
  },
  {
    id: 1,
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
];
