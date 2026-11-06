import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/api';
import { Check, Shield, Sparkles, Truck, RefreshCw, ArrowRight } from 'lucide-react';

export const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping'>('details');
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const slug = productSlug || 'gentle-armor';
    Promise.all([
      api.get(`/products/${slug}`),
      api.get('/products'),
    ])
      .then(([prodRes, allRes]) => {
        setProduct(prodRes.data);
        if (prodRes.data?.images?.length > 0) {
          setSelectedImage(prodRes.data.images[0]);
        }
        setRelatedProducts(allRes.data.filter((p: any) => p.slug !== slug));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [productSlug]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center text-[#B49A75] text-xs tracking-widest">
        LOADING GARMENT ARCHIVE...
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Breadcrumb */}
        <div className="text-[11px] tracking-[0.25em] text-[#A5A5A5] flex items-center space-x-2 uppercase">
          <Link to="/" className="hover:text-[#F5F2EC]">Home</Link>
          <span>/</span>
          <Link to="/archive/series-01" className="hover:text-[#F5F2EC]">Series 01</Link>
          <span>/</span>
          <span className="text-[#B49A75]">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto">
              {product.images?.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 border flex-shrink-0 overflow-hidden transition-all ${
                    selectedImage === img ? 'border-[#B49A75] opacity-100' : 'border-[#292929] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 border border-[#292929] overflow-hidden bg-[#121212]">
              <img
                src={selectedImage || product.images?.[0]}
                alt={product.name}
                className="w-full h-[520px] md:h-[640px] object-cover"
              />
            </div>
          </div>

          {/* Right: Product Details & Purchase */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase font-semibold">
                {product.category}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#F5F2EC]">
                {product.name}
              </h1>
              <p className="text-2xl font-serif text-[#B49A75] pt-1">
                ${product.price} USD
              </p>
            </div>

            <p className="text-sm text-[#A5A5A5] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs tracking-wider">
                <span className="uppercase text-[#F5F2EC] font-medium">Select Size</span>
                <span className="text-[#A5A5A5] underline cursor-pointer hover:text-[#B49A75]">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.availableSizes?.map((size: string) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs tracking-wider border text-center transition-all ${
                        isSelected
                          ? 'border-[#B49A75] bg-[#B49A75] text-[#0B0B0B] font-semibold'
                          : 'border-[#292929] bg-[#121212] text-[#F5F2EC] hover:border-[#F5F2EC]/50'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {!selectedSize && (
                <p className="text-[11px] text-[#B49A75] tracking-wider">
                  * Please choose your size
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-6 pt-2">
              <span className="text-xs tracking-wider text-[#A5A5A5] uppercase">Quantity</span>
              <div className="flex items-center border border-[#292929] bg-[#121212]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-sm text-[#A5A5A5] hover:text-[#F5F2EC]"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-sm text-[#A5A5A5] hover:text-[#F5F2EC]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase transition-colors shadow-lg"
              >
                ADD TO CART — ${(product.price * quantity).toFixed(2)}
              </button>

              <Link
                to="/cart"
                className="block text-center w-full py-3.5 border border-[#292929] hover:border-[#B49A75] text-xs tracking-[0.25em] uppercase text-[#F5F2EC] transition-colors"
              >
                PROCEED TO BAG
              </Link>
            </div>

            {/* Connected Narrative Chapter */}
            <div className="border border-[#292929] bg-[#121212] p-5 space-y-2">
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#B49A75] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NARRATIVE ORIGIN</span>
              </div>
              <h4 className="font-serif text-lg text-[#F5F2EC]">
                Conceived in Chapter 01: The First Scar
              </h4>
              <p className="text-xs text-[#A5A5A5] leading-relaxed">
                "The first scar is not a sign of weakness. It is proof that we continued."
              </p>
              <Link
                to="/archive/series-01/chapter-01"
                className="inline-flex items-center space-x-1 text-xs text-[#B49A75] hover:text-[#F5F2EC] pt-1"
              >
                <span>Read the design essay</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Tabbed Specs */}
            <div className="border-t border-[#292929] pt-6 space-y-4">
              <div className="flex space-x-8 border-b border-[#292929] pb-2 text-xs tracking-[0.2em] uppercase">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 ${activeTab === 'details' ? 'text-[#B49A75] border-b-2 border-[#B49A75]' : 'text-[#A5A5A5]'}`}
                >
                  SPECIFICATIONS
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-2 ${activeTab === 'fabric' ? 'text-[#B49A75] border-b-2 border-[#B49A75]' : 'text-[#A5A5A5]'}`}
                >
                  FABRIC & CARE
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 ${activeTab === 'shipping' ? 'text-[#B49A75] border-b-2 border-[#B49A75]' : 'text-[#A5A5A5]'}`}
                >
                  COMPLIMENTARY DISPATCH
                </button>
              </div>

              <div className="text-xs text-[#A5A5A5] leading-relaxed space-y-2 min-h-24">
                {activeTab === 'details' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Boxy oversized silhouette with dropped shoulders</li>
                    <li>Interior raw selvage edge bindings</li>
                    <li>Individual edition serial tag hand-numbered in Kyoto</li>
                    <li>Heavyweight matte Japanese hardware</li>
                  </ul>
                )}
                {activeTab === 'fabric' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>540 GSM 100% structured virgin wool blend</li>
                    <li>Dry clean only with specialist garment care</li>
                    <li>Do not tumble dry; steam gently on low temperature</li>
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>Complimentary insured carbon-neutral courier worldwide.</p>
                    <p>Orders are dispatched in archival matte black presentation boxes within 24 business hours.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#292929] pt-16 space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
                  SERIES 01 COMPANIONS
                </span>
                <h3 className="font-serif text-3xl text-[#F5F2EC]">
                  RELATED SILHOUETTES
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.slug}`}
                  className="group border border-[#292929] bg-[#121212] overflow-hidden"
                >
                  <div className="h-72 overflow-hidden">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] tracking-widest text-[#B49A75] uppercase">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-xl text-[#F5F2EC] group-hover:text-[#B49A75] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-sm font-serif text-[#F5F2EC]/80">
                      ${item.price} USD
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

