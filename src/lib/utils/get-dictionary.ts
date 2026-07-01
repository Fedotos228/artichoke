import type { Locale } from "@/i18n-config"
import "server-only"

export type WorkTypeOptionType = {
  value: string
  label: string
}

export interface IDictionary {
  hero: {
    submit: string
  }
  contactForm: {
    title: string
    name: string
    phone: string
    type: string
    message: string
    submit: string
    workType: WorkTypeOptionType[]
  }
  header: {
    philosophy: string
    ourServices: string
    projects: string
  }
  projects: {
    title: string
    seeProject: string,
    back: string,
    about: string,
    metaFallbackDescription: string
  }
  reqCall: string,
}

const dictionaries: Record<Locale, () => Promise<IDictionary>> = {
  en: () => import("../../../dictionaries/en.json").then((module) => module.default),
  ro: () => import("../../../dictionaries/ro.json").then((module) => module.default),
  ru: () => import("../../../dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<IDictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();
