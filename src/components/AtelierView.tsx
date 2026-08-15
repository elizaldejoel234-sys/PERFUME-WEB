import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Check } from 'lucide-react';

export const AtelierView: React.FC = () => {
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    date: '2026-09-01',
    location: 'Place Vendôme, Paris',
    interest: 'Haute Couture Sur-Mesure',
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentBooked(true);
  };

  return (
    <div className="pt-20 sm:pt-28 md:pt-36 pb-28 md:pb-24 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="font-label-caps text-xs text-[#e9c349] tracking-widest uppercase mb-3">
          SAVOIR-FAIRE &amp; HÉRITAGE
        </span>
        <h1 className="font-display-xl text-5xl md:text-7xl text-[#e5e2e1] mb-6 tracking-tighter">
          L'ATELIER PARISIEN
        </h1>
        <p className="font-body-rt text-base md:text-lg text-[#c4c7c7] max-w-2xl mx-auto font-light leading-relaxed">
          Au cœur du 1er arrondissement de Paris, nos artisans d'art façonnent chaque pièce dans le respect des traditions de la Haute Joaillerie et de la Parfumerie Raréfiée.
        </p>
      </div>

      {/* Grid of Expertise */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="glass-panel p-8 rounded border border-[#e5e2e1]/10 flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-xs text-[#e9c349] block mb-3">01 // MATÉRIAUX NOBLES</span>
            <h3 className="font-headline-lg text-2xl text-[#e5e2e1] mb-4">MÉTAL &amp; PIERRE BRUTE</h3>
            <p className="font-body-rt text-sm text-[#c4c7c7] font-light leading-relaxed">
              Argent 925 recyclé haute densité, onyx pur taillé au diamant, et titane grade 5 forgé dans les ateliers suisses.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#444748]/20 font-label-tech text-xs text-[#8e9192]">
            PRECISION CHIRURGICALE
          </div>
        </div>

        <div className="glass-panel p-8 rounded border border-[#e5e2e1]/10 flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-xs text-[#e9c349] block mb-3">02 // HAUTE PARFUMERIE</span>
            <h3 className="font-headline-lg text-2xl text-[#e5e2e1] mb-4">EXTRAITS DE NUIT</h3>
            <p className="font-body-rt text-sm text-[#c4c7c7] font-light leading-relaxed">
              Ingrédients naturels rares récoltés à la main à Grasse et distillés en flacons de cristal soufflé à la bouche.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#444748]/20 font-label-tech text-xs text-[#8e9192]">
            CONCENTRATION 28%
          </div>
        </div>

        <div className="glass-panel p-8 rounded border border-[#e5e2e1]/10 flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-xs text-[#e9c349] block mb-3">03 // COUTURE STRUCTURALE</span>
            <h3 className="font-headline-lg text-2xl text-[#e5e2e1] mb-4">ARCHITECTURE PORTÉE</h3>
            <p className="font-body-rt text-sm text-[#c4c7c7] font-light leading-relaxed">
              Coupes asymétriques rigoureuses, drapés moulés sur mannequin et coutures invisibles réalisées à la main.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#444748]/20 font-label-tech text-xs text-[#8e9192]">
            180H PAR CRÉATION
          </div>
        </div>
      </div>

      {/* Concierge Appointment Booking */}
      <div className="glass-panel p-8 md:p-14 rounded-lg border border-[#e5e2e1]/20 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Sparkles className="w-8 h-8 text-[#e9c349] mx-auto mb-3 stroke-1" />
          <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e5e2e1] mb-2">
            PRENDRE RENDEZ-VOUS EN SALON PRIVÉ
          </h2>
          <p className="font-body-rt text-sm text-[#c4c7c7] font-light">
            Essayages privatifs et consultations olfactives personnalisées avec notre maître créateur à Paris ou Genève.
          </p>
        </div>

        {appointmentBooked ? (
          <div className="bg-[#1c1b1b] p-8 rounded text-center border border-[#e9c349]/50 animate-in zoom-in-95">
            <Check className="w-12 h-12 text-[#e9c349] mx-auto mb-3" />
            <h3 className="font-headline-lg text-2xl text-[#e5e2e1] mb-2">
              DEMANDE DE RENDEZ-VOUS CONFIRMÉE
            </h3>
            <p className="font-body-rt text-sm text-[#c4c7c7] max-w-md mx-auto font-light">
              Notre conciergerie privée prendra contact avec vous sous 2 heures pour confirmer les modalités de votre accueil.
            </p>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-tech text-[#8e9192] mb-1">VOTRE NOM COMPLET</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Baronne de Rothschild"
                  value={appointmentData.name}
                  onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })}
                  className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#e5e2e1] text-sm focus:border-[#e9c349]"
                />
              </div>
              <div>
                <label className="block text-xs font-label-tech text-[#8e9192] mb-1">EMAIL DE CONTACT</label>
                <input
                  type="email"
                  required
                  placeholder="votre.email@domaine.com"
                  value={appointmentData.email}
                  onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
                  className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#e5e2e1] text-sm focus:border-[#e9c349]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-tech text-[#8e9192] mb-1">SALON SOUHAITÉ</label>
                <select
                  value={appointmentData.location}
                  onChange={(e) => setAppointmentData({ ...appointmentData, location: e.target.value })}
                  className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#e5e2e1] text-sm focus:border-[#e9c349]"
                >
                  <option>Place Vendôme, Paris</option>
                  <option>Rue du Rhône, Genève</option>
                  <option>Mayfair, Londres</option>
                  <option>Fifth Avenue, New York</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-label-tech text-[#8e9192] mb-1">SERVICE</label>
                <select
                  value={appointmentData.interest}
                  onChange={(e) => setAppointmentData({ ...appointmentData, interest: e.target.value })}
                  className="w-full bg-[#20201f] border border-[#444748]/40 rounded px-3 py-2 text-[#e5e2e1] text-sm focus:border-[#e9c349]"
                >
                  <option>Haute Couture Sur-Mesure</option>
                  <option>Consultation Olfactive Privée</option>
                  <option>Joaillerie &amp; Horlogerie d'Exception</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 border border-[#E5E4E2] bg-transparent text-[#E5E4E2] font-label-caps text-xs uppercase tracking-[0.2em] hover:bg-[#E5E4E2] hover:text-black transition-all duration-300 mt-4 font-medium"
            >
              RÉSERVER MON RENDEZ-VOUS PRIVATIF
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
