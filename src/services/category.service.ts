import { ICategoryExt } from '@/models/category.model';

interface ICategoryExtAPIResponse {
  data: ICategoryExt;
}

export async function getCategoryById(id: number): Promise<ICategoryExt> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/category/${id}`);
  const categoryData: ICategoryExtAPIResponse = await response.json();
  return categoryData.data;
}
