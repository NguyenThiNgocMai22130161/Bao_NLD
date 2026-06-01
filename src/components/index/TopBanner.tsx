import { useEffect, useMemo, useState } from "react";

type BannerItem = {
  src: string;
  alt?: string;
};

export default function TopBanner() {
  const banners: BannerItem[] = useMemo(
    () => [
      { src: "/ads/top-banner.jpg", alt: "AVA Center" },
      { src: "/ads/top-banner2.jpg", alt: "Nhà thuốc Long Châu" },
      { src: "/ads/top-banner3.jpg", alt: "AVA Center" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = banners.length;

  useEffect(() => {
    if (paused || total <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(timer);
  }, [paused, total]);

  return (
    <div
      className="w-full bg-white border-b"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1240px] px-4 py-3">
        <div className="relative overflow-hidden bg-white">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {banners.map((banner, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <img
                  src={banner.src}
                  alt={banner.alt ?? "Top banner"}
                  className="
                    w-full
                    h-[160px]
                    sm:h-[200px]
                    md:h-[240px]
                    lg:h-[250px]
                    object-cover
                    pointer-events-none
                    select-none
                  "
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-2.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
