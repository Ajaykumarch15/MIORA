import type { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function FormInput({ label, id, ...props }: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-miora-turbulent mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full h-12 px-4 rounded-xl bg-miora-diamond/60 border border-miora-blue/40 text-miora-charcoal text-[15px] placeholder:text-miora-meditative/50 focus:outline-none focus:border-miora-turbulent/60 focus:bg-white transition-colors"
        {...props}
      />
    </div>
  );
}
