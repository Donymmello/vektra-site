import { CreditCardIcon, PosIcon, ArchiveIcon } from "../components/icons"
import type { ComponentType, SVGProps } from "react"

export type Product = {
  id: string
  name: string
  /** Shown for products with their own distinct brand (e.g. Kuava POS). */
  brandNote?: string
  category: string
  description: string
  bullets: string[]
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /**
   * Live subdomain for this product (e.g. https://kuava.vektramz.com).
   * Only set once the product has actually launched; omit it and the card
   * renders as a plain, non-clickable panel until the link is added.
   */
  url?: string
}

export const products: Product[] = [
  {
    id: "sgc-vektra",
    name: "SGC-Vektra",
    category: "Gestão de Crédito",
    description:
      "Gestão de todo o ciclo de crédito, da proposta à cobrança, com controlo de risco integrado.",
    bullets: ["Propostas & aprovações", "Amortizações e cobranças", "Relatórios de risco"],
    icon: CreditCardIcon,
  },
  {
    id: "kuava-pos",
    name: "Kuava POS",
    brandNote: "Por Vektra Technologies",
    category: "Ponto de Venda",
    description:
      "Sistema de ponto de venda rápido e fiável para retalho e restauração, com stock em tempo real.",
    bullets: ["Vendas & faturação", "Gestão de stock", "Relatórios em tempo real"],
    icon: PosIcon,
    url: "https://kuava.vektramz.com",
  },
  {
    id: "sgp-vektra",
    name: "SGP-Vektra",
    category: "Gestão de Património",
    description:
      "Controlo completo dos bens da sua organização: inventário, localização, manutenção e depreciação.",
    bullets: ["Inventário de bens", "Manutenção & depreciação", "Auditoria e localização"],
    icon: ArchiveIcon,
  },
]
