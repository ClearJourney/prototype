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

/** Client Profile form — step data */
export interface TravelerDetailsStep {
  legalFirstName: string;
  middleName: string;
  legalLastName: string;
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
}

export interface HealthStep {
  mobilityAssistance: boolean;
  dietaryRestrictions: boolean;
  medicalNotes: string;
}

export interface SpecialDatesStep {
  anniversary: string;
  otherMeaningfulDates: string;
}

export interface AdditionalTraveler {
  relationship: "spouse" | "partner" | "child";
  name: string;
  details: Partial<TravelerDetailsStep>;
  passport: Partial<PassportStep>;
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
