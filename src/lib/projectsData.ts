/* eslint-disable @typescript-eslint/no-explicit-any */

// src/lib/projectsData.ts

export interface Project {
  slug: string
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  content: string
  features: string[]
  githubUrl: string
  liveUrl?: string
  videoId?: string
  gallery: string[]
  featured: boolean
}

export const projectsData: Project[] = [
  {
    slug: "bookmark-manager",
    title: "projBookmarkManagerTitle",
    description: "projBookmarkManagerDesc",
    imageUrl:
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/1.png?raw=true",
    techStack: ["HTML", "CSS", "JavaScript"],
    content: "projBookmarkManagerContent",
    features: [
      "projBookmarkManagerFeature1",
      "projBookmarkManagerFeature2",
      "projBookmarkManagerFeature3",
      "projBookmarkManagerFeature4",
      "projBookmarkManagerFeature5",
    ],
    githubUrl: "https://github.com/ChickenSoup269/bookmark-manager",
    liveUrl:
      "https://chromewebstore.google.com/detail/jhcoclfodfnchlddakkeegkogajdpgce?authuser=0&hl=en",
    videoId: "3mcsG_p_j7s",
    gallery: [
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/1.png?raw=true",
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/2.png?raw=true",
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/3.png?raw=true",
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/4.png?raw=true",
      "https://github.com/ChickenSoup269/imagesForRepo/raw/main/img_repo_extension_bookmarks/about_bookmark/5.png?raw=true",
    ],
    featured: true,
  },
  {
    slug: "zero-movie",
    title: "projZeroMovieTitle",
    description: "projZeroMovieDesc",
    imageUrl:
      "https://github.com/ChickenSoup269/Zero_Movie/raw/main/frontend/public/screenshots/trangchinh.png",
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "Ant Design",
      "Tailwind CSS",
    ],
    content: "projZeroMovieContent",
    features: [
      "projZeroMovieFeature1",
      "projZeroMovieFeature2",
      "projZeroMovieFeature3",
      "projZeroMovieFeature4",
      "projZeroMovieFeature5",
    ],
    githubUrl: "https://github.com/ChickenSoup269/Zero_Movie",
    liveUrl: "https://zero-movie-fe-v2.onrender.com/",
    videoId: "Hv5FI1u5by8",
    gallery: [
      "https://github.com/ChickenSoup269/Zero_Movie/raw/main/frontend/public/screenshots/trangchinh.png",
      "https://github.com/ChickenSoup269/Zero_Movie/raw/main/frontend/public/screenshots/chitietphim.png",
      "https://github.com/ChickenSoup269/Zero_Movie/raw/main/frontend/public/screenshots/chitietrap.png",
    ],
    featured: true,
  },
  {
    slug: "steam-clone",
    title: "projSteamCloneTitle",
    description: "projSteamCloneDesc",
    imageUrl:
      "https://github.com/ChickenSoup269/SteamClone/raw/master/Screenshot/Screenshot%202024-07-25%20203434.png",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Router",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    content: "projSteamCloneContent",
    features: [
      "projSteamCloneFeature1",
      "projSteamCloneFeature2",
      "projSteamCloneFeature3",
      "projSteamCloneFeature4",
      "projSteamCloneFeature5",
    ],
    githubUrl: "https://github.com/ChickenSoup269/SteamClone",
    videoId: "zZd_RgvPfic",
    gallery: [
      "https://github.com/ChickenSoup269/SteamClone/blob/master/Screenshot/Screenshot%202024-07-09%20020808.png?raw=true",
      "https://github.com/ChickenSoup269/SteamClone/raw/master/Screenshot/Screenshot%202024-08-31%20155604.png",
      "https://github.com/ChickenSoup269/SteamClone/blob/master/Screenshot/Screenshot%202024-07-26%20014805.png?raw=true",
      "https://github.com/ChickenSoup269/SteamClone/blob/master/Screenshot/Screenshot%202024-07-26%20000925.png?raw=true",
      "https://github.com/ChickenSoup269/SteamClone/blob/master/Screenshot/Screenshot%202024-07-26%20013943.png?raw=true",
    ],
    featured: true,
  },
]
