/**
 * Mock client profile data – shared between profile page and edit page.
 * In a real app this would come from API/database.
 */

import type {
  PreferenceItem,
  TravelDocumentItem,
  EmergencyContactData,
  HealthData,
  ImportantDatesData,
} from "@/components/ClientProfileTabs";
import type { TravelerTitle } from "@/types/secure-forms";

export interface MockClient {
  name: string;
  /** Optional honorific for display (e.g. Mr, Ms); shown before name in profile header */
  title?: TravelerTitle;
  /** When title is Other */
  titleOther?: string;
  initials: string;
  dob: string;
  age: number;
  email: string;
  phone: string;
  tags: { label: string; style: string }[];
  preferences: PreferenceItem[];
  travelDocuments: TravelDocumentItem[];
  emergencyContact: EmergencyContactData;
  health: HealthData;
  importantDates: ImportantDatesData;
  household: { name: string; role: string }[];
  householdSummary: string;
  aiSummary: string;
  notes: { date: string; text: string }[];
  reminders: {
    overdue: { title: string; due: string }[];
    upcoming: { title: string; due: string }[];
  };
}

export const MOCK_CLIENTS: Record<string, MockClient> = {
  "emma-johnson": {
    name: "Emma Johnson",
    title: "Ms",
    initials: "EJ",
    dob: "18/05/1982",
    age: 42,
    email: "emma.johnson@email.com",
    phone: "+1 (555) 123-4567",
    tags: [
      { label: "VIP", style: "bg-amber-100 text-amber-800" },
      { label: "Returning Client", style: "bg-charcoal-light/10 text-charcoal" },
    ],
    preferences: [
      {
        iconKey: "accommodations",
        label: "Accommodations",
        value: "Prefers luxury boutique hotels with ocean views. King bed only.",
      },
      {
        iconKey: "dining",
        label: "Dining",
        value: "Pescatarian diet. Enjoys fine dining and wine pairings.",
      },
      {
        iconKey: "travel",
        label: "Travel",
        value: "Business class or higher. Aisle seat preferred.",
      },
      {
        iconKey: "special",
        label: "Special Interests",
        value: "Wine tasting, cooking classes, cultural experiences.",
      },
    ],
    travelDocuments: [
      {
        name: "Emma Johnson",
        role: "Primary",
        passportNumber: "X1234567",
        country: "United States",
        issueDate: "15 Jun 2021",
        expiryDate: "14 Jun 2031",
      },
      {
        name: "David Johnson",
        role: "Partner",
        passportNumber: "P9876543",
        expiryDate: "09 Aug 2029",
      },
    ],
    emergencyContact: {
      name: "David Johnson",
      relationship: "Partner",
      phone: "+1 555 987 6543",
      email: "david@email.com",
    },
    health: {
      mobilityAssistance: false,
      dietaryRestrictions: "Pescatarian",
      medicalNotes: "None",
    },
    importantDates: {
      birthday: "18 May",
      anniversary: "15 June",
      specialDates: [
        { label: "Special Dates", value: "Wedding anniversary celebration" },
      ],
    },
    household: [
      { name: "Emma Johnson", role: "Primary" },
      { name: "David Johnson", role: "Partner" },
      { name: "Sophia Johnson", role: "Child" },
      { name: "Michael Johnson", role: "Child" },
    ],
    householdSummary: "2 adults, 2 children",
    aiSummary:
      "Emma values privacy and curated experiences. She prefers intimate settings with her family and appreciates personalized service that anticipates her needs without being intrusive.",
    notes: [
      {
        date: "March 15, 2024",
        text: "Mentioned interest in visiting Japan during cherry blossom season. Prefers traditional ryokans over modern hotels.",
      },
      {
        date: "March 10, 2024",
        text: "Loved the private wine tasting experience in Tuscany. Wants similar intimate experiences for future trips.",
      },
    ],
    reminders: {
      overdue: [{ title: "Follow up on Japan trip", due: "March 10, 2024" }],
      upcoming: [
        { title: "Send cherry blossom itinerary", due: "March 20, 2024" },
        { title: "Check visa requirements", due: "March 25, 2024" },
        { title: "Book ryokan reservations", due: "March 30, 2024" },
        { title: "Arrange airport transfers", due: "April 5, 2024" },
        { title: "Send packing recommendations", due: "April 10, 2024" },
      ],
    },
  },
};

/** Fallback for other client IDs – reuse Emma's structure with generic name */
export function getClientData(id: string): MockClient {
  const client = MOCK_CLIENTS[id];
  if (client) return client;
  const name = id === "wf1" || id === "wf2" ? "Warren Foster" : "Liang Smith";
  const initials = name.split(" ").map((n) => n[0]).join("");
  return {
    ...MOCK_CLIENTS["emma-johnson"],
    name,
    initials,
    title: "",
    titleOther: "",
    email: `${name.toLowerCase().replace(" ", ".")}@email.com`,
    tags: [{ label: "Client", style: "bg-charcoal-light/10 text-charcoal" }],
  };
}
