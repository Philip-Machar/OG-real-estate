// File: src/components/feature/FloatingWhatsApp.tsx
export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/254794444591"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="ri-whatsapp-line text-3xl md:text-4xl" />
      
      {/* Premium Tooltip */}
      <span className="absolute right-full mr-4 px-4 py-2 bg-foreground-950 text-white text-xs font-bold tracking-wide whitespace-nowrap rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Chat with Kevlin & Company
        {/* Little triangle pointing to the button */}
        <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-[6px] border-transparent border-l-foreground-950" />
      </span>
    </a>
  );
}