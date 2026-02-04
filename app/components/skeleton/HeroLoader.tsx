"use client";

export default function HeroLoader() {
  return (
    <>
      <section className="bg-[#fafafa] pt-[130px] lg:pt-[182px]"></section>

      <section className="relative w-full bg-[#fafafa] overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Text skeleton */}
            <div className="space-y-4">
              <div className="h-10 w-3/4 bg-white/30 rounded animate-pulse" />
              <div className="h-6 w-2/3 bg-white/20 rounded animate-pulse" />

              <div className="flex gap-4 mt-6">
                <div className="h-10 w-32 bg-white/30 rounded-full animate-pulse" />
                <div className="h-10 w-40 bg-white/20 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Image skeleton */}
            <div className="hidden md:block">
              <div className="h-[400px] w-[300px] bg-white/20 rounded-xl animate-pulse" />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
