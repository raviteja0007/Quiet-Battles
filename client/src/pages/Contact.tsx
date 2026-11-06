import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Client Inquiries',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0B0B0B] text-[#F5F2EC] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="space-y-4 border-b border-[#292929] pb-8">
          <span className="text-xs tracking-[0.35em] text-[#B49A75] uppercase block">
            ATELIER COMMUNICATION
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#F5F2EC]">
            CONTACT & INQUIRIES
          </h1>
          <p className="text-sm text-[#A5A5A5] font-light max-w-xl">
            For bespoke garment appointments, editorial loans, archival inquiries, or private consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Info column */}
          <div className="md:col-span-5 space-y-8">
            <div className="border border-[#292929] bg-[#121212] p-8 space-y-6">
              <h3 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold border-b border-[#292929] pb-3">
                PRIMARY STUDIOS
              </h3>

              <div className="space-y-4 text-xs leading-relaxed text-[#A5A5A5]">
                <div className="space-y-1">
                  <p className="text-[#F5F2EC] font-semibold">Tokyo Atelier (Design & Milling)</p>
                  <p>Minami-Aoyama, Minato City, Tokyo 107-0062</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[#F5F2EC] font-semibold">New York Studio (Archive & Courier)</p>
                  <p>445 Lafayette St, New York, NY 10003</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[#F5F2EC] font-semibold">Paris Showroom</p>
                  <p>Rue de Turenne, 75003 Paris</p>
                </div>
              </div>
            </div>

            <div className="border border-[#292929] bg-[#121212] p-6 space-y-3 text-xs text-[#A5A5A5]">
              <div className="flex items-center space-x-2 text-[#F5F2EC]">
                <Mail className="w-4 h-4 text-[#B49A75]" />
                <span className="font-medium">Direct Inquiries:</span>
              </div>
              <p>atelier@quietbattles.com</p>
              <p>press@quietbattles.com</p>
            </div>
          </div>

          {/* Form column */}
          <div className="md:col-span-7">
            <div className="border border-[#292929] bg-[#121212] p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#B49A75] mx-auto" />
                  <h3 className="font-serif text-2xl text-[#F5F2EC]">
                    DISPATCH RECEIVED
                  </h3>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed max-w-sm mx-auto">
                    Your inquiry has been relayed to the atelier team. We will respond with thoughtful care within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xs tracking-[0.25em] text-[#F5F2EC] uppercase font-semibold border-b border-[#292929] pb-3">
                    TRANSMIT MESSAGE
                  </h3>

                  <div>
                    <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-3 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-3 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-3 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
                    >
                      <option value="Client Inquiries">Client Inquiries & Private Fittings</option>
                      <option value="Order Tracking">Order & Courier Assistance</option>
                      <option value="Press / Editorial">Press, Editorial & Loan Requests</option>
                      <option value="General Archival">General Archival Dialogue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your inquiry..."
                      className="w-full bg-[#0B0B0B] border border-[#292929] px-4 py-3 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase flex items-center justify-center space-x-2 transition-colors"
                  >
                    <span>TRANSMIT DISPATCH</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

