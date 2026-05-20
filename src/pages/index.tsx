import { useEffect, useState, useMemo } from 'react';
import { Spinner } from '@heroui/react';
import { Link } from 'react-router-dom';
      .finally(() => setLoading(false));
  }, []);

  // Data grouping logic
  const data = useMemo(() => {
    if (!posts.length) return {};

    // Tag filtering helper
    const getByTag = (tag: string) =>
      posts.filter((p) => p.tags?.some((t) => t.slug.includes(tag)));
    // Helper gom category
                  className="px-8 py-3 rounded-full border hover:bg-gray-50 font-semibold text-gray-600 text-sm"
                  onClick={() => setVisibleCount((v) => v + 10)}
                >
                  Xem thêm tin
                </button>
              </div>
            )}