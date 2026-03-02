"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import type { AdvisorFormBranding } from "@/types/secure-forms";

const DEFAULT_BRANDING: AdvisorFormBranding = {
  businessName: "Your Travel Advisor",
  logoUrl: null,
  introHeadline: "Begin Your Travel Design",
  introSubtext: "Share a few details so we can thoughtfully prepare for your journey.",
  footerHtml: null,
  planningFeeDisclosure: null,
  serviceAreaLimitation: null,
};

interface SecureFormLayoutProps {
  children: React.ReactNode;
  branding?: Partial<AdvisorFormBranding>;
  /** Optional custom headline override for this form type */
  headline?: string;
  subtext?: string;
  /** Show compliance footer slot */
  showFooter?: boolean;
}

export function SecureFormLayout({
  children,
  branding: brandingOverride,
  headline,
  subtext,
  showFooter = true,
}: SecureFormLayoutProps) {
  const branding = { ...DEFAULT_BRANDING, ...brandingOverride };

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Soft gradient header — premium, calm */}
      <div className="border-b border-[#e8e4de] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-6 py-8 sm:px-8">
          {branding.logoUrl && (
            <div className="mb-6 flex justify-center">
              <Image
                src={branding.logoUrl}
                alt={branding.businessName}
                width={120}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
          )}
          {!branding.logoUrl && (
            <p className="mb-2 text-center text-sm font-medium text-[#5c5a57]">
              {branding.businessName}
            </p>
          )}
          <h1 className="text-center text-2xl font-semibold tracking-tight text-[#2c2a26] sm:text-3xl">
            {headline ?? branding.introHeadline}
          </h1>
          <p className="mt-2 text-center text-[#5c5a57]">
            {subtext ?? branding.introSubtext}
          </p>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#8a8784]">
            <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
            Secure · Private · Encrypted
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-2xl px-6 py-8 sm:px-8">{children}</main>

      {showFooter && (
        <footer className="border-t border-[#e8e4de] bg-white/60 py-6">
          <div className="mx-auto max-w-2xl px-6 text-center text-xs text-[#6b6865] sm:px-8">
            {branding.footerHtml ? (
              <div
                className="prose prose-sm max-w-none prose-p:my-1"
                dangerouslySetInnerHTML={{ __html: branding.footerHtml }}
              />
            ) : (
              <>
                <p>
                  Your information is held in confidence and used only to design
                  your journey.
                </p>
                {branding.planningFeeDisclosure && (
                  <p className="mt-2">{branding.planningFeeDisclosure}</p>
                )}
                {branding.serviceAreaLimitation && (
                  <p className="mt-1">{branding.serviceAreaLimitation}</p>
                )}
                <p className="mt-2">
                  <a
                    href="#"
                    className="underline hover:no-underline"
                  >
                    Terms &amp; Privacy
                  </a>
                </p>
              </>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
