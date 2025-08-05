import { Award, Cpu, Heart, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-white text-[#14263F]">
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] w-full">
          <div className="absolute inset-0 bg-[#2A4172] opacity-20"></div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-[#1B2E4F]">About Digihub</h1>
            <p className="mt-4 max-w-2xl text-lg text-[#2A4172]">
              Your trusted partner in the world of cutting-edge electronics.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#1B2E4F]">Our Story</h2>
              <p className="mt-4 text-lg text-[#2A4172]">
                Founded in 2020 by a group of passionate tech enthusiasts, TechNova was born from a desire to make the
                latest technology accessible to everyone. We saw a gap in the market for a store that not only sold
                electronics but also provided expert advice and a community for fellow gadget lovers. From our humble
                beginnings in a small garage, we've grown into a leading online retailer, but our core mission remains
                the same.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-[#F5F7FA] py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl text-[#1B2E4F]">Why Choose Us?</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#384D89] text-white">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#1B2E4F]">Latest Technology</h3>
                <p className="mt-2 text-[#2A4172]">
                  We stock the most sought-after gadgets and cutting-edge electronics from leading brands.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#384D89] text-white">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#1B2E4F]">Quality Guaranteed</h3>
                <p className="mt-2 text-[#2A4172]">
                  Every product is carefully selected and tested to ensure it meets our high standards of quality and
                  performance.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#384D89] text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#1B2E4F]">Expert Team</h3>
                <p className="mt-2 text-[#2A4172]">
                  Our team of tech experts is always ready to help you find the perfect product for your needs.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#A13C78] text-white">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#1B2E4F]">Customer First</h3>
                <p className="mt-2 text-[#2A4172]">
                  Your satisfaction is our priority. We offer dedicated support and hassle-free returns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl text-[#1B2E4F]">Meet Our Team</h2>
            <p className="mt-4 text-center text-lg text-[#2A4172]">
              The passionate individuals driving TechNova forward.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-[#384D89] flex items-center justify-center text-2xl font-medium text-white">
                  JD
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#1B2E4F]">Jane Doe</h3>
                <p className="text-[#2A4172]">Founder & CEO</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-[#384D89] flex items-center justify-center text-2xl font-medium text-white">
                  JS
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#1B2E4F]">John Smith</h3>
                <p className="text-[#2A4172]">Head of Products</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-[#A13C78] flex items-center justify-center text-2xl font-medium text-white">
                  AR
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#1B2E4F]">Alex Ray</h3>
                <p className="text-[#2A4172]">Customer Experience Lead</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}