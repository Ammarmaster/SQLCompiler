import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Google-Extended',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'cohere-ai',
          'DuckDuckBot',
        ],
        allow: '/',
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sqlcompiler.jobsio.in'}/sitemap.xml`,
  };
}
