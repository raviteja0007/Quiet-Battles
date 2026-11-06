import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 380,
    category: 'Premium Streetwear',
    images: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    availableSizes: 'XS, S, M, L, XL, XXL',
    stock: 50,
    status: 'published',
  });

  const fetchProducts = () => {
    setLoading(true);
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setCurrentId(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: 380,
      category: 'Premium Streetwear',
      images: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      availableSizes: 'XS, S, M, L, XL, XXL',
      stock: 45,
      status: 'published',
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (item: any) => {
    setCurrentId(item.id);
    setFormData({
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      category: item.category,
      images: Array.isArray(item.images) ? item.images.join(', ') : item.images,
      availableSizes: Array.isArray(item.availableSizes) ? item.availableSizes.join(', ') : item.availableSizes,
      stock: item.stock,
      status: item.status || 'published',
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product from catalog?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.images.split(',').map((s) => s.trim()).filter(Boolean),
        availableSizes: formData.availableSizes.split(',').map((s) => s.trim()).filter(Boolean),
      };

      if (currentId) {
        await api.put(`/products/${currentId}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setIsEditing(false);
      fetchProducts();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save product');
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[#292929] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
            COMMERCE CATALOGUE
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
            PRODUCT MANAGEMENT
          </h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center space-x-2 px-5 py-2.5 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-widest font-semibold uppercase transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>NEW PRODUCT</span>
        </button>
      </div>

      <div className="border border-[#292929] bg-[#121212] overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs tracking-widest text-[#B49A75]">
            RETRIEVING CATALOGUE...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-wider">
              <thead>
                <tr className="border-b border-[#292929] text-[#A5A5A5] bg-[#0E0E0E]">
                  <th className="p-4 font-medium">VISUAL</th>
                  <th className="p-4 font-medium">PRODUCT NAME</th>
                  <th className="p-4 font-medium">PRICE</th>
                  <th className="p-4 font-medium">CATEGORY</th>
                  <th className="p-4 font-medium">STOCK</th>
                  <th className="p-4 font-medium">STATUS</th>
                  <th className="p-4 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]">
                {products.map((item) => (
                  <tr key={item.id} className="hover:bg-[#151515] transition-colors">
                    <td className="p-4">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-14 h-16 object-cover border border-[#292929]"
                      />
                    </td>
                    <td className="p-4 font-serif text-sm text-[#F5F2EC]">
                      {item.name}
                    </td>
                    <td className="p-4 font-serif text-[#B49A75]">
                      ${item.price} USD
                    </td>
                    <td className="p-4 text-[#A5A5A5]">
                      {item.category}
                    </td>
                    <td className="p-4 text-[#F5F2EC] font-mono">
                      {item.stock} units
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[10px] tracking-widest uppercase border ${
                        item.status === 'published'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-[#A5A5A5] hover:text-[#B49A75] transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-[#A5A5A5] hover:text-red-400 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-3xl w-full border border-[#292929] bg-[#121212] p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#292929] pb-4">
              <h2 className="font-serif text-2xl text-[#F5F2EC]">
                {currentId ? 'EDIT GARMENT PIECE' : 'CREATE NEW GARMENT'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-[#A5A5A5] hover:text-[#F5F2EC]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                    Garment Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. THE GENTLE ARMOR™"
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. gentle-armor"
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Premium Streetwear"
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Product Image URLs (Comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  placeholder="https://... , https://..."
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Available Sizes (Comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={formData.availableSizes}
                  onChange={(e) => setFormData({ ...formData, availableSizes: e.target.value })}
                  placeholder="XS, S, M, L, XL, XXL"
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Product Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Publication Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 border border-[#292929] text-[#A5A5A5] hover:text-[#F5F2EC] uppercase tracking-wider"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] font-semibold uppercase tracking-wider"
                >
                  SAVE GARMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;

