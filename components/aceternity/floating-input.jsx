"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function FloatingLabelInput({
  label,
  id,
  className,
  placeholder,
  required = false,
  type = "text",
  onChange,
  name,
  value,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value ? true : false);

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        value={value}
        type={type}
        placeholder=""
        className={cn(
          "pt-6 pb-2 border-slate-700/50 bg-slate-800/50",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        {...props}
      />
      <motion.label
        htmlFor={id}
        initial={{ y: value ? -12 : 0, scale: value ? 0.8 : 1 }}
        animate={{
          y: isFocused || value ? -12 : 0,
          scale: isFocused || value ? 0.8 : 1,
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 origin-left text-slate-400 transition-all pointer-events-none"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>
    </div>
  );
}

export function FloatingLabelTextarea({
  label,
  id,
  className,
  required = false,
  onChange,
  name,
  value,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value ? true : false);

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        className={cn(
          "flex min-h-24 w-full rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-6 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        {...props}
      />
      <motion.label
        htmlFor={id}
        initial={{ y: value ? -12 : 0, scale: value ? 0.8 : 1 }}
        animate={{
          y: isFocused || value ? -12 : 0,
          scale: isFocused || value ? 0.8 : 1,
        }}
        className="absolute left-3 top-6 -translate-y-1/2 origin-left text-slate-400 transition-all pointer-events-none"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>
    </div>
  );
}
