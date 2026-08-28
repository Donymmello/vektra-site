# Vektra Technologies MZ — Website

Landing page em React (Vite + TypeScript + Tailwind CSS v4) para a Vektra
Technologies MZ, com hero 3D imersivo (Three.js / React Three Fiber), secção
de serviços em bento grid e visual neobrutalista (bordas grossas, sombras
duras) sobre a paleta de marca (azul marinho, ciano, verde-lima).

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens de marca em `src/index.css`, via `@theme`)
- **three.js** + **@react-three/fiber** para a cena 3D do hero (carregada via
  `React.lazy` para não pesar no bundle inicial)

## Começar

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # pré-visualizar o build de produção
```

## Estrutura

```
src/
  components/   Navbar, Hero, HeroScene (3D), Services, ValueProps, Contact, Footer, Logo, icons
  data/         services.ts — conteúdo dos 5 serviços (editar aqui para atualizar textos)
  hooks/        usePrefersReducedMotion.ts
  index.css     tokens de marca (cores, sombras, fontes) e utilitários neobrutalistas
```

## Antes de publicar

- [ ] Substituir `CONTACT_EMAIL` em `src/components/Contact.tsx` pelo email real, ou
      ligar o formulário a um endpoint/serviço (ex: Formspree, uma API route).
- [ ] Confirmar o domínio `vektratechnologies.com` e atualizar links se necessário.
- [ ] Substituir o ícone/wordmark em `src/components/Logo.tsx` se o logótipo
      final (Canva) for diferente do mark atual.
- [ ] Adicionar analytics/SEO (meta tags adicionais, sitemap) conforme necessário.

## Docker (teste local, já sem precisar de domínio)

```bash
docker compose -f docker-compose.local.yml up --build
# abrir http://localhost:8080
```

Isto valida o mesmo `Dockerfile`/build que mais tarde corre na VPS. O
`docker-compose.yml` (com Caddy + HTTPS automático) fica pronto para quando
houver domínio + VPS — ver `DEPLOY.md` para o guia completo.

## Performance

- A cena 3D (`HeroScene.tsx`) está isolada num chunk separado (via `lazy()`),
  para que o bundle inicial não dependa de `three.js`.
- A animação respeita `prefers-reduced-motion` (a rede 3D fica estática e o
  scroll suave desliga-se).
