"use client";

import { useSEO } from "@/hooks/useSEO";

type PageHeaderProps = {
  slug: string;
};

export default function MetaTags({ slug }: PageHeaderProps) {
  const { data: seo } = useSEO(slug);

  if (!seo) return null; // No SEO data, skip meta tags

  const SITE_NAME = "Janadesh Party Nepal";

  const clean = (text?: string) =>
    text ? text.replace(/<[^>]+>/g, "").trim() : "";

  const pageTitle = seo.meta_title_en || "";
  const fullTitle = pageTitle ? `${SITE_NAME} – ${pageTitle}` : SITE_NAME;

  return (
    <>
      {/* Title */}
      <title>{fullTitle}</title>

      {/* Meta */}
      <meta name="description" content={clean(seo.meta_description_en)} />
      <meta name="keywords" content={clean(seo.keywords)} />

      {/* Open Graph */}
      <meta
        property="og:title"
        content={seo.og_title_en || seo.meta_title_en || ""}
      />
      <meta
        property="og:description"
        content={clean(seo.og_description_en || seo.meta_description_en)}
      />
      {seo.og_image && (
        <meta property="og:image" content={`${seo.og_image}`} />
      )}

      {/* SEO */}
      {seo.canonical_url && <link rel="canonical" href={seo.canonical_url} />}
      {seo.robots && <meta name="robots" content={seo.robots} />}
    </>
  );
}
