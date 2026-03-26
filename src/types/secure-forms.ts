/**
 * Secure Client Intake & Inquiry — types and constants.
 * Positioning: "Private Travel Profile", "Secure Travel Details", "Travel Design Intake".
 */

export type FormKind = "inquiry" | "profile";

export interface SecureLinkConfig {
  id: string;
  kind: FormKind;
  token: string;
  createdAt: string;
  expiresAt: string | null;
  allowEditsAfterSubmit: boolean;
  clientId?: string | null;
}

/** Advisor-facing branding and customization (per advisor) */
export interface AdvisorFormBranding {
  businessName: string;
  logoUrl: string | null;
  introHeadline: string;
  introSubtext: string;
  /** Custom compliance footer (licensing, service area, planning fee, terms link) — US/AU/UK/CA */
  footerHtml: string | null;
  /** Planning fee disclosure */
  planningFeeDisclosure: string | null;
  /** Service area limitations */
  serviceAreaLimitation: string | null;
}

/**
 * Customization layer: advisors can edit budget ranges, toggle sections on/off,
 * add custom questions, set logo, intro message, planning fee disclosure,
 * and service area limitations via Settings → Secure Forms (or equivalent).
 */
export interface FormCustomization {
  branding: AdvisorFormBranding;
  budgetRanges: BudgetRangeOption[];
  /** Section keys to hide (e.g. "referralSource", "specialDates") */
  disabledSections: string[];
  /** Custom questions appended to inquiry or profile */
  customQuestions: { id: string; label: string; type: "text" | "textarea" | "select"; options?: string[] }[];
  /** Require advisor review before final save (profile form) */
  requireReviewBeforeSave: boolean;
}

/** Budget ranges for Inquiry form — advisor editable */
export interface BudgetRangeOption {
  label: string;
  min?: number;
  max?: number;
}

export const DEFAULT_BUDGET_RANGES: BudgetRangeOption[] = [
  { label: "Under $3,000 per person" },
  { label: "$3,000 – $5,000 per person" },
  { label: "$5,000 – $10,000 per person" },
  { label: "$10,000 – $25,000 per person" },
  { label: "$25,000+" },
];

/** Inquiry form payload (pre-consultation) */
export interface InquiryFormData {
  planningStage: string;
  destination: string;
  numberOfTravelers: number;
  desiredDates?: string;
  investmentRange: string;
  journeyType: string;
  servicesRequested: string[];
  whatMattersMost: string;
  additionalConsiderations: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryState: string;
  referralSource?: string;
  newsletterOptIn: boolean;
}

/** Honorific for client-facing display (optional; empty = not specified). */
export type TravelerTitle =
  | ""
  | "Mr"
  | "Mrs"
  | "Miss"
  | "Ms"
  | "Dr"
  | "Prof"
  | "Other";

export const TRAVELER_TITLE_OPTIONS: { value: TravelerTitle; label: string }[] = [
  { value: "", label: "Select title" },
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
  { value: "Miss", label: "Miss" },
  { value: "Ms", label: "Ms" },
  { value: "Dr", label: "Dr" },
  { value: "Prof", label: "Prof" },
  { value: "Other", label: "Other" },
];

/** Required gender selection for bookings / logistics (empty value = placeholder). */
export const TRAVELER_GENDER_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Select gender" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Non-binary", label: "Non-binary" },
];

export function isTravelerGenderSelected(gender: string): boolean {
  return gender === "Male" || gender === "Female" || gender === "Non-binary";
}

/** Client Profile form — step data */
export interface TravelerDetailsStep {
  /** Optional salutation — first field in intake; use "" for placeholder state */
  title: TravelerTitle;
  /** When title is "Other", optional free-text honorific */
  titleOther: string;
  legalFirstName: string;
  middleName: string;
  legalLastName: string;
  /** Optional — nickname or preferred form of address for personalised communication. */
  preferredName: string;
  /** Must be true to continue — confirms legal name matches the traveler’s passport. */
  passportNameConfirmed: boolean;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth: string;
  gender: string;
}

export interface PassportStep {
  hasPassport: boolean;
  passportNumber: string;
  issuingCountry: string;
  issueDate: string;
  expiryDate: string;
  passportType: string;
  knownTravelerNumber: string;
}

export interface EmergencyContactStep {
  name: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface TravelPreferencesStep {
  generalStyle: string;
  airPreferences: string;
  accommodationPreferences: string;
  cruisePreferences: string;
  seatPreference: string;
  roomPreference: string;
  transferPreference: string;
  specialRequests: string;
  /** Dining / cuisine preferences (client form with chips) */
  diningPreferences: string;
  /** Combined travel preferences e.g. class, seat, transfers (client form with chips) */
  travelPreferences: string;
  /** Special interests e.g. wine, culture, wellness (client form with chips) */
  specialInterests: string;
}

export interface HealthStep {
  mobilityAssistance: boolean;
  dietaryRestrictions: boolean;
  medicalNotes: string;
}

export interface SpecialDatesStep {
  birthday: string;
  anniversary: string;
  otherMeaningfulDates: string;
}

export type LoyaltyProgramType = "airline" | "hotel" | "cruise" | "other";

export interface LoyaltyProgramEntry {
  programType: LoyaltyProgramType;
  programName: string;
  membershipNumber: string;
  tier: string;
}

export interface AdditionalTravelerPassport {
  hasPassport: boolean;
  passportNumber: string;
  issuingCountry: string;
  expiryDate: string;
}

export interface AdditionalTraveler {
  relationship: "spouse" | "partner" | "child" | "parent" | "friend" | "other";
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  passport: AdditionalTravelerPassport;
  /** Optional full details for mapping to manual profile */
  details?: Partial<TravelerDetailsStep>;
}

export interface FinalConsentStep {
  finalNotes: string;
  consentVerified: boolean;
  newsletterOptIn: boolean;
}

export interface ClientProfileFormData {
  traveler: TravelerDetailsStep;
  passport: PassportStep;
  emergencyContact: EmergencyContactStep;
  preferences: TravelPreferencesStep;
  health: HealthStep;
  specialDates: SpecialDatesStep;
  loyaltyPrograms: LoyaltyProgramEntry[];
  additionalTravelers: AdditionalTraveler[];
  consent: FinalConsentStep;
}

/** Backend: map submitted data to client profile areas */
export type ClientProfileMapping =
  | "clientDetails"
  | "travelPreferences"
  | "loyalty"
  | "keyDates"
  | "documents";

export interface FormSubmissionResult {
  success: boolean;
  clientId?: string;
  isNewClient: boolean;
  /** If advisor has "review before final save" enabled */
  requiresReview?: boolean;
}
