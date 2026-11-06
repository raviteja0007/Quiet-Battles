import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, totalCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#0B0B0B] text-[#F5F2EC] flex flex-col items-center justify-center px-6 text-center pt-24">
        <ShoppingBag className="w-12 h-12 text-[#B49A75] mb-6 stroke-[1.2]" />
        <h1 className="font-serif text-3xl md:text-4xl text-[#F5F2EC] mb-3">
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="text-sm text-[#A5A5A5] max-w-md font-light mb-8">
          The archive awaits. Discover our inaugural Series 01 garments and wear what made you.
        </p>
        <Link
          to="/archive"
          className="px-8 py-3.5 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase transition-colors"
        >
          EXPLORE THE ARCHIVE
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="border-b border-[#292929] pb-6 flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
              REVIEW SELECTION
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-[#F5F2EC]">
              SHOPPING BAG ({totalCount})
            </h1>
          </div>
          <Link
            to="/archive"
            className="hidden sm:block text-xs tracking-[0.2em] text-[#A5A5A5] hover:text-[#B49A75] uppercase"
          >
            ← CONTINUE BROWSING
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#292929] bg-[#121212] p-6 gap-6"
              >
                <div className="flex items-center space-x-5">
                  <div className="w-20 h-24 border border-[#292929] overflow-hidden flex-shrink-0 bg-[#0B0B0B]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-serif text-lg text-[#F5F2EC] hover:text-[#B49A75] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs tracking-wider text-[#A5A5A5]">
                      SIZE: <span className="text-[#F5F2EC] font-semibold">{item.size}</span>
                    </p>
                    <p className="text-sm font-serif text-[#B49A75]">
                      ${item.price} USD
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto space-x-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#292929]">
                  {/* Quantity Control */}
                  <div className="flex items-center border border-[#292929] bg-[#0B0B0B]">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="px-3 py-1.5 text-xs text-[#A5A5A5] hover:text-[#F5F2EC]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="px-3 py-1.5 text-xs text-[#A5A5A5] hover:text-[#F5F2EC]"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-sm font-serif text-[#F5F2EC] min-w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-[#A5A5A5] hover:text-red-400 p-1.5 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-4">
            <div className="border border-[#292929] bg-[#121212] p-8 space-y-6 sticky top-28">
              <h2 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold border-b border-[#292929] pb-4">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs tracking-wider text-[#A5A5A5]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#F5F2EC] font-serif text-sm">${subtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Worldwide Courier</span>
                  <span className="text-[#B49A75]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between">
                  <span>Archival Packaging</span>
                  <span className="text-[#B49A75]">INCLUDED</span>
                </div>
              </div>

              <div className="border-t border-[#292929] pt-4 flex justify-between items-baseline">
                <span className="text-xs tracking-widest text-[#F5F2EC] uppercase font-semibold">
                  ESTIMATED TOTAL
                </span>
                <span className="font-serif text-2xl text-[#B49A75]">
                  ${subtotal.toFixed(2)} USD
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase flex items-center justify-center space-x-2 transition-colors"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

