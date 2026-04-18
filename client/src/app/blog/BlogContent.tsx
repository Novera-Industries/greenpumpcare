"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

type Filter = BlogCategory | "All";

const FILTERS: Filter[] = ["All", ...BLOG_CATEGORIES];

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function TrendingMarquee({ posts }: { posts: typeof BLOG_POSTS }) {
  // Duplicate list so the marquee loops seamlessly
  const items = [...posts, ...posts];
  return (
    <section className="relative pt-2 pb-10">
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
          <TrendingUp className="w-3.5 h-3.5" />
          Trending
        </div>

        <div
          className="w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div
            className="flex gap-10 w-max"
            style={{
              animation: "marqueeScroll 60s linear infinite",
            }}
          >
            {items.map((p, i) => (
              <Link
                key={`${p.slug}-${i}`}
                href={`/blog/${p.slug}`}
                className="shrink-0 inline-flex items-center gap-2.5 whitespace-nowrap hover:opacity-70 transition-opacity"
              >
                <span className="font-heading text-xs font-extrabold text-primary">
                  #{(i % posts.length) + 1}
                </span>
                <span className="text-[13px] font-semibold text-text">
                  {p.title}
                </span>
                <span className="text-text/10">·</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function SegmentedFilter({
  active,
  onChange,
}: {
  active: Filter;
  onChange: (f: Filter) => void;
}) {
  return (
    <div className="flex justify-center pb-10">
      <div className="inline-flex gap-1.5 p-1.5 bg-white border border-gray-200 rounded-pill overflow-x-auto max-w-full">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={cn(
              "relative px-5 py-2 rounded-pill text-[13px] font-semibold transition-colors whitespace-nowrap",
              active === f ? "text-white" : "text-gray-500 hover:text-text"
            )}
          >
            {active === f && (
              <motion.span
                layoutId="filter-bg"
                className="absolute inset-0 bg-text rounded-pill z-0"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function BlogContent() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const sortedPosts = useMemo(
    () => [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const featured = sortedPosts[0];
  const rest = sortedPosts.slice(1);
  const trending = sortedPosts.slice(0, 5);

  const filtered = useMemo(() => {
    return rest.filter(
      (p) => activeFilter === "All" || p.category === activeFilter
    );
  }, [activeFilter, rest]);

  return (
    <>
      {/* Hero — centered, tight */}
      <section className="relative pt-32 pb-4 lg:pt-40">
        <div className="container max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-pill px-4 py-2 mb-8 shadow-sm">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold text-text">The GreenPump Blog</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-text leading-[1.05] tracking-[-0.035em]">
            Heat pump care for{" "}
            <span className="gradient-text">homeowners</span>.
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-[1.7]">
            Tips, guides, and thinking on maintenance, efficiency, and indoor air
            quality in Halifax homes.
          </p>
        </div>
      </section>

      {/* Trending marquee */}
      <div className="container max-w-5xl">
        <TrendingMarquee posts={trending} />
      </div>

      {/* Category filter — segmented control */}
      <div className="container">
        <SegmentedFilter active={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Featured post — dark card with gradient glows */}
      <section className="pb-12">
        <div className="container max-w-5xl">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-[#0d0d0d] rounded-[24px] overflow-hidden p-8 sm:p-12 lg:p-14 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_-15px_rgba(9,164,122,0.25)]"
            >
              {/* Gradient underline on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-mint to-transparent" />

              {/* Radial glows */}
              <div
                className="absolute -top-12 -right-12 w-56 h-56 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(9,164,122,0.18) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-40 h-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(63,214,145,0.12) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-pill mb-5">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  Featured
                </div>

                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/40 mb-3">
                  {featured.category}
                </p>

                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#f9f7f5] leading-[1.15] tracking-[-0.02em] mb-4 max-w-3xl">
                  {featured.title}
                </h2>

                <p className="text-white/60 text-base sm:text-lg leading-[1.7] mb-6 max-w-2xl">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[13px] text-white/35 mb-6">
                  <span className="text-white/50">The GreenPump Care Team</span>
                  <span className="text-white/15">·</span>
                  <span>{featured.readTime}</span>
                  <span className="text-white/15">·</span>
                  <span>{formatShortDate(featured.date)}</span>
                </div>

                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#f9f7f5]">
                  Read article
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </motion.article>
          </Link>
        </div>
      </section>

      {/* Grid — cards with subtle hover lift */}
      <section className="pb-24 lg:pb-32">
        <div className="container max-w-5xl">
          {/* Grid header with article count on right */}
          <div className="flex justify-end mb-5">
            <p className="text-[12px] font-semibold text-text/40 uppercase tracking-wider">
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </p>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="text-gray-500 text-lg">
                  No articles in this category yet.
                </p>
                <button
                  onClick={() => setActiveFilter("All")}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Show all articles
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group relative flex flex-col h-full bg-white border border-gray-200/70 rounded-[20px] p-7 hover:border-gray-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] transition-all duration-500"
                    >
                      {/* Accent underline on hover */}
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                      {/* Top: category + arrow */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary">
                          {post.category}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-text/15 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                      </div>

                      <h3 className="font-heading text-xl font-bold text-text leading-[1.3] tracking-[-0.02em] mb-2.5 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-[14px] leading-[1.7] flex-1 mb-5">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-[12px] text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">GreenPump Care</span>
                          <span className="text-text/15">·</span>
                          <span>{post.readTime}</span>
                        </div>
                        <span>{formatShortDate(post.date)}</span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
