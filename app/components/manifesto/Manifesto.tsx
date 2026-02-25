'use client';

import { useEffect, useState, useRef } from 'react';
import Container from '../layout/Container';
import { fetchManifesto } from '@/hooks/manifestos';

// --- Manifesto type ---
type Manifesto = {
  title: string;
  description: string;
  pdf_file: string | null;
};

// --- Cache constants ---
const LOCAL_STORAGE_KEY = 'manifestos';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export default function ManifestoPage() {
  const [dataArray, setDataArray] = useState<Manifesto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalWidth, setModalWidth] = useState<number>(800);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (index: number) => setActiveIndex(index);

  // --- Load manifesto array from cache or API ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as { value: Manifesto[]; timestamp: number };
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setDataArray(parsed.value);
            setLoading(false);
            return;
          }
        }

        const res = await fetchManifesto();
        const manifestos = res.results ?? [];
        if (manifestos.length === 0) throw new Error('No manifesto found');

        setDataArray(manifestos);
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ value: manifestos, timestamp: Date.now() })
        );
      } catch (err) {
        setError((err as Error).message || 'Unable to load manifesto');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // --- Close modal when clicking outside ---
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

  // --- Update modal width for responsive PDF pages ---
  useEffect(() => {
    const updateWidth = () => {
      if (modalRef.current) setModalWidth(modalRef.current.clientWidth - 32);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [showModal]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!dataArray.length) return <div className="p-10">No manifesto found</div>;

  return (
    <Container className="py-10">
      {/* Card Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {dataArray.map((manifesto, index) => {
          const fileUrl = manifesto.pdf_file || '/assets/logo_janadesh.png';

          return (
            <div key={index} className="rounded-3xl bg-white border hover:border-blue-200">
              {/* Card Preview */}
              <div className="h-[200px] w-full rounded-t-3xl overflow-hidden flex justify-center items-center bg-gray-100">
                <img
                  src={fileUrl}
                  className="h-full w-auto object-contain"
                  onError={(event) => {
                    event.currentTarget.src = '/assets/logo_janadesh.png';
                  }}
                  alt={manifesto.title}
                />
              </div>

              {/* Card Content */}
              <div className="px-4 py-6 text-gray-600 flex flex-col justify-between">
                <div>
                  <h1 className="text-base leading-5 line-clamp-1  mb-4">{manifesto.title}</h1>
                  <div
                    className="text-sm  line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: manifesto.description }}
                  />
                </div>

                <div className="  flex font-normal gap-4 mt-8">
                  <a
                    href={fileUrl}
                    download
                    target="_blank"
                    className="inline-flex text-sm items-center justify-center px-4 py-3 hover:bg-gray-600 text-white rounded-full bg-gray-800 transition"
                  >
                    Download Manifesto
                  </a>

                  <button
                    onClick={() => {
                      openModal(index);
                      setShowModal(true);
                    }}
                    className="inline-flex text-sm items-center justify-center px-4 py-3 hover:bg-gray-200 border border-gray-300 rounded-full bg-white text-gray-800 transition"
                  >
                    View Manifesto
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Modal */}
      {activeIndex !== null && (
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
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800 font-bold text-4xl"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-auto flex flex-col items-center">
              {dataArray[activeIndex].pdf_file?.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={`${dataArray[activeIndex].pdf_file}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-none"
                  title={`${dataArray[activeIndex].title} PDF`}
                />
              ) : (
                <img
                  src={dataArray[activeIndex].pdf_file || '/placeholder.png'}
                  className="object-contain w-full h-full"
                  alt={dataArray[activeIndex].title}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
