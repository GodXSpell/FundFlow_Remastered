import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
// import { getAllPosts, getPostsByCategory } from "@/features/dashboard";

export default function sitemap(): MetadataRoute.Sitemap {
//   const posts = getAllPosts().map((post) => ({
//     url: `${SITE_INFO.url}/blog/${post.slug}`,
//     lastModified: dayjs(post.metadata.updatedAt).toISOString(),
//   }));

//   const components = getPostsByCategory("components").map((post) => ({
//     url: `${SITE_INFO.url}/components/${post.slug}`,
//     lastModified: dayjs(post.metadata.updatedAt).toISOString(),
//   }));

  const routes = ["", "/dashboard", "/budgets","/transactions"].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: dayjs().toISOString(),
  }));

  return routes;
}
