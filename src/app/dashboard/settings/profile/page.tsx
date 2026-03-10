"use client";

import { useState, useRef } from "react";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { Toast } from "@/components/settings/Toast";
import { Upload } from "lucide-react";

// Stub: replace with real API when backend is ready
async function saveProfile(_data: ProfileFormData): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
}

type ProfileFormData = {
  fullName: string;
  businessName: string;
  businessEmail: string;
  phoneNumber: string;
  logoUrl: string | null;
};

const defaultForm: ProfileFormData = {
  fullName: "Liam Mistry",
  businessName: "Clear Journey Travel",
  businessEmail: "liam@clearjourney.example",
  phoneNumber: "+1 555 123 4567",
  logoUrl: null,
};

export default function ProfileSettingsPage() {
  const [form, setForm] = useState<ProfileFormData>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof ProfileFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => {
      if (prev.logoUrl) URL.revokeObjectURL(prev.logoUrl);
      return { ...prev, logoUrl: url };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProfile(form);
      setToastVisible(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SettingsPanel
        title="Profile"
        description="Basic user and account details."
      >
        <form onSubmit={handleSubmit}>
          <SettingsCard
            title="General Information"
            description="Update your profile and business details."
          >
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  className="w-full max-w-md rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-navy/15"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Business Name
                </label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={handleChange("businessName")}
                  className="w-full max-w-md rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-navy/15"
                  placeholder="Your business name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Business Email
                </label>
                <input
                  type="email"
                  value={form.businessEmail}
                  onChange={handleChange("businessEmail")}
                  className="w-full max-w-md rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-navy/15"
                  placeholder="hello@yourbusiness.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  className="w-full max-w-md rounded-button border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:ring-2 focus:ring-navy/15"
                  placeholder="+1 555 000 0000"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Logo
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="sr-only"
                  aria-label="Upload logo"
                />
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-card border border-border-light bg-sand-warm">
                    {form.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={form.logoUrl}
                        alt="Business logo"
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-2xl text-charcoal-light/50">—</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand-warm"
                  >
                    <Upload className="h-4 w-4" strokeWidth={1.5} />
                    Upload logo
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={saving}
                className="rounded-button bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-dark disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </SettingsCard>
        </form>
      </SettingsPanel>
      <Toast
        message="Profile saved successfully"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />
    </>
  );
}
