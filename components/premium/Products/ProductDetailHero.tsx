"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  // Cube,
  Image as ImageIcon
} from "lucide-react";
import { Section } from "../Layout/Section";
import { Container } from "../Layout/Container";
import { MorphingNumber } from "../NumberEffects/MorphingNumber";
import { RippleButton } from "../Cards/RippleButton";
import { QuoteRequestModal } from "@/components/QuoteRequestModal";

// Dynamically import 3D viewer with no SSR
const ProductViewer3D = dynamic(
  () => import("../ProductViewer/ProductViewer3D").then(mod => mod.ProductViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }
);

interface ProductDetailHeroProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    images: string[];
    features: string[];
    specifications: {
      material?: string;
      dimensions?: string;
      weight?: string;
      color?: string;
      warranty?: string;
      capacity?: string;
    };
    brochureUrl?: string;
    inStock: boolean;
  };
}

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [show3D, setShow3D] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  const handleShare = () => {
    // Share on WhatsApp
    const shareText = `Check out this product: ${product.name}\n\n${product.description}\n\nPrice: ${product.price}`;
    const shareUrl = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadBrochure = async () => {
    if (product.brochureUrl) {
      try {
        // Create a temporary anchor element for download
        const link = document.createElement('a');
        link.href = product.brochureUrl;
        link.download = `${product.name.replace(/\s+/g, '-')}-brochure.pdf`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        // For cross-origin PDFs, try to fetch and create blob
        if (product.brochureUrl.startsWith('http')) {
          try {
            const response = await fetch(product.brochureUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            link.href = blobUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
          } catch (error) {
            // If fetch fails due to CORS, fall back to opening in new tab
            window.open(product.brochureUrl, '_blank');
          }
        } else {
          // For relative URLs, direct download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error('Download error:', error);
        // Fallback to opening in new tab
        window.open(product.brochureUrl, '_blank');
      }
    } else {
      alert('Brochure not available for this product yet.');
    }
  };

  return (
    <Section size="lg" className="pt-20 md:pt-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Image Gallery / 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-neutral-100 rounded-xl md:rounded-2xl overflow-hidden">
              {show3D && webGLSupported ? (
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                  </div>
                }>
                  <ProductViewer3D productId={product.id} className="w-full h-full" />
                </Suspense>
              ) : (
                <div className="relative w-full h-full p-4 md:p-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Navigation arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Toggle 3D/Image View */}
              {/* <button
                onClick={handle3DToggle}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                disabled={!webGLSupported}
              >
                {show3D ? (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-sm">View Images</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">
                      {webGLSupported ? 'View 3D' : '3D Not Supported'}
                    </span>
                  </>
                )}
              </button> */}
            </div>

            {/* Thumbnail Gallery - Horizontal Scrollable Carousel */}
            {product.images.length > 1 && !show3D && (
              <div className="relative hidden lg:block mt-4 md:mt-6">
                <div className="flex gap-2 md:gap-3 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400 pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${currentImageIndex === index
                        ? 'border-emerald-500 ring-2 ring-emerald-200'
                        : 'border-neutral-200 hover:border-emerald-300'
                        }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              {/* <p className="text-2xl text-emerald-600 font-medium">{product.price}</p> */}
              {product.inStock ? (
                <span className="inline-block mt-2 px-2.5 py-1 md:px-3 bg-green-100 text-green-800 text-xs md:text-sm rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="inline-block mt-2 px-2.5 py-1 md:px-3 bg-red-100 text-red-800 text-xs md:text-sm rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Key Features</h3>
              <ul className="space-y-1.5 md:space-y-2">
                {product.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm md:text-base"
                  >
                    <span className="text-emerald-500 mt-0.5 md:mt-1">✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 md:gap-4 pt-2">
              <RippleButton
                variant="primary"
                size="lg"
                onClick={() => setShowQuoteModal(true)}
                className="flex-1 sm:flex-none text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3"
              >
                Request Quote
              </RippleButton>
              <RippleButton
                variant="secondary"
                size="lg"
                onClick={handleDownloadBrochure}
                className="flex-1 justify-center items-center sm:flex-none text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3"
              >
                <span className="hidden sm:inline">Download Brochure</span>
                <span className="sm:hidden text-center">Brochure</span>
                <Download className="hidden sm:inline w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
              </RippleButton>
              <button
                onClick={handleShare}
                className="p-2.5 md:p-3 border border-neutral-300 rounded-full hover:border-emerald-500 transition-colors group"
                title="Share on WhatsApp"
              >
                <Share2 className="w-4 h-4 md:w-5 md:h-5 group-hover:text-emerald-500 transition-colors" />
              </button>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
              <div>
                <div className="text-2xl font-medium">
                  <MorphingNumber value={5} suffix="+" />
                </div>
                <p className="text-sm text-neutral-600">Years Warranty</p>
              </div>
              <div>
                <div className="text-2xl font-medium">
                  <MorphingNumber value={100} suffix="%" />
                </div>
                <p className="text-sm text-neutral-600">Recyclable</p>
              </div>
              <div>
                <div className="text-2xl font-medium">
                  <MorphingNumber value={24} suffix="/7" />
                </div>
                <p className="text-sm text-neutral-600">Support</p>
              </div>
            </div> */}

            {/* Specifications */}
            {/* {Object.keys(product.specifications).some(key => product.specifications[key as keyof typeof product.specifications]) && (
              <div className="pt-6 border-t border-neutral-200">
                <h3 className="font-semibold mb-4">Specifications</h3>
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) =>
                    value ? (
                      <div key={key}>
                        <dt className="text-sm text-neutral-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="text-sm font-medium">{value}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              </div>
            )} */}
          </motion.div>
        </div>
      </Container>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {showQuoteModal && (
          <QuoteRequestModal
            isOpen={showQuoteModal}
            onClose={() => setShowQuoteModal(false)}
            productId={product.id}
            productName={product.name}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}