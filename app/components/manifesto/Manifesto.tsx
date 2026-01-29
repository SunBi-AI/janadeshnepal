'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchManifesto } from '@/hooks/manifestos';
import Container from '../layout/Container';
import { Document, Page } from 'react-pdf';

type Manifesto = {
  title: string;
  description: string;
  pdf_file: string;
};

const LOCAL_STORAGE_KEY = 'manifesto';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export default function ManifestoPage() {
  const [data, setData] = useState<Manifesto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load manifesto from cache or API
  useEffect(() => {
    const loadData = async () => {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (cached) {
          const parsed = JSON.parse(cached) as { value: Manifesto; timestamp: number };
          // Check TTL
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setData(parsed.value);
            setLoading(false);
            return;
          }
        }

        // Fetch from API
        const res = await fetchManifesto();
        const manifesto = res.results?.[0] ?? null;

        if (!manifesto) throw new Error('No manifesto found');

        setData(manifesto);
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ value: manifesto, timestamp: Date.now() })
        );
      } catch (err) {
        setError((err as Error).message || 'Unable to load manifesto');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!data) return <div className="p-10">No manifesto found</div>;

  const isPdf = data.pdf_file.toLowerCase().endsWith('.pdf');

  return (
    <Container className="py-10">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="rounded-3xl bg-white border hover:border-blue-200 ">
          <div className="h-[400px] overflow-hidden flex justify-center items-center">
            <img
              src={data.pdf_file} // works for JPG preview
              className="w-full h-full object-contain"
              alt={data.title}
            />
          </div>
          <div className="px-4 py-6 text-gray-600 flex flex-col justify-between">
            <div>
              <h1 className="text-base leading-5  mb-4">{data.title}</h1>
              <p className="text-sm">{data.description}</p>
            </div>

            <div className="flex font-normal gap-4 mt-8">
              <a
                href={data.pdf_file}
                download
                target="_blank"
                className="inline-flex text-sm items-center justify-center px-4 py-3 hover:bg-gray-600 text-white rounded-full bg-gray-800 transition"
              >
                Download Manifesto
              </a>

              <button
                onClick={() => setShowModal(true)}
                className="inline-flex text-sm items-center justify-center px-4 py-3 hover:bg-gray-200 border border-gray-300 rounded-full bg-white text-gray-800 transition"
              >
                View Manifesto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/50
          transition-opacity duration-300 ease-in-out
          ${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div
          ref={modalRef}
          className={`bg-white rounded-2xl w-[90%] max-w-4xl max-h-[90%] p-4 flex flex-col
            transform transition-transform duration-300 ease-in-out
            ${showModal ? 'scale-100' : 'scale-90'}
          `}
        >
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-800 font-bold text-4xl"
            >
              ×
            </button>
          </div>

          {/* PDF or image */}
          <div className="flex-1 overflow-auto flex justify-center items-center">
            {isPdf ? (
              <Document file={data.pdf_file}>
                <Page pageNumber={1} width={800} />
              </Document>
            ) : (
              <img
                src={data.pdf_file}
                className="object-contain w-full h-full"
                alt={data.title}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
