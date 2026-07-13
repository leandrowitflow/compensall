type DocumentPageHeaderProps = {
  label?: string;
  title: string;
};

export default function DocumentPageHeader({ label = "Legal Document", title }: DocumentPageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#1f3664] to-[#2669f3] px-8 py-8 flex items-center gap-5">
      <div className="w-16 h-16 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
        <img
          src="/assets/documents/document-icon.svg"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
      </div>
      <div>
        <p className="text-white/70 text-sm mb-1">{label}</p>
        <h1 className="font-bold text-white text-2xl md:text-3xl">{title}</h1>
      </div>
    </div>
  );
}
