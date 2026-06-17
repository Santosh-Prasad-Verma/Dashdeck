import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Dashdeck",
  version: packageJson.version,
  copyright: `© ${currentYear}, Dashdeck. Built with Next.js 16.`,
  meta: {
    title: "Dashdeck - Modern Next.js Admin Dashboard",
    description:
      "Dashdeck is a modern, open-source admin dashboard built with Next.js 16, Tailwind CSS v4, and shadcn/ui. Features 15+ interactive dashboards, AI/LLM analytics, and full client-side state management.",
  },
};
