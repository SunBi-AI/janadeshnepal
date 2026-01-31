export interface BlogCategory {
  id: number;
  name_en: string;
  name_np: string;
  slug: string;
}

export interface Blog {
  id: number;
  title_en: string;
  title_np: string;
  slug: string;
  content_en: string;
  content_np: string;
  date: string;
  featured_image: string;
  category: BlogCategory;
  excerpt_np:string;
  excerpt_en:string;
  published_at:string;
  status:boolean;
  view_count:string;
  is_featured:boolean;
   
}

export type Manifesto = {
  id: number;
  title: string;
  slug: string;
  description: string;
  pdf_file: string;
  status: string;
  is_published: boolean;
};
