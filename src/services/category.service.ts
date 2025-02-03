import { CategoryExt, ICategory, ICategoryExt } from '@/models/category.model';

interface ICategoryAPIResponse {
  data: ICategory[];
}

interface ICategoryExtAPIResponse {
  data: ICategoryExt;
}

export async function getCategories(): Promise<CategoryExt[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/category`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const categoriesData: ICategoryAPIResponse = await response.json();
  return categoriesData.data.map((item) => new CategoryExt(item));
}

export async function getCategoryById(id: number): Promise<ICategoryExt> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/category/${id}`);
  const categoryData: ICategoryExtAPIResponse = await response.json();
  return categoryData.data;
}
