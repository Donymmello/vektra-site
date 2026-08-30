import {
  GlobeIcon,
  CodeIcon,
  // CloudIcon, ShieldIcon — não usados enquanto Cloud & Infraestrutura e
  // Cibersegurança & Redes estiverem ocultados (ver abaixo).
  ServerIcon,
} from "../components/icons"
import type { ComponentType, SVGProps } from "react"

export type Service = {
  id: string
  title: string
  /** Small uppercase tag shown above the title (e.g. "Pacote completo"). */
  badge?: string
  description: string
  bullets: string[]
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /** Bento span — some cards read as feature cells, others as compact ones. */
  span: "lg" | "md"
}

export const services: Service[] = [
  {
    id: "software",
    title: "Desenvolvimento Web",
    description:
      "Criamos sistemas robustos e escaláveis, de aplicações web a integrações via API, focados em fazer crescer o seu negócio.",
    bullets: ["Websites & Apps", "Integrações via API", "Plataformas SaaS"],
    icon: CodeIcon,
    span: "md",
  },

  // ponytail: ocultado a pedido do cliente (2026-08-28) — reativar quando a
  // oferta de Cloud & Infraestrutura estiver pronta para ser vendida.
  // {
  //   id: "cloud",
  //   title: "Cloud & Infraestrutura",
  //   description:
  //     "Implementamos e gerimos infraestrutura cloud fiável, segura e sempre disponível.",
  //   bullets: ["AWS & Azure", "Docker", "Servidores geridos"],
  //   icon: CloudIcon,
  //   span: "md",
  // },

  // ponytail: ocultado a pedido do cliente (2026-08-28) — reativar quando a
  // oferta de Cibersegurança & Redes estiver pronta para ser vendida.
  // {
  //   id: "security",
  //   title: "Cibersegurança & Redes",
  //   description:
  //     "Protegemos a sua rede com firewalls, monitorização contínua e resposta a incidentes.",
  //   bullets: ["Firewalls", "Monitorização", "Redes empresariais"],
  //   icon: ShieldIcon,
  //   span: "md",
  // },

  {
    id: "hosting",
    title: "Domínios & Hosting",
    badge: "Pacote completo",
    description:
      "O seu negócio online em poucos dias, com domínio, alojamento e email profissional num único pacote, sem complicações técnicas.",
    bullets: [
      "Domínio incluído (.co.mz ou internacional)",
      "Alojamento seguro e rápido",
      "Email profissional (@suaempresa.co.mz)",
    ],
    icon: GlobeIcon,
    span: "md",
  },
  {
    id: "hardware",
    title: "Aquisição de Material Informático",
    description:
      "Computadores, servidores e equipamento de rede com garantia e suporte técnico.",
    bullets: ["Computadores & portáteis", "Redes & periféricos", "Suporte técnico", "Licenças"],
    icon: ServerIcon,
    span: "md",
  },
]
