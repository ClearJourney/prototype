"use client";

import { useState } from "react";
import {
  BedDouble,
  UtensilsCrossed,
  Plane,
  Heart,
  Pencil,
  type LucideIcon,
} from "lucide-react";

const PREFERENCE_ICONS: Record<string, LucideIcon> = {
  accommodations: BedDouble,
  dining: UtensilsCrossed,
  travel: Plane,
  special: Heart,
};

export type TabId =
  | "preferences"
  | "travel-documents"
  | "emergency-contact"
  | "health"
  | "important-dates";

export interface PreferenceItem {
  iconKey: keyof typeof PREFERENCE_ICONS;
  label: string;
  value: string;
}

export interface TravelDocumentItem {
  name: string;
  role: string;
  passportNumber?: string;
  country?: string;
  issueDate?: string;
  expiryDate?: string;
}

export interface EmergencyContactData {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface HealthData {
  mobilityAssistance: boolean;
  dietaryRestrictions: string;
  medicalNotes: string;
}

export interface ImportantDatesData {
  birthday: string;
  anniversary: string;
  specialDates?: { label: string; value: string }[];
}

interface ClientProfileTabsProps {
  preferences: PreferenceItem[];
  travelDocuments: TravelDocumentItem[];
  emergencyContact: EmergencyContactData;
  health: HealthData;
  importantDates: ImportantDatesData;
}

const TABS: { id: TabId; label: string }[] = [
  { id: "preferences", label: "Preferences" },
  { id: "travel-documents", label: "Travel Documents" },
  { id: "emergency-contact", label: "Emergency Contact" },
  { id: "health", label: "Health & Assistance" },
  { id: "important-dates", label: "Important Dates" },
];

export function ClientProfileTabs({
  preferences,
  travelDocuments,
  emergencyContact,
  health,
  importantDates,
}: ClientProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("preferences");

  const hasPassportData = travelDocuments.some(
    (t) => t.passportNumber || t.expiryDate
  );

  return (
    <section className="rounded-xl border border-border-light bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-charcoal">Preferences</h2>
        <button
          type="button"
          className="rounded-button p-2 text-charcoal-light transition-colors hover:bg-sand-warm hover:text-charcoal"
          aria-label="Edit preferences"
        >
          <Pencil className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Tab list */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-b border-border-light">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 pb-2 text-sm font-medium transition-colors hover:text-charcoal ${
              activeTab === tab.id
                ? "border-charcoal text-charcoal"
                : "border-transparent text-charcoal-light"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === "preferences" && (
          <ul className="space-y-4">
            {preferences.map((pref) => {
              const Icon = PREFERENCE_ICONS[pref.iconKey];
              return (
                <li key={pref.label} className="flex gap-3">
                  {Icon ? (
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-charcoal-light">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  ) : null}
                  <div>
                    <p className="font-medium text-charcoal">{pref.label}</p>
                    <p className="text-sm text-charcoal-light">{pref.value}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {activeTab === "travel-documents" && (
          <div className="space-y-6">
            {!hasPassportData ? (
              <p className="text-sm text-charcoal-light">
                Passport details not added yet.
              </p>
            ) : (
              travelDocuments.map((traveler) => {
                const hasPassport =
                  traveler.passportNumber || traveler.expiryDate;
                if (!hasPassport) return null;
                return (
                  <div key={traveler.name} className="space-y-1">
                    <p className="font-medium text-charcoal">
                      {traveler.name}{" "}
                      <span className="text-charcoal-light">
                        ({traveler.role})
                      </span>
                    </p>
                    <div className="text-sm text-charcoal-light space-y-0.5">
                      {traveler.passportNumber && (
                        <p>Passport: {traveler.passportNumber}</p>
                      )}
                      {traveler.country && (
                        <p>Country: {traveler.country}</p>
                      )}
                      {traveler.issueDate && (
                        <p>Issue Date: {traveler.issueDate}</p>
                      )}
                      {traveler.expiryDate && (
                        <p>Expiry Date: {traveler.expiryDate}</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "emergency-contact" && (
          <div className="space-y-1 text-sm">
            <p className="font-medium text-charcoal">
              {emergencyContact.name || "—"}
            </p>
            <p className="text-charcoal-light">
              {emergencyContact.relationship || "—"}
            </p>
            {emergencyContact.phone && (
              <p className="text-charcoal-light">
                Phone: {emergencyContact.phone}
              </p>
            )}
            {emergencyContact.email && (
              <p className="text-charcoal-light">
                Email: {emergencyContact.email}
              </p>
            )}
            {!emergencyContact.name &&
              !emergencyContact.phone &&
              !emergencyContact.email && (
                <p className="text-charcoal-light">
                  Emergency contact not added yet.
                </p>
              )}
          </div>
        )}

        {activeTab === "health" && (
          <div className="space-y-2 text-sm">
            <p className="text-charcoal">
              <span className="font-medium">Mobility Assistance: </span>
              <span className="text-charcoal-light">
                {health.mobilityAssistance ? "Yes" : "No"}
              </span>
            </p>
            <p className="text-charcoal">
              <span className="font-medium">Dietary Restrictions: </span>
              <span className="text-charcoal-light">
                {health.dietaryRestrictions || "None"}
              </span>
            </p>
            <p className="text-charcoal">
              <span className="font-medium">Medical Notes: </span>
              <span className="text-charcoal-light">
                {health.medicalNotes || "None"}
              </span>
            </p>
          </div>
        )}

        {activeTab === "important-dates" && (
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-charcoal">Birthday</p>
              <p className="text-charcoal-light">
                {importantDates.birthday || "—"}
              </p>
            </div>
            <div>
              <p className="font-medium text-charcoal">Anniversary</p>
              <p className="text-charcoal-light">
                {importantDates.anniversary || "—"}
              </p>
            </div>
            {importantDates.specialDates &&
              importantDates.specialDates.length > 0 && (
                <div>
                  <p className="font-medium text-charcoal">Special Dates</p>
                  {importantDates.specialDates.map((d) => (
                    <p key={d.label} className="text-charcoal-light">
                      {d.value}
                    </p>
                  ))}
                </div>
              )}
          </div>
        )}
      </div>
    </section>
  );
}
