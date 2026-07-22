"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSettings } from '@/components/SettingsProvider';

interface LogoProps {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  subtitleClassName?: string;
  showText?: boolean;
  showSubtitle?: boolean;
  onClick?: () => void;
  sizes?: string;
  src?: string;
}

export function Logo({
  className,
  imageClassName,
  textClassName,
  subtitleClassName,
  showText = true,
  showSubtitle = true,
  onClick,
  sizes,
  src
}: LogoProps) {
  const { brandName, logoUrl } = useSettings();

  const finalBrandName = brandName || "Shah Jalal EnterPrise";
  const finalLogoUrl = src || logoUrl || "/logo.webp";

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 md:gap-3.5 group", className)} onClick={onClick}>
      <div className={cn("relative flex items-center justify-center overflow-hidden rounded-full transition-transform group-hover:scale-105 size-11 md:size-14 shrink-0 border border-border/10", imageClassName)}>
        <Image
          src={finalLogoUrl}
          alt={`${finalBrandName} Logo`}
          fill
          sizes={sizes || "(max-width: 768px) 44px, 56px"}
          className="object-cover rounded-full"
          quality={80}
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col items-center justify-center text-center leading-none">
          <span className={cn(
            "text-lg md:text-2xl uppercase text-foreground transition-colors group-hover:text-primary font-black tracking-tight font-logo text-center",
            textClassName
          )}>
            {finalBrandName}
          </span>
          {showSubtitle && (
            <span className={cn(
              "text-[8px] sm:text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-primary/90 text-center w-full mt-0.5 md:mt-1.5",
              subtitleClassName
            )}>
              An Exclusive Consulting Firm
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

