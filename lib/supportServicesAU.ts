export type AUState = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT";

export type SupportService = {
  id: string;
  name: string;
  audience: "Anyone" | "Youth" | "Clinicians" | "Families";
  category: "Alcohol & Drugs" | "Gambling" | "Gaming" | "Crisis" | "Poisoning";
  phone?: string;
  websiteLabel?: string;
  websiteUrl?: string;
  states: AUState[] | "National";
  notes?: string;
};

export const SUPPORT_SERVICES_AU: SupportService[] = [
  {
    id: "adis",
    name: "Alcohol & Drug Information Service (ADIS)",
    audience: "Anyone",
    category: "Alcohol & Drugs",
    phone: "1800 250 015",
    states: "National",
    notes: "24/7 confidential info, support, counselling and referrals.",
  },
  {
    id: "lifeline",
    name: "Lifeline",
    audience: "Anyone",
    category: "Crisis",
    phone: "13 11 14",
    states: "National",
    notes: "24/7 crisis support.",
  },
  {
    id: "poisons",
    name: "Poisons Information Centre",
    audience: "Anyone",
    category: "Poisoning",
    phone: "13 11 26",
    states: "National",
    notes: "Call for poisoning/toxicity advice.",
  },
  {
    id: "nsw_yourroom",
    name: "Your Room (NSW Health)",
    audience: "Anyone",
    category: "Alcohol & Drugs",
    phone: "1800 250 015",
    states: ["NSW"],
    notes: "NSW info + support directory.",
  },
  {
    id: "vic_directline",
    name: "DirectLine (Turning Point)",
    audience: "Anyone",
    category: "Alcohol & Drugs",
    phone: "1800 888 236",
    states: ["VIC"],
  },
  {
    id: "qld_alcoholdrugs",
    name: "Queensland Alcohol and Drug Information Service",
    audience: "Anyone",
    category: "Alcohol & Drugs",
    phone: "1800 177 833",
    states: ["QLD"],
  },
  {
    id: "gambling_help_online",
    name: "Gambling Help Online / National Gambling Helpline",
    audience: "Anyone",
    category: "Gambling",
    phone: "1800 858 858",
    states: "National",
    notes: "24/7 support + chat/SMS options.",
  },
  {
    id: "headspace",
    name: "Headspace",
    audience: "Youth",
    category: "Gaming",
    states: "National",
    notes: "Support for 12–25 (incl. gaming concerns); online and in-person.",
  },
];
