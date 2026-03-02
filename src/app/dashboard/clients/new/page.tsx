"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TABS = [
  "Details",
  "Travel Preferences",
  "Loyalty Programs",
  "Key Dates",
  "Documents",
] as const;

type TabId = (typeof TABS)[number];

export default function AddNewClientPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("Details");
  const [tags, setTags] = useState<string[]>(["VIP", "Family", "Repeat Client"]);
  const [tagInput, setTagInput] = useState("");
  const [dates, setDates] = useState<Record<string, Date | null>>({
    birthday: null,
    passportExpiry: null,
    anniversary: null,
    visaExpiry: null,
    licenseExpiry: null,
  });

  const addTag = () => {
    if (tagInput.trim()) {
      setTags((p) => [...p, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (t: string) => {
    setTags((p) => p.filter((x) => x !== t));
  };

  const handleSave = () => {
    router.push("/dashboard/clients");
  };

  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-border-light bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-lg font-medium text-charcoal">
              clearjourney
            </Link>
            <Link
              href="/dashboard/clients"
              className="text-charcoal-light hover:text-charcoal"
            >
              ← Add New Client
            </Link>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-navy px-4 py-2 font-medium text-white hover:bg-navy-dark"
          >
            Save Client
          </button>
        </div>
        <div className="mx-auto mt-4 flex max-w-4xl gap-6 border-b border-border-light">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 pb-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "border-charcoal text-charcoal"
                  : "border-transparent text-charcoal-light hover:text-charcoal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-border-light bg-white p-6 shadow-sm">
          {/* Details */}
          {activeTab === "Details" && (
            <>
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xl">👤</span>
                <h2 className="text-lg font-bold text-charcoal">
                  Personal Information
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Phone Number *
                  </label>
                  <div className="flex rounded-lg border border-border-light bg-white overflow-hidden">
                    <span className="flex items-center gap-1 border-r border-border-light px-3 py-2.5 text-charcoal-light">
                      🇺🇸 +1
                    </span>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="flex-1 px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  <h2 className="text-lg font-bold text-charcoal">Notes</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-charcoal">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-charcoal">
                      Additional Info
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add any special requests, preferences, or important details about this client..."
                      className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                    />
                    <p className="mt-1 flex items-center gap-1 text-xs text-charcoal-light">
                      💡 AI will help organize and summarize your notes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">🏠</span>
                  <h2 className="text-lg font-bold text-charcoal">
                    Residential Address
                  </h2>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Street address"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc."
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                  <div className="grid gap-4 md:grid-cols-3">
                    <input
                      type="text"
                      placeholder="City"
                      className="rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                    />
                    <input
                      type="text"
                      placeholder="State / Province"
                      className="rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">🏷️</span>
                  <h2 className="text-lg font-bold text-charcoal">
                    Client Tags
                  </h2>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Birthday"
                    className="flex-1 rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white hover:bg-navy-dark"
                  >
                    +
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full bg-charcoal-light/10 px-3 py-1 text-sm text-charcoal"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="hover:text-charcoal-light"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <p className="mt-2 flex items-center gap-1 text-xs text-charcoal-light">
                  💡 Suggested: Anniversary, Birthday, Honeymoon, Business,
                  Foodie
                </p>
              </div>
            </>
          )}

          {/* Travel Preferences */}
          {activeTab === "Travel Preferences" && (
            <>
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xl">❤️</span>
                <h2 className="text-lg font-bold text-charcoal">
                  Travel Preferences
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Hotel Preference
                  </label>
                  <select className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal outline-none focus:ring-2 focus:ring-navy/20">
                    <option>Select Hotel Type</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Dietary Preference
                  </label>
                  <select className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal outline-none focus:ring-2 focus:ring-navy/20">
                    <option>Select Diet</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Seat Preference
                  </label>
                  <select className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal outline-none focus:ring-2 focus:ring-navy/20">
                    <option>Select Seat Preference</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Travel Style
                  </label>
                  <select className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal outline-none focus:ring-2 focus:ring-navy/20">
                    <option>Select Travel Style</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Loyalty Programs */}
          {activeTab === "Loyalty Programs" && (
            <>
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xl">✈️</span>
                <h2 className="text-lg font-bold text-charcoal">
                  Loyalty Programs
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Program Type
                  </label>
                  <select className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal outline-none focus:ring-2 focus:ring-navy/20">
                    <option>Select Type</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Membership Number
                  </label>
                  <input
                    type="text"
                    placeholder="Member ID"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Program Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Delta SkyMiles"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Tier
                  </label>
                  <select className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal outline-none focus:ring-2 focus:ring-navy/20">
                    <option>Select Tier</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Key Dates */}
          {activeTab === "Key Dates" && (
            <>
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xl">📅</span>
                <h2 className="text-lg font-bold text-charcoal">Key Dates</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Birthday
                  </label>
                  <DatePicker
                    selected={dates.birthday}
                    onChange={(d) => setDates((p) => ({ ...p, birthday: d ?? null }))}
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Passport Expiry
                  </label>
                  <DatePicker
                    selected={dates.passportExpiry}
                    onChange={(d) =>
                      setDates((p) => ({ ...p, passportExpiry: d ?? null }))
                    }
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Anniversary
                  </label>
                  <DatePicker
                    selected={dates.anniversary}
                    onChange={(d) =>
                      setDates((p) => ({ ...p, anniversary: d ?? null }))
                    }
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Visa Expiry
                  </label>
                  <DatePicker
                    selected={dates.visaExpiry}
                    onChange={(d) =>
                      setDates((p) => ({ ...p, visaExpiry: d ?? null }))
                    }
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5"
                  />
                </div>
              </div>
            </>
          )}

          {/* Documents */}
          {activeTab === "Documents" && (
            <>
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xl">🛂</span>
                <h2 className="text-lg font-bold text-charcoal">Documents</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Passport Number"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Driver&apos;s License Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter License Number"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Driver&apos;s License Expiry
                  </label>
                  <DatePicker
                    selected={dates.licenseExpiry}
                    onChange={(d) =>
                      setDates((p) => ({ ...p, licenseExpiry: d ?? null }))
                    }
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    Visa Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Add visa information, restrictions, or special requirements....."
                    className="w-full rounded-lg border border-border-light bg-white px-3 py-2.5 text-charcoal placeholder-charcoal-light outline-none focus:ring-2 focus:ring-navy/20"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
