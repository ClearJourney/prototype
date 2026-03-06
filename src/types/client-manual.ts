/**
 * Add Client – Manual flow types.
 * Aligned with secure-forms (ClientProfileFormData) for schema parity;
 * private form submission can match by email and update these fields.
 */

import type {
  TravelerDetailsStep,
  PassportStep,
  EmergencyContactStep,
  TravelPreferencesStep,
  HealthStep,
} from "./secure-forms";

export type { TravelerDetailsStep, PassportStep, EmergencyContactStep, TravelPreferencesStep, HealthStep };

/** Quick Create – Stage 1 (only name required) */
export interface QuickCreateData {
  legalFirstName: string;
  legalLastName: string;
  middleName: string;
  email: string;
  phone: string;
  tags: string[];
}

/** Traveller relationship. "self" = main traveller (client); others for additional travellers only. */
export type TravellerRelationship = "self" | "spouse" | "partner" | "child" | "parent" | "friend" | "other";

export interface ManualTraveller {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  relationship: TravellerRelationship;
  dateOfBirth: string;
  gender: string;
  passport: {
    hasPassport: boolean;
    passportNumber: string;
    issuingCountry: string;
    issueDate: string;
    expiryDate: string;
    passportType: string;
    knownTravelerNumber: string;
    uploadPassportScan?: string; // placeholder for file ref
  };
}

/** Special date with optional reminder */
export interface SpecialDateEntry {
  id: string;
  label: string; // e.g. "Birthday", "Anniversary", or custom
  value: string;
  createReminder: boolean;
}

/** Loyalty program card */
export interface LoyaltyProgramEntry {
  id: string;
  programType: "airline" | "hotel" | "car" | "cruise" | "other";
  programName: string;
  membershipNumber: string;
  tier: string;
}

/** PCI-safe payment method (no full number, no CVV) */
export interface PaymentMethodEntry {
  id: string;
  cardNickname: string;
  cardholderName: string;
  last4: string;
  expiryDate: string;
  notes: string;
  storedSecurelyWithAdvisor: boolean;
}

/** Extended travel preferences (manual form) */
export interface ManualTravelPreferences extends TravelPreferencesStep {
  seatPreference?: string;
  roomPreference?: string;
  transferPreference?: string;
  specialRequests?: string;
}

/** Consent & system fields (schema parity with private form) */
export interface ConsentAndSystemFields {
  consentGiven: boolean;
  consentTimestamp: string;
  marketingOptIn: boolean;
  profileCompletedDate: string;
}

/** Full manual client profile – Stage 2 */
export interface ManualClientProfile {
  coreIdentity: TravelerDetailsStep & { tags: string[] };
  travellers: ManualTraveller[];
  emergencyContact: EmergencyContactStep;
  travelPreferences: ManualTravelPreferences;
  health: HealthStep;
  specialDates: {
    birthday: string;
    anniversary: string;
    customDates: SpecialDateEntry[];
    passportExpiryReminderActive?: boolean;
  };
  loyaltyPrograms: LoyaltyProgramEntry[];
  paymentMethods: PaymentMethodEntry[];
  advisorNotes: string;
  consent: ConsentAndSystemFields;
}
