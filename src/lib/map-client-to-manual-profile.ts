/**
 * Maps the display/client profile shape (MockClient) to ManualClientProfile
 * so the edit form can be pre-filled from existing client data.
 */

import type { MockClient } from "@/lib/mock-clients";
import type { ManualClientProfile, ManualTraveller } from "@/types/client-manual";

function parseName(fullName: string): { first: string; middle: string; last: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return { first: "", middle: "", last: "" };
  if (parts.length === 1) return { first: parts[0], middle: "", last: "" };
  const first = parts[0];
  const last = parts[parts.length - 1];
  const middle = parts.slice(1, -1).join(" ");
  return { first, middle, last };
}

function roleToRelationship(role: string): ManualTraveller["relationship"] {
  const r = role.toLowerCase();
  if (r === "primary" || r === "self") return "self";
  if (r === "partner" || r === "spouse") return r === "spouse" ? "spouse" : "partner";
  if (r === "child") return "child";
  if (r === "parent") return "parent";
  if (r === "friend") return "friend";
  return "other";
}

export function mapClientToManualProfile(client: MockClient): ManualClientProfile {
  const { first, middle, last } = parseName(client.name);
  const tagLabels = client.tags.map((t) => t.label);

  const prefsByLabel: Record<string, string> = {};
  client.preferences.forEach((p) => {
    prefsByLabel[p.label.toLowerCase()] = p.value;
  });

  const travellers: ManualTraveller[] = client.household.map((member, index) => {
    const doc = client.travelDocuments.find(
      (d) => d.name === member.name
    );
    const isPrimary = member.role === "Primary" || index === 0;
    const names = parseName(member.name);
    const hasPassport = Boolean(
      doc && (doc.passportNumber || doc.expiryDate)
    );
    return {
      id: `t-${index}-${member.name.replace(/\s/g, "-").toLowerCase()}`,
      firstName: names.first,
      middleName: names.middle,
      lastName: names.last,
      relationship: isPrimary ? "self" : roleToRelationship(member.role),
      dateOfBirth: isPrimary && client.dob ? client.dob : "",
      gender: "",
      passport: {
        hasPassport,
        passportNumber: doc?.passportNumber ?? "",
        issuingCountry: doc?.country ?? "",
        issueDate: doc?.issueDate ?? "",
        expiryDate: doc?.expiryDate ?? "",
        passportType: "",
        knownTravelerNumber: "",
      },
    };
  });

  const customDates =
    client.importantDates.specialDates?.map((d, i) => ({
      id: `d-${i}-${d.label}`,
      label: d.label,
      value: d.value,
      createReminder: false,
    })) ?? [];

  return {
    coreIdentity: {
      legalFirstName: first,
      legalLastName: last,
      middleName: middle,
      email: client.email,
      phone: client.phone,
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      dateOfBirth: client.dob,
      gender: "",
      tags: tagLabels,
    },
    travellers,
    emergencyContact: {
      name: client.emergencyContact.name,
      relationship: client.emergencyContact.relationship,
      phone: client.emergencyContact.phone,
      email: client.emergencyContact.email,
    },
    travelPreferences: {
      generalStyle: prefsByLabel["special interests"] ?? "",
      airPreferences: prefsByLabel["travel"] ?? "",
      accommodationPreferences: prefsByLabel["accommodations"] ?? "",
      cruisePreferences: "",
      seatPreference: "",
      roomPreference: "",
      transferPreference: "",
      specialRequests: prefsByLabel["dining"] ?? "",
      diningPreferences: prefsByLabel["dining"] ?? "",
      travelPreferences: prefsByLabel["travel"] ?? "",
      specialInterests: prefsByLabel["special interests"] ?? "",
    },
    health: {
      mobilityAssistance: client.health.mobilityAssistance,
      dietaryRestrictions: Boolean(client.health.dietaryRestrictions),
      medicalNotes: [client.health.dietaryRestrictions, client.health.medicalNotes]
        .filter(Boolean)
        .join(". ") || "",
    },
    specialDates: {
      birthday: client.importantDates.birthday,
      anniversary: client.importantDates.anniversary,
      customDates: customDates,
      passportExpiryReminderActive: false,
    },
    loyaltyPrograms: [],
    paymentMethods: [],
    advisorNotes: "",
    consent: {
      consentGiven: true,
      consentTimestamp: "",
      marketingOptIn: false,
      profileCompletedDate: "",
    },
  };
}
