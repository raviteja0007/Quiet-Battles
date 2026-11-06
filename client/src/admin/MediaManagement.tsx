import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Upload, Trash2, Copy, Check, Plus, Image as ImageIcon } from 'lucide-react';

export const MediaManagement: React.FC = () => {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = () => {
    setLoading(true);
    api.get('/media')
      .then((res) => setMediaList(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    setUploading(true);
    try {
      await api.post('/media/upload', {
        imageUrl: newUrl,
        fileName: newFileName || 'editorial-asset.jpg',
      });
      setNewUrl('');
      setNewFileName('');
      fetchMedia();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to register image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Remove this asset from media archive?')) return;
    try {
      await api.delete(`/media/${id}`);
      fetchMedia();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to delete asset');
    }
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[#292929] pb-6">
        <span className="text-xs tracking-[0.3em] text-[#B49A75] uppercase block mb-1">
          ARCHIVAL ASSETS
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#F5F2EC]">
          MEDIA & IMAGE MANAGEMENT
        </h1>
      </div>

      {/* Upload / Register Bar */}
      <div className="border border-[#292929] bg-[#121212] p-6 space-y-4">
        <h2 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold">
          REGISTER NEW ASSET OR CLOUDINARY URL
        </h2>
        <form onSubmit={handleAddUrl} className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
          <div className="md:col-span-6">
            <input
              type="text"
              required
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Paste Cloudinary or high-resolution editorial image URL..."
              className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
            />
          </div>
          <div className="md:col-span-4">
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="File title (e.g. gentle_armor_look_01.jpg)"
              className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-2.5 text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={uploading}
              className="w-full h-full py-2.5 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{uploading ? 'REGISTERING...' : 'REGISTER'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs tracking-widest text-[#B49A75]">
          RETRIEVING ASSET REPOSITORY...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="border border-[#292929] bg-[#121212] overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden bg-[#0B0B0B]">
                <img
                  src={item.imageUrl}
                  alt={item.fileName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-[#F5F2EC] truncate max-w-[200px]">
                    {item.fileName}
                  </p>
                  <span className="text-[10px] text-[#A5A5A5] font-mono">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#292929] flex items-center justify-between">
                  <button
                    onClick={() => handleCopy(item.imageUrl, item.id)}
                    className="flex items-center space-x-1.5 text-[11px] text-[#B49A75] hover:text-[#F5F2EC] transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">COPIED URL</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY ASSET URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-[#A5A5A5] hover:text-red-400 p-1 transition-colors"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaManagement;

