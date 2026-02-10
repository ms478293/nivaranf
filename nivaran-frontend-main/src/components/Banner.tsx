'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

type BannerType = {
  id: string;
  message: string;
  link: string | null;
  link_text: string | null;
  type: 'info' | 'warning' | 'success';
  position: 'top' | 'bottom' | 'hero';
};

export const Banner = () => {
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await supabase
        .from('banners')
        .select('*')
        .eq('active', true)
        .eq('position', 'top'); // Only top banners for now
      
      if (data) {
        setBanners(data as BannerType[]);
      }
    };

    fetchBanners();
  }, []);

  if (!visible || banners.length === 0) return null;

  return (
    <div className="flex flex-col w-full z-50 relative">
      {banners.map((banner) => (
        <div 
          key={banner.id}
          className={`w-full px-4 py-2 flex items-center justify-between gap-4 ${
            banner.type === 'warning' ? 'bg-yellow-100 text-yellow-900' :
            banner.type === 'success' ? 'bg-green-100 text-green-900' :
            'bg-blue-600 text-white'
          }`}
        >
          <div className="flex-1 text-center text-sm font-medium">
            {banner.message}
            {banner.link && (
              <Link href={banner.link} className="ml-2 underline hover:no-underline">
                {banner.link_text || 'Learn more'}
              </Link>
            )}
          </div>
          <button 
            onClick={() => setVisible(false)}
            className="p-1 hover:bg-black/10 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
