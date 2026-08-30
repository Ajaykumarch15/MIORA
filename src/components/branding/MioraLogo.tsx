type MioraLogoProps = {
  variant?: "light" | "dark";
  size?: "small" | "medium" | "large";
  className?: string;
};

const sizeMap = {
  small: "h-5 sm:h-6",
  medium: "h-6 sm:h-7 md:h-8",
  large: "h-8 sm:h-10 md:h-12",
};

export default function MioraLogo({
  variant = "dark",
  size = "medium",
  className = "",
}: MioraLogoProps) {
  const src =
    variant === "light"
      ? "/miora-assets/branding/light-logo.png"
      : "/miora-assets/branding/dark-logo.png";

  return (
    <img
      src={src}
      alt="MIORA — A quiet place to remember"
      className={`${sizeMap[size]} w-auto ${className}`}
    />
  );
}
