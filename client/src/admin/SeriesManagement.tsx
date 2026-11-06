import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, Eye, X, Check } from 'lucide-react';

export const SeriesManagement: React.FC = () => {
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    coverImage: '',
    status: 'published',
  });

  const fetchSeries = () => {
    setLoading(true);
    api.get('/series')
      .then((res) => setSeriesList(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const handleOpenCreate = () => {
    setCurrentId(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
      status: 'published',
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (item: any) => {
    setCurrentId(item.id);
    setFormData({
      title: item.title,
      slug: item.slug,
      description: item.description,
      coverImage: item.coverImage,
      status: item.status || 'published',
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this series? All associated chapters will also be unlinked.')) return;
    try {
      await api.delete(`/series/${id}`);
      fetchSeries();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete series');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentId) {
        await api.put(`/series/${currentId}`, formData);
      } else {
        await api.post('/series', formData);
      }
      setIsEditing(false);
      fetchSeries();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save series');
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[#292929] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
            ARCHIVAL CURATION
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
            SERIES MANAGEMENT
          </h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center space-x-2 px-5 py-2.5 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-widest font-semibold uppercase transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>NEW SERIES</span>
        </button>
      </div>

      {/* Series Table */}
      <div className="border border-[#292929] bg-[#121212] overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs tracking-widest text-[#B49A75]">
            RETRIEVING RECORDS...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-wider">
              <thead>
                <tr className="border-b border-[#292929] text-[#A5A5A5] bg-[#0E0E0E]">
                  <th className="p-4 font-medium">COVER</th>
                  <th className="p-4 font-medium">TITLE</th>
                  <th className="p-4 font-medium">SLUG</th>
                  <th className="p-4 font-medium">STATUS</th>
                  <th className="p-4 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]">
                {seriesList.map((item) => (
                  <tr key={item.id} className="hover:bg-[#151515] transition-colors">
                    <td className="p-4">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-16 h-12 object-cover border border-[#292929]"
                      />
                    </td>
                    <td className="p-4 font-serif text-sm text-[#F5F2EC]">
                      {item.title}
                    </td>
                    <td className="p-4 text-[#A5A5A5] font-mono text-[11px]">
                      {item.slug}
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
                        title="Edit Series"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-[#A5A5A5] hover:text-red-400 transition-colors"
                        title="Delete Series"
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

      {/* Create / Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-2xl w-full border border-[#292929] bg-[#121212] p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#292929] pb-4">
              <h2 className="font-serif text-2xl text-[#F5F2EC]">
                {currentId ? 'EDIT COLLECTION SERIES' : 'CREATE NEW SERIES'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-[#A5A5A5] hover:text-[#F5F2EC]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Series Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. SERIES 02 – UNBROKEN HORIZONS"
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
                  placeholder="e.g. series-02"
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Description / Story Thesis
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summarize the core emotional statement..."
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
                  SAVE SERIES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeriesManagement;

