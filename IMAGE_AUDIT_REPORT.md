# Nivaran Foundation — Complete Image Audit Report

**Date:** March 1, 2026  
**Scope:** All source files (tsx, ts, jsx, js, mdx, md, css) + public/ directory  

---

## SUMMARY

| Category | Count |
|---|---|
| **Stock/External (REPLACEABLE)** | ~155 images |
| **Brand Assets (DO NOT REPLACE)** | ~14 images |
| **UI Elements (CASE BY CASE)** | ~18 images |
| **Auto-Generated News Images** | ~78 images |
| **Total image files in public/** | ~235 files |

---

## 1. STOCK/EXTERNAL IMAGES — REPLACEABLE WITH AI-GENERATED

### 1A. Hero Section Images (HIGH PRIORITY)
| File Path | Used In | Description |
|---|---|---|
| `public/hero_img/hero_img_1.avif` | HeroSection.tsx | Main hero banner image #1 |
| `public/hero_img/hero_img_1.webp` | HeroSection.tsx | WebP fallback for hero #1 |
| `public/hero_img/hero_img_2.avif` | HeroSection.tsx | Hero banner image #2 |
| `public/hero_img/hero_img_2.webp` | HeroSection.tsx | WebP fallback for hero #2 |
| `public/hero_img/hero_img_3.avif` | HeroSection.tsx | Hero banner image #3 |
| `public/hero_img/hero_img_3.webp` | HeroSection.tsx | WebP fallback for hero #3 |
| `public/hero_img/hero_img_1_v1.avif` | Unused variant | Hero variant v1 |
| `public/hero_img/hero_img_1_v2.avif` | Unused variant | Hero variant v2 |
| `public/hero_img/hero_img_1_v3.avif` | Unused variant | Hero variant v3 |
| `public/hero_img/hero_img_1_branded.avif` | Unused variant | Branded hero variant |
| `public/hero_img/hero_img_1_scene.avif` | Unused variant | Scene hero variant |
| `public/hero_img/hero_img_1_test.avif` | Unused variant | Test hero variant |

### 1B. About Section Images (HIGH PRIORITY)
| File Path | Used In | Description |
|---|---|---|
| `public/about/about_img_7.png` | AboutNivaran.tsx | About section photo |
| `public/about/about_img_10.png` | AboutNivaran.tsx | About section photo |
| `public/about/about_img_1.png` | Not directly referenced | About gallery |
| `public/about/about_img_2.png` | Not directly referenced | About gallery |
| `public/about/about_img_3.png` | Not directly referenced | About gallery |
| `public/about/about_img_4.png` | Not directly referenced | About gallery |
| `public/about/about_img_5.png` | Not directly referenced | About gallery |
| `public/about/about_img_6.png` | Not directly referenced | About gallery |
| `public/about/about_img_8.avif` | Not directly referenced | About gallery |
| `public/about/about_img_8.png` | Not directly referenced | About gallery |
| `public/about/about_img_9.png` | Not directly referenced | About gallery |
| `public/about/about_img_11.png` | Not directly referenced | About gallery |
| `public/why-nivaran/about-cover.jpeg` | about/page.tsx, SmallProjectsMegaMenu.tsx | About page cover/hero |

### 1C. About Timeline / Story Images (HIGH PRIORITY — org history photos)
| File Path | Used In | Description |
|---|---|---|
| `public/about-timeline/story-1.jpeg` | story-content.ts → About page | Timeline story photo 1 |
| `public/about-timeline/story-2.jpeg` | story-content.ts → About page | Timeline story photo 2 |
| `public/about-timeline/story-3.jpeg` | story-content.ts → About page | Timeline story photo 3 |
| `public/about-timeline/story-4.png` | story-content.ts → About page | Timeline story photo 4 |
| `public/about-timeline/story-5.jpeg` | story-content.ts → About page | Timeline story photo 5 |
| `public/about-timeline/story-6.png` | story-content.ts → About page | Timeline story photo 6 |

### 1D. Sanjeevani Project Images (HIGH PRIORITY)
| File Path | Used In | Description |
|---|---|---|
| `public/sanjeevani/sanjeevani-1.png` | UpcomingProjects.tsx, SmallProjectsMegaMenu.tsx, TargetedResults.tsx, projects/page.tsx | Sanjeevani project hero |
| `public/sanjeevani/sanjeevani-2.png` | TargetedResults.tsx | Sanjeevani project photo 2 |
| `public/sanjeevani/sanjeevani-3.png` | TargetedResults.tsx | Sanjeevani project photo 3 |
| `public/bg-sanjeevani.jpeg` | ProjectsDisplay.tsx, sanjeevani/page.tsx | Sanjeevani background |

### 1E. Project Hero & Impact Images (HIGH PRIORITY)
| File Path | Used In | Description |
|---|---|---|
| `public/projects/images/projectNurtureHero.jpg` | nurture.mdx blog | Project Nurture hero photo |
| `public/projects/images/projectTerraHero.jpg` | terra.mdx blog | Project Terra hero photo |
| `public/projects/images/projectUnityHero.jpg` | unity.mdx blog | Project Unity hero photo |
| `public/projects/images/projectVidyaHero.jpg` | vidya.mdx, SmallProjectsMegaMenu.tsx, projects/page.tsx, upcoming-projects.ts | Project Vidya hero photo |
| `public/projects/images/nurtureImpactGoals.png` | nurture.mdx | Nurture impact goals infographic |
| `public/projects/images/terraImpactGoals.png` | terra.mdx | Terra impact goals infographic |
| `public/projects/images/unityImpactGoals.png` | unity.mdx | Unity impact goals infographic |
| `public/projects/images/vidyaImpactGoals.png` | vidya.mdx | Vidya impact goals infographic |

### 1F. Why Nivaran Section Images (HIGH PRIORITY)
| File Path | Used In | Description |
|---|---|---|
| `public/why-nivaran/why-nivaran-2.png` | WhyNIvaran.tsx | Why Nivaran section photo 2 |
| `public/why-nivaran/why-nivaran-3.png` | WhyNIvaran.tsx | Why Nivaran section photo 3 |
| `public/why-nivaran/why-nivaran-4.png` | WhyNIvaran.tsx, SidebarComponent.tsx | Why Nivaran section photo 4 |

### 1G. Carousel Images (HIGH PRIORITY)
| File Path | Used In | Description |
|---|---|---|
| `public/carousel/1.jpg` | Not directly referenced | Carousel slide 1 |
| `public/carousel/2.jpg` | Not directly referenced | Carousel slide 2 |
| `public/carousel/3.jpg` | Not directly referenced | Carousel slide 3 |
| `public/carousel/4.jpg` | HeroCarousel.tsx | Carousel slide 4 |
| `public/carousel/5.jpg` | HeroCarousel.tsx | Carousel slide 5 |
| `public/carousel/6.jpg` | HeroCarousel.tsx | Carousel slide 6 |

### 1H. DEI Page Images
| File Path | Used In | Description |
|---|---|---|
| `public/dei/dei.png` | dei/page.tsx | DEI main illustration |
| `public/dei/dei-nepal.png` | dei/page.tsx | DEI Nepal-specific illustration |

### 1I. Counting Happiness Section
| File Path | Used In | Description |
|---|---|---|
| `public/counting_happiness/count_happiness_1.png` | NivaranHappiness.tsx | Happiness counter photo 1 |
| `public/counting_happiness/count_happiness_2.png` | NivaranHappiness.tsx | Happiness counter photo 2 |
| `public/counting_happiness/count_happiness_3.jpg` | NivaranHappiness.tsx | Happiness counter photo 3 |

### 1J. Donation Section
| File Path | Used In | Description |
|---|---|---|
| `public/donation-banner-image.png` | DonationBanner.tsx | Donation banner hero image |
| `public/stories_and_insights-1.png` | DonationBlock.tsx | Stories & insights card 1 |
| `public/stories_and_insights-1.webp` | (webp variant) | Stories & insights card 1 |
| `public/stories_and_insights-2.png` | DonationBlock.tsx | Stories & insights card 2 |
| `public/stories_and_insights-2.webp` | (webp variant) | Stories & insights card 2 |

### 1K. USA Chapter Images
| File Path | Used In | Description |
|---|---|---|
| `public/usa/1.png` | CarasoulCard.tsx, editor configurators | USA carousel card 1 |
| `public/usa/2.png` | CarasoulCard.tsx | USA carousel card 2 |
| `public/usa/3.png` | CarasoulCard.tsx | USA carousel card 3 |
| `public/usa/4.png` | CarasoulCard.tsx | USA carousel card 4 |
| `public/usa/5.png` | CarasoulCard.tsx | USA carousel card 5 |
| `public/usa/6.png` | CarasoulCard.tsx | USA carousel card 6 |
| `public/usa/7.png` | CarasoulCard.tsx | USA carousel card 7 |
| `public/usa/fire.jpeg` | InfoGraphicContainer.tsx | California wildfire photo |
| `public/usa/flag.webp` | _usa/layout.tsx (background) | USA flag background |

### 1L. Program Page Stock Photos (in `/images/` — used by site-data.ts)
| File Path | Used In | Description |
|---|---|---|
| `public/images/healthcare.jpg` (.JPG) | site-data.ts (Health program) | Healthcare stock photo |
| `public/images/education.JPG` | site-data.ts (Education program) | Education stock photo |
| `public/images/childWelfare.jpg` | site-data.ts (Child Welfare) | Child welfare stock photo |
| `public/images/healthyLifestyle.jpg` | site-data.ts | Healthy lifestyle photo |
| `public/images/childrenStudy.JPG` | site-data.ts, EyeShapedCardList.tsx | Children studying photo |
| `public/images/doctorWorking.JPG` | site-data.ts, dental-health blog | Doctor working photo |
| `public/images/generalHealthService.jpg` | site-data.ts, posts.ts (default thumbnail), blogs | General health service photo |
| `public/images/maternalHealth.jpg` | site-data.ts, womens-health blog | Maternal health photo |
| `public/images/qualityEducation.jpg` | site-data.ts, why-rural-schools blog | Quality education photo |
| `public/images/teacherTraining.jpg` | site-data.ts | Teacher training photo |
| `public/images/scholarship.jpg` | site-data.ts | Scholarship photo |
| `public/images/nutritionProgram.jpg` | site-data.ts | Nutrition program photo |
| `public/images/childProtection.jpg` | site-data.ts | Child protection photo |
| `public/images/familySupport.jpg` | site-data.ts | Family support photo |
| `public/images/reforestation.jpg` | site-data.ts | Reforestation photo |
| `public/images/Vegetables.JPG` | site-data.ts | Vegetables/farming photo |
| `public/images/childPlanting.jpg` | site-data.ts | Child planting trees photo |
| `public/images/teamWorking.JPG` | site-data.ts | Team working photo |
| `public/images/boat.jpeg` | site-data.ts | Boat/river photo |
| `public/images/environment.jpg` | site-data.ts | Environment photo |
| `public/images/healthGroup.jpg` | EyeShapedCardList.tsx, building-healthcare blog | Health group photo |
| `public/images/oldWomen.jpg` | HelpImage.tsx | Old women photo |
| `public/images/babyHome.jpg` | HelpImage.tsx | Baby home photo |

### 1M. Infographic Section (stock photos within)
| File Path | Used In | Description |
|---|---|---|
| `public/infographic/diversityAndInclusion.jpg` | Not directly referenced | D&I stock photo |
| `public/infographic/groupMultiethnic.jpg` | Not directly referenced | Multiethnic group stock |
| `public/infographic/partnership.png` | Not directly referenced | Partnership stock |

### 1N. Alternative/Fallback Images
| File Path | Used In | Description |
|---|---|---|
| `public/altImage/1 (1).jpg` | Not directly referenced | Alt image fallback |
| `public/altImage/3.jpg` | Not directly referenced | Alt image fallback |
| `public/altImage/5.jpg` | Not directly referenced | Alt image fallback |
| `public/altImage/childPath.jpg` | education/page.tsx (altImage) | Education alt image |
| `public/altImage/childWelfare.jpg` | Not directly referenced | Child welfare alt |
| `public/altImage/environment.jpg` | Not directly referenced | Environment alt |
| `public/altImage/healthCare.jpg` | health/page.tsx (altImage) | Healthcare alt image |

### 1O. Blog Inline Images (`/blogs/images/`)
| File Path | Used In | Description |
|---|---|---|
| `public/blogs/images/aNepaliDoctor.jpg` | reimagining-nepals-healthcare.mdx | Nepali doctor photo |
| `public/blogs/images/aTuberculosisPatient.png` | tuberculosis-in-nepal.mdx | TB patient photo |
| `public/blogs/images/breakingTheStigma.png` | mental-health-awareness.mdx | Mental health stigma image |
| `public/blogs/images/californiaFireman.jpg` | california-wildfire.mdx | CA fireman photo |
| `public/blogs/images/caliWildfire.jpeg` | california-wildfire.mdx | Wildfire photo |
| `public/blogs/images/childrenAndAirPollution.png` | silent-struggles-asthma.mdx | Children & air pollution |
| `public/blogs/images/childrenCrisisMap.png` | Not directly referenced | Crisis map graphic |
| `public/blogs/images/childrenInSwing.jpeg` | protecting-children-crisis.mdx | Children in swing photo |
| `public/blogs/images/childrenWorking.jpg` | next-giant-leap.mdx | Children working photo |
| `public/blogs/images/conflictMapChildren.png` | protecting-children-crisis.mdx | Conflict map infographic |
| `public/blogs/images/epidemic.jpg` | nepals-healthcare-revolution.mdx | Epidemic photo |
| `public/blogs/images/foodInsecurity.jpg` | food-insecurity-america.mdx | Food insecurity photo |
| `public/blogs/images/group-pressc.jpg` | Not directly referenced | Press conference group |
| `public/blogs/images/healthcareReformFiles.jpg` | nepals-healthcare-transformation.mdx | Healthcare reform photo |
| `public/blogs/images/healthInsurance.jpg` | nepals-health-insurance-scheme.mdx | Health insurance photo |
| `public/blogs/images/mapFoodInsecurity.png` | food-insecurity-america.mdx | Food insecurity map |
| `public/blogs/images/medicalTeam.jpeg` | beyond-the-clinic-walls.mdx | Medical team photo |
| `public/blogs/images/mentalHealthAtlasInfo.png` | mental-health-awareness.mdx | Mental health atlas graphic |
| `public/blogs/images/mothersWithBabies.jpg` | maternal-health-nepal.mdx | Mothers with babies photo |
| `public/blogs/images/nepaliVillageInHills.jpg` | mental-health-himalayas.mdx | Nepali village photo |
| `public/blogs/images/ngozumpaGlacier.jpg` | climate-change-health-nepal.mdx | Glacier photo |
| `public/blogs/images/seniorCitizens.jpeg` | growing-old-in-nepal.mdx | Senior citizens photo |
| `public/blogs/images/telemedicineConsultation.jpg` | digital-health-revolution.mdx | Telemedicine photo |
| `public/blogs/images/templeInTheHills.jpg` | urban-vs-rural.mdx | Temple in hills photo |
| `public/blogs/images/theHeartOfGiving.jpg` | the-heart-of-giving.mdx | Heart of giving photo |
| `public/blogs/images/trendsFoodInsecurity.png` | food-insecurity-america.mdx | Food trends chart |

### 1P. Blog Thumbnails (`/blogs/thumbnail/`)
| File Path | Used In | Description |
|---|---|---|
| `public/blogs/thumbnail/childrenInGroup.jpg` | Not directly referenced | Children group thumbnail |
| `public/blogs/thumbnail/doctorUsingLaptop.jpeg` | Not directly referenced | Doctor using laptop |
| `public/blogs/thumbnail/foodInsecurityThumbnail.png` | listofblogs.ts | Food insecurity thumbnail |
| `public/blogs/thumbnail/healthcareReform.jpg` | Not directly referenced | Healthcare reform thumb |
| `public/blogs/thumbnail/healthcareTransformation.jpg` | Not directly referenced | Healthcare transform thumb |
| `public/blogs/thumbnail/kidInWarzone.jpeg` | Not directly referenced | Kid in warzone thumb |
| `public/blogs/thumbnail/mentalCrisis.jpg` | Not directly referenced | Mental crisis thumbnail |
| `public/blogs/thumbnail/mentalHealthAwarenessThumbnail.png` | Not directly referenced | Mental health thumb |
| `public/blogs/thumbnail/nepaleseChildren.jpg` | bridging-the-digital-divide.mdx | Nepalese children thumb |
| `public/blogs/thumbnail/oldWomen.jpg` | Not directly referenced | Old women thumbnail |
| `public/blogs/thumbnail/ruralSetting.jpg` | Not directly referenced | Rural setting thumbnail |
| `public/blogs/thumbnail/wildfireThumbnail.jpg` | listofblogs.ts | Wildfire thumbnail |

### 1Q. Article Section Images (`/articles/images/`)
| File Path | Used In | Description |
|---|---|---|
| `public/articles/images/belonging-and-inclusion.jpg` | belonging-and-inclusion.mdx | Belonging & inclusion photo |
| `public/articles/images/climate-action.webp` | climate-action.mdx | Climate action photo |
| `public/articles/images/community-clinic.jpg` | cost-of-doing-nothing.mdx, accountability.mdx | Community clinic photo |
| `public/articles/images/contribute.jpeg` | how-to-help.mdx | Contribute photo |
| `public/articles/images/crisis-management.jpg` | crisis-management.mdx | Crisis management photo |
| `public/articles/images/education-and-empowerement.jpg` | education-and-empowerement.mdx | Education empowerment photo |
| `public/articles/images/financial-responsibility.jpg` | financial-responsibility.mdx, from-boston-to-kathmandu.mdx | Financial responsibility photo |
| `public/articles/images/food-and-welfare.jpg` | food-and-welfare.mdx | Food and welfare photo |
| `public/articles/images/genz-image.webp` | genz-revolution.mdx | Gen Z revolution photo |
| `public/articles/images/healthcare.jpg` | healthcare.mdx, rural-healthcare-crisis.mdx | Healthcare article photo |
| `public/articles/images/how-to-contribute.jpg` | Not directly referenced | How to contribute photo |
| `public/articles/images/insights-and-leadership.jpg` | insights-and-leadership.mdx | Insights & leadership photo |
| `public/articles/images/nepalese-children.jpg` | Not directly referenced | Nepalese children photo |
| `public/articles/images/ways-to-give.jpg` | how-to-contribute.mdx | Ways to give photo |

### 1R. Miscellaneous Stock/External
| File Path | Used In | Description |
|---|---|---|
| `public/loading/1.jpg` | DialogOpener.tsx | Loading screen photo |
| `public/backgrounds/whitePattern.jpg` | Not directly referenced | White pattern background |
| `public/AandT/handshake.png` | Not directly referenced | Handshake stock photo |

### 1S. External URLs (Stock images hosted elsewhere)
| URL | Used In |
|---|---|
| `https://i.ibb.co/WDy6Kr9/cover.jpg` | Introduction.tsx (About) |
| `https://i.ibb.co/Np2QyV5/girl.jpg` | Vision.tsx (About) |

---

## 2. AUTO-GENERATED NEWS IMAGES (AI-GENERATED ALREADY — ~78 files)

These are already AI-generated for the automated news pipeline:

### 2A. Archive Images (`/images/archive/2026/`) — 51 files
Daily Nepal health stories, each with AI-generated illustration (e.g., `2026-01-02-bhadrapur-airport.jpg`, `2026-01-03-the-grey-blanket-why-fog-is-a-medical-emergency.jpg`, etc.)

### 2B. Global News Images (`/images/global-news/2026/`) — 23 files
Global health/education news AI-generated thumbnails (Sudan crisis, Greenland healthcare, school food frameworks, etc.)

### 2C. Nepal News Images (`/images/nepal-news/2026/`) — 4 files
Nepal-specific news AI-generated thumbnails (measles response, civic education, etc.)

### 2D. Other AI/Placeholder blog images
| File Path | Used In | Description |
|---|---|---|
| `public/images/ai-at-scale-inclusion-gap-global-development.jpg` | AI at scale blog | AI-generated |
| `public/images/bridging-diabetes-divide-wechat-health-education.png` | Diabetes divide blog | AI-generated |
| `public/images/digital-classroom-nepal.png` | Digital classrooms blog | AI-generated |
| `public/images/global-health-inequities-unseen-barriers.jpg` | Global health inequities blog | AI-generated |
| `public/images/the-cloud-as-a-catalyst-for-health-equity-aws-initiative.jpg` | Cloud catalyst blog | AI-generated |
| `public/images/the-grand-ambition-global-health-challenges.jpg` | Grand ambition blog | AI-generated |
| `public/images/placeholder-image-for-nivaran.webp` | Multiple blogs (default) | Placeholder |
| `public/images/gaurssa.png` | Not directly referenced | Unknown |

---

## 3. BRAND ASSETS — DO NOT REPLACE

| File Path | Used In | Description |
|---|---|---|
| `public/NivaranLogo.svg` | NivaranHeader.tsx, SidebarComponent.tsx, NavBarUsa.tsx, about/page.tsx, site-data.ts | Main Nivaran logo |
| `public/logo.png` | layout.tsx (OG/meta), email-templates.ts, page.tsx (OG image) | Logo for OG/meta/email |
| `public/logo_img.jpg` | layout.tsx (schema.org) | Logo for structured data |
| `public/small_logo.png` | BlogDetailPage.tsx | Small logo in blog footer |
| `public/logo/nivaranLogo.svg` | Not directly referenced | Logo variant |
| `public/usa/NivaranLogoUSA.svg` | HeaderUsa.tsx | USA chapter logo |
| `public/heart.png` | SidebarComponent.tsx | Nivaran heart icon |
| `public/nepali-flag.png` | ContactCardList.tsx | Nepal flag icon |
| `public/usa-flag.png` | ContactCardList.tsx | USA flag icon |
| `public/worldMap.svg` | ContactMap.tsx (imported) | World map for contact section |
| `public/worldMap.png` | Not directly referenced | World map raster variant |
| `public/nepal/Nepal Map.svg` | NepalMap.tsx (imported) | Nepal map SVG |
| `public/nivaran_word.png` | volunteer/page.tsx, donate/page.tsx (bg) | "Nivaran" word mark |
| `public/navbar-bg.png` | MegaMenuLayout.tsx (bg) | Navbar background pattern |

---

## 4. UI ELEMENTS — CASE BY CASE

### 4A. SVG Illustrations / Infographics (keep or redesign)
| File Path | Used In | Description |
|---|---|---|
| `public/infographic/whatwedone.svg` | Stats.tsx | "What we've done" SVG infographic |
| `public/infographic/contact.svg` | ContactImage.tsx | Contact page SVG illustration |
| `public/backgrounds/education.svg` | education/page.tsx (bg) | Education background SVG pattern |
| `public/backgrounds/healthcare.svg` | health/page.tsx (bg) | Healthcare background SVG pattern |
| `public/backgrounds/buildingNivaran.svg` | Not directly referenced | Building illustration |
| `public/backgrounds/childwelfare.svg` | Not directly referenced | Child welfare illustration |
| `public/backgrounds/community.svg` | Not directly referenced | Community illustration |
| `public/backgrounds/environment.svg` | Not directly referenced | Environment illustration |
| `public/backgrounds/faq1.svg` | Not directly referenced | FAQ illustration 1 |
| `public/backgrounds/faq2.svg` | Not directly referenced | FAQ illustration 2 |
| `public/backgrounds/faq3.svg` | Not directly referenced | FAQ illustration 3 |

### 4B. Animated GIFs
| File Path | Used In | Description |
|---|---|---|
| `public/loading/render.gif` | LoadingScreen.tsx | Loading animation |
| `public/backgrounds/happy.gif` | DonateComponent.tsx (bg) | Happy background GIF |
| `public/gifs/childPath.gif` | education/page.tsx | Education program GIF |
| `public/gifs/healthcare.gif` | health/page.tsx | Healthcare program GIF |
| `public/gifs/childwelfare.gif` | Not directly referenced | Child welfare GIF |
| `public/gifs/environment.gif` | Not directly referenced | Environment GIF |
| `public/gifs/SanjeevaniNivaran.gif` | Not directly referenced | Sanjeevani animated GIF |
| `public/gifs/3.gif` | Not directly referenced | Animation 3 |
| `public/gifs/4.gif` | Not directly referenced | Animation 4 |
| `public/gifs/7.gif` | Not directly referenced | Animation 7 |
| `public/infographic/hollowCircle.gif` | Not directly referenced | Hollow circle animation |

### 4C. Error/Utility Pages
| File Path | Used In | Description |
|---|---|---|
| `public/404.png` | not-found.tsx | 404 error illustration |
| `public/not-found-bg.png` | not-found.tsx | 404 background |

### 4D. Navbar Menu Icons
| File Path | Used In | Description |
|---|---|---|
| `public/navbar/aboutus/career.png` | Not directly referenced | Career menu icon |
| `public/navbar/aboutus/contact.png` | Not directly referenced | Contact menu icon |
| `public/navbar/aboutus/faq.png` | Not directly referenced | FAQ menu icon |
| `public/navbar/aboutus/partnership.png` | Not directly referenced | Partnership menu icon |

### 4E. Sanjeevani Timeline
| File Path | Used In | Description |
|---|---|---|
| `public/timelinelarge.png` | sanjeevani/page.tsx | Timeline infographic (large) |
| `public/timelineSmall.png` | sanjeevani/page.tsx | Timeline infographic (small) |

### 4F. Next.js/Vercel Defaults
| File Path | Used In | Description |
|---|---|---|
| `public/file.svg` | Not referenced | Next.js default |
| `public/globe.svg` | Not referenced | Next.js default |
| `public/next.svg` | Not referenced | Next.js default |
| `public/vercel.svg` | Not referenced | Vercel logo |
| `public/window.svg` | Not referenced | Next.js default |

---

## 5. LEADER HEADSHOT PHOTOS — REAL PEOPLE (DO NOT REPLACE WITH AI)

| File Path | Used In | Description |
|---|---|---|
| `public/leaders/laxman_ph.jpg` | leadership.ts | Leader headshot |
| `public/leaders/lok_nath.jpg` | leadership.ts | Leader headshot |
| `public/leaders/ujjwal_subedi.jpg` | leadership.ts | Leader headshot |
| `public/leaders/bandita_mgr.jpg` | leadership.ts | Leader headshot |
| `public/leaders/barsha_pa.jpg` | leadership.ts | Leader headshot |
| `public/leaders/kushal_bs.jpg` | leadership.ts | Leader headshot |
| `public/leaders/rajeet_na.jpg` | leadership.ts | Leader headshot |
| `public/leaders/milan_r.jpg` | leadership.ts | Leader headshot |
| `public/leaders/aashish_po.jpg` | leadership.ts | Leader headshot |
| `public/leaders/bijaya_ga.jpg` | leadership.ts | Leader headshot |
| `public/leaders/deeparshan_kh.jpg` | leadership.ts | Leader headshot |
| `public/leaders/prasuna_ga.jpg` | leadership.ts | Leader headshot |

---

## 6. PRIORITY REPLACEMENT PLAN

### Tier 1 — HIGH IMPACT (Homepage & Key Landing Pages)
1. **Hero images** (6 active — hero_img_1/2/3 in avif+webp) → homepage first impression
2. **About cover** (about-cover.jpeg) → about page hero
3. **Donation banner** (donation-banner-image.png) → donation CTA
4. **Why Nivaran cards** (3 images) → homepage "why" section
5. **Counting happiness** (3 images) → homepage stats section
6. **Carousel images** (3 active: 4.jpg, 5.jpg, 6.jpg) → homepage carousel
7. **Sanjeevani project images** (3 + bg) → Sanjeevani page & homepage projects

### Tier 2 — MEDIUM IMPACT (Section/Program Pages)
8. **About section photos** (about_img_7, about_img_10 active) → about page
9. **About timeline stories** (6 images) → about page timeline
10. **Project hero images** (Nurture, Terra, Unity, Vidya) → project pages
11. **DEI illustrations** (2 images) → DEI page
12. **Stories & insights cards** (2 images) → donation section
13. **Program stock photos** (20+ images in /images/) → program detail pages

### Tier 3 — LOWER PRIORITY (Blog Content)
14. **Blog inline images** (26 images in /blogs/images/) → individual blog posts
15. **Blog thumbnails** (12 images in /blogs/thumbnail/) → blog list page
16. **Article images** (14 images in /articles/images/) → article pages
17. **USA chapter images** (7 cards + fire + flag) → USA page

### Do NOT Replace
- Brand logos/icons (NivaranLogo.svg, logo.png, etc.)
- Leader headshot photos (real people)
- Maps (Nepal Map.svg, worldMap.svg)
- Flag icons
- Auto-generated news images (already AI-generated)
- Next.js default SVGs

---

## TOTAL COUNTS

| Category | Unique Files | Actively Used |
|---|---|---|
| Stock/External (Replaceable) | **~155** | **~95** |
| Auto-Generated News | **~78** | ~78 |
| Brand Assets | **~14** | ~10 |
| UI Elements | **~18** | ~10 |
| Leader Photos | **12** | 12 |
| Next.js Defaults | **4** | 0 |
| **TOTAL** | **~281** | **~205** |

**Images recommended for AI replacement: ~95 actively used stock photos across 17 categories.**
