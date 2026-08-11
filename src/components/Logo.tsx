import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "gold" | "white";
  showText?: boolean;
  showTagline?: boolean;
}

export default function Logo({
  className = "",
  size = "md",
  variant = "white",
  showText = true,
  showTagline = true,
}: LogoProps) {
  const dimensions = {
    sm: { img: 34, text: "text-base", badge: "text-[10px]", sub: "text-[8px]" },
    md: { img: 46, text: "text-xl", badge: "text-xs", sub: "text-[10px]" },
    lg: { img: 60, text: "text-2xl", badge: "text-sm", sub: "text-xs" },
    xl: { img: 80, text: "text-3xl", badge: "text-base", sub: "text-sm" },
  };

  const selectedDim = dimensions[size] || dimensions.md;

  const logoSrc =
    variant === "white"
      ? "/images/gospel-inn-logo-white.png"
      : "/images/gospel-inn-logo-gold.png";

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* 3D Seal Logo Image Emblem */}
      <div
        className={`relative shrink-0 rounded-full transition-all duration-300 group-hover:scale-105 ${
          variant === "gold"
            ? "border border-gim-gold/50 shadow-[0_0_20px_rgba(234,179,8,0.25)] bg-gim-gold-dark"
            : "border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-slate-900"
        }`}
        style={{ width: selectedDim.img, height: selectedDim.img }}
      >
        <Image
          src={logoSrc}
          alt="Gospel Inn Ministry Official Logo"
          width={selectedDim.img}
          height={selectedDim.img}
          className="rounded-full object-cover p-0.5"
          priority
        />
        {/* Glow ambient overlay */}
        <div
          className={`absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity ${
            variant === "gold" ? "bg-gim-gold" : "bg-gim-skyblue-bright"
          }`}
        ></div>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`font-black tracking-wider uppercase font-serif ${
                variant === "gold"
                  ? "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-sm"
                  : "text-white"
              } ${selectedDim.text}`}
            >
              GOSPEL INN
            </span>
            <span
              className={`font-bold px-2 py-0.5 rounded-full border shadow-sm ${selectedDim.badge} ${
                variant === "gold"
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                  : "bg-gim-skyblue-bright/10 text-gim-skyblue-bright border-gim-skyblue-bright/30"
              }`}
            >
              MINISTRY
            </span>
          </div>
          {showTagline && (
            <span
              className={`font-semibold tracking-widest uppercase -mt-0.5 ${selectedDim.sub} ${
                variant === "gold" ? "text-amber-200/70" : "text-slate-400"
              }`}
            >
              REVIVAL AMONG NATIONS
            </span>
          )}
        </div>
      )}
    </div>
  );
}
