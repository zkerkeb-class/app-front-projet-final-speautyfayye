import CategoryContent from '@/components/CategoryContent';
import { ICategoryExt } from '@/models/category.model';
import { getCategoryById } from '@/services/category.service';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  let category: ICategoryExt | null = null;

  try {
    category = await getCategoryById(id);
  } catch (error) {
    console.error('Error fetching artist:', error);
  }

  if (!category) {
    return (
      <div className="flex h-full w-full items-center justify-center text-neutral-700 dark:text-white">
        Artist not found.
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center text-neutral-700 dark:text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      }
    >
      <CategoryContent category={category} />
    </Suspense>
  );
}
