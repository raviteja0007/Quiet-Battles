import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const ChapterManagement: React.FC = () => {
  const [chapters, setChapters] = useState<any[]>([]);
  const [seriesList, setSeriesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    seriesId: '',
    chapterNumber: 1,
    title: '',
    slug: '',
    description: '',
    storyContent: '',
    coverImage: '',
    status: 'published',
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([api.get('/chapters'), api.get('/series')])
      .then(([chapRes, seriesRes]) => {
        setChapters(chapRes.data);
        setSeriesList(seriesRes.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setCurrentId(null);
    setFormData({
      seriesId: seriesList[0]?.id || '',
      chapterNumber: chapters.length + 1,
      title: '',
      slug: '',
      description: '',
      storyContent: '',
      coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
      status: 'published',
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (item: any) => {
    setCurrentId(item.id);
    setFormData({
      seriesId: item.seriesId,
      chapterNumber: item.chapterNumber,
      title: item.title,
      slug: item.slug,
      description: item.description,
      storyContent: item.storyContent,
      coverImage: item.coverImage,
      status: item.status || 'published',
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this narrative chapter?')) return;
    try {
      await api.delete(`/chapters/${id}`);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete chapter');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentId) {
        await api.put(`/chapters/${currentId}`, formData);
      } else {
        await api.post('/chapters', formData);
      }
      setIsEditing(false);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save chapter');
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[#292929] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
            NARRATIVE REPOSITORY
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
            CHAPTER MANAGEMENT
          </h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center space-x-2 px-5 py-2.5 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-widest font-semibold uppercase transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>NEW CHAPTER</span>
        </button>
      </div>

      <div className="border border-[#292929] bg-[#121212] overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs tracking-widest text-[#B49A75]">
            RETRIEVING CHAPTERS...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-wider">
              <thead>
                <tr className="border-b border-[#292929] text-[#A5A5A5] bg-[#0E0E0E]">
                  <th className="p-4 font-medium">CH #</th>
                  <th className="p-4 font-medium">COVER</th>
                  <th className="p-4 font-medium">TITLE</th>
                  <th className="p-4 font-medium">SLUG</th>
                  <th className="p-4 font-medium">STATUS</th>
                  <th className="p-4 font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292929]">
                {chapters.map((ch) => (
                  <tr key={ch.id} className="hover:bg-[#151515] transition-colors">
                    <td className="p-4 font-serif text-base text-[#B49A75]">
                      0{ch.chapterNumber}
                    </td>
                    <td className="p-4">
                      <img
                        src={ch.coverImage}
                        alt={ch.title}
                        className="w-16 h-12 object-cover border border-[#292929]"
                      />
                    </td>
                    <td className="p-4 font-serif text-sm text-[#F5F2EC]">
                      {ch.title}
                    </td>
                    <td className="p-4 text-[#A5A5A5] font-mono text-[11px]">
                      {ch.slug}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[10px] tracking-widest uppercase border ${
                        ch.status === 'published'
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}>
                        {ch.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(ch)}
                        className="p-1.5 text-[#A5A5A5] hover:text-[#B49A75] transition-colors"
                        title="Edit Chapter"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ch.id)}
                        className="p-1.5 text-[#A5A5A5] hover:text-red-400 transition-colors"
                        title="Delete Chapter"
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

      {/* Chapter Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-3xl w-full border border-[#292929] bg-[#121212] p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#292929] pb-4">
              <h2 className="font-serif text-2xl text-[#F5F2EC]">
                {currentId ? 'EDIT NARRATIVE CHAPTER' : 'WRITE NEW CHAPTER'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-[#A5A5A5] hover:text-[#F5F2EC]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                    Assign to Series
                  </label>
                  <select
                    value={formData.seriesId}
                    onChange={(e) => setFormData({ ...formData, seriesId: e.target.value })}
                    required
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  >
                    {seriesList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                    Chapter Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    required
                    value={formData.chapterNumber}
                    onChange={(e) => setFormData({ ...formData, chapterNumber: Number(e.target.value) })}
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                    Chapter Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. CHAPTER 01 – THE FIRST SCAR"
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
                    placeholder="e.g. chapter-01"
                    className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                  />
                </div>
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
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Introductory Statement / Subhead
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short emotional statement summarizing this movement..."
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Story Content (Long-Form Essay)
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.storyContent}
                  onChange={(e) => setFormData({ ...formData, storyContent: e.target.value })}
                  placeholder="Write the long-form storytelling essay here..."
                  className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1">
                  Status
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
                  SAVE CHAPTER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterManagement;

