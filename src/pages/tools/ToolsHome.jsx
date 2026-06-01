import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TOOL_CATEGORIES, TOOLS } from '../../data/tools.js';
import ToolSeo from '../../components/tools/ToolSeo.jsx';
import ToolCard from '../../components/tools/ToolCard.jsx';
import { buildToolSeo } from '../../seo/tools/toolsSeo.js';

export default function ToolsHome() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return TOOLS.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      const matchesQuery = !normalizedQuery || [tool.name, tool.description, tool.category].join(' ').toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const featured = TOOLS.filter((tool) => tool.featured).slice(0, 3);
  const showingSearchResults = Boolean(query.trim()) || category !== 'All';
  const visibleFeatured = showingSearchResults ? [] : featured;

  const seo = buildToolSeo({
    title: 'Free Browser Tools — PDF, Image, QR Code & More | Usama Aslam',
    description: 'Free browser-based tools by Usama Aslam: compress PDFs, convert images, generate QR codes, format JSON, and create strong passwords. No upload, no signup.',
    path: '/tools',
    toolName: 'Usama Aslam Tools',
    breadcrumbs: [
      { name: 'Home', url: 'https://usama-resumae.netlify.app' },
      { name: 'Tools', url: 'https://usama-resumae.netlify.app/tools' },
    ],
    image: 'https://usama-resumae.netlify.app/og/tools.png',
  });

  return (    <>
      <ToolSeo title={seo.title} description={seo.description} canonical={seo.canonical} image={seo.image} jsonLd={seo.jsonLd} />

      <div className="space-y-8">
        <section className="mt-12 space-y-4 sm:rounded-3xl sm:border sm:border-slate-200 sm:bg-white sm:p-5 sm:shadow-sm">
          <label htmlFor="tool-search" className="mb-3 block text-sm font-semibold text-slate-600">Search tools</label>
          <div className="relative">
            <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="tool-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools, categories, or descriptions"
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
            />
          </div>
          <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
            <button type="button" onClick={() => setCategory('All')} className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === 'All' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'}`}>All</button>
            {TOOL_CATEGORIES.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {item}
              </button>
            ))}
          </div>
        </section>

        {visibleFeatured.length ? (
        <section className="hidden sm:block">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Featured tools</h2>
              <p className="mt-1 text-sm text-slate-600">High-performing tools curated for fast access.</p>
            </div>
          
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
            {visibleFeatured.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </section>
        ) : null}

        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">All tools</h2>
            <p className="text-sm text-slate-500">Showing {filteredTools.length} of {TOOLS.length} tools</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-5">
            {filteredTools.length ? filteredTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />) : (
              <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                No tools match your search. Try another category or keyword.
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Browse by category</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to="/tools/pdf-tools" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-white transition">PDF Tools</Link>
            <Link to="/tools/image-tools" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-white transition">Image Tools</Link>
            <Link to="/tools/text-tools" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-white transition">Text Tools</Link>
            <Link to="/tools/dev-tools" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-white transition">Developer Tools</Link>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Quick guide</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Search a tool, open it, upload the file if needed, and download the result. Each tool page keeps its own tool-specific help.</p>
        </section>
      </div>
    </>
  );
}
