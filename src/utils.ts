// Map page names to their routes
const pageMap: Record<string, string> = {
  Home: "/",
  Dashboard: "/dashboard",
  CoursePage: "/course",
  // Add more mappings as needed
};

export function createPageUrl(page: string, params?: Record<string, string>) {
  // If the page is in the map, use the mapped path; otherwise treat it as a direct path
  const path = pageMap[page] || `/${page.toLowerCase()}`;

  // For relative routing, just return the path with query params
  let url = path;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += "?" + searchParams.toString();
  }
  return url;
}
