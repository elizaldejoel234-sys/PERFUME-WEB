import React from 'react';
import { ArrowRight } from 'lucide-react';

export const JournalView: React.FC = () => {
  const articles = [
    {
      title: "L'ESTHÉTIQUE DU SILENCE",
      date: '15 AOÛT 2026',
      category: 'ESSAI MATÉRIEL',
      excerpt: "Comment la pureté des lignes sombres et le rejet du superflu créent une résonance émotionnelle inédite dans le luxe contemporain.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCo4mBbYUu7tElH9u3hWIO4sASlf0-NnH3ErjgH32uYbQrrbHxlunYoT8AMVZqLuJZPI5YmsKCxfnLrhLXJRlfjSbq492edFHRgC3xXJ79tkEVLfyU3rzvRp7drnFv96U0w9UClxLHq1j5qPe-3w041s53viJOe571UFRkr_hqkLrIBbUDd7MeAmArl3Qnoe4nwKIAf16C6edY6GWHPxrNL_aivjfOsS_OiVB7bfJFk2nO2z-SD2iE4',
      readTime: '6 MIN',
    },
    {
      title: 'L’OBSIDIENNE ET LE CRISTAL MONOLITHE',
      date: '02 AOÛT 2026',
      category: 'SAVOIR-FAIRE OLFACTIF',
      excerpt: "L'art délicat d'enfermer un parfum de nuit dans une bouteille de cristal taillée au millimètre près comme une sculpture monolithique.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzOYbok5rG7iUyRvo0CYOIUD1ztaaRQLlzvCW8rYFNGUeNKxDzZV7zMZiGueo_BwoDz4PBGZdD-qv5d-ffo3kqT2lmNCkxwPM1igUTulHMGsTqMIoXt-ytjz1VxAAYwfV96rYuEzhFigH2ba6yLsplFzOXbi6gQ_oYLHyQ-ZgP9ZaoYRyxTGpzBBoqeOvTATZhYiAUbrOGHaoziiTF6qU4tRzbsnI9srnjJLRxHW1iW0WFdd7d0vj2',
      readTime: '4 MIN',
    },
    {
      title: 'INFLUENCES BRUTALISTES DANS LA HAUTE JOAILLERIE',
      date: '20 JUILLET 2026',
      category: 'ARCHITECTURE & BIJOUX',
      excerpt: "De l'architecture en béton armé à l'argent 925 martelé: quand la brutalité des formes rencontre l'élégance absolue.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXBhm21KKRRFDxItVO1e2Xiiv2gpq3geapy2XCd6EJo3tGl2kgcLFOVOPErUAMCuk5KNg7azUetfAvuVAcXlLLQugiAr8ZWgpuD1m-W2Kf5QbEgNbt_8jURaDEQK_FIJLcQS7anYLrQoJTcmMGzyB--VGPZGc-LKLqQhr4js9hFAPV7CrATNCKUDnxBekCovGQabjsHSDyL_5ORZWq5XRD1EqRMGLmHmyWrLCjiwg-RPrM4UtvTmN6',
      readTime: '8 MIN',
    },
  ];

  return (
    <div className="pt-20 sm:pt-28 md:pt-36 pb-28 md:pb-24 px-4 sm:px-6 md:px-16 max-w-[1440px] mx-auto w-full animate-in fade-in duration-300">
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="font-label-caps text-xs text-[#e9c349] tracking-widest uppercase mb-3">
          CHRONIQUES &amp; ÉDITORIAUX
        </span>
        <h1 className="font-display-xl text-5xl md:text-7xl text-[#e5e2e1] mb-6 tracking-tighter">
          LE JOURNAL DE L'ÉLITE
        </h1>
        <p className="font-body-rt text-base md:text-lg text-[#c4c7c7] max-w-2xl mx-auto font-light leading-relaxed">
          Reflexions sur la matière, la forme et le temps. Des essais exclusifs rédigés par nos directeurs artistiques et maîtres parfumeurs.
        </p>
      </div>

      {/* Hero Quote Editorial */}
      <div className="py-16 md:py-20 border-y border-[#444748]/20 mb-16 text-center">
        <p className="font-display-xl text-3xl md:text-5xl text-[#dbdad9] italic tracking-tighter leading-snug max-w-4xl mx-auto opacity-90">
          "Le silence est l'esthétique la plus puissante. Nous concevons pour les espaces entre l'ombre et la lumière."
        </p>
        <span className="font-label-caps text-xs text-[#e9c349] tracking-widest uppercase mt-6 block">
          — MAISON L'ÉLITE LUXE PARIS
        </span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art, idx) => (
          <article
            key={idx}
            className="glass-panel rounded overflow-hidden border border-[#e5e2e1]/10 flex flex-col justify-between group cursor-pointer hover:border-[#e9c349]/40 transition-all"
          >
            <div>
              <div className="h-64 overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover editorial-img group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#0A0A0A]/80 backdrop-blur-md text-xs font-label-tech text-[#e9c349]">
                  {art.category}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center text-xs font-label-tech text-[#8e9192] mb-3">
                  <span>{art.date}</span>
                  <span>{art.readTime} DE LECTURE</span>
                </div>
                <h3 className="font-headline-lg text-2xl text-[#e5e2e1] mb-3 leading-tight group-hover:text-[#e9c349] transition-colors">
                  {art.title}
                </h3>
                <p className="font-body-rt text-sm text-[#c4c7c7] font-light leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 pt-0 flex items-center text-xs font-label-caps text-[#e9c349] gap-2">
              LIRE L'ARTICLE COMPLET <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
