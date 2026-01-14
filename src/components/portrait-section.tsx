"use client";

export function PortraitSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <figure className="text-center">
            <div className="relative inline-block w-[220px] sm:w-[300px] md:w-[360px] lg:w-[420px]">
              <img
                src="/images/logo.png"
                alt="Biểu trưng chủ nghĩa xã hội"
                className="w-full h-auto object-cover rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                style={{ aspectRatio: "749/999" }}
              />
            </div>
            <figcaption className="text-sm md:text-base text-muted-foreground mt-4 font-medium">
              Chủ nghĩa xã hội
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
