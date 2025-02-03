'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useScopedI18n } from '@/locales/client';
import { ICategory } from '@/models/category.model';
import { getCategories } from '@/services/category.service';
import { useEffect, useState } from 'react';
import ScrollList from '../scrollList';

const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const translation = useScopedI18n('albums');
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error(translation('errors.loading'), error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="mb-4 h-8 w-32" />
        <div className="no-scrollbar grid auto-cols-[160px] grid-flow-col gap-4">
          {[...Array(9)].map((_, index) => (
            <div key={index}>
              <Skeleton className="h-40 w-40 rounded-md" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Categories</h1>
      <div className="flex space-x-4 overflow-x-scroll">
        {categories.map((category, index) => (
          <ScrollList href="/category/" id={category.id} key={index} name={category.name} />
        ))}
      </div>
    </div>
  );
};

export default Category;
