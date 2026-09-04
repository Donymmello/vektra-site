# Vektra Technologies MZ: Website

Landing page em React (Vite + TypeScript + Tailwind CSS v4) para a Vektra
Technologies MZ, com hero 3D imersivo (Three.js / React Three Fiber), secção
de serviços em bento grid e visual neobrutalista (bordas grossas, sombras
duras) sobre a paleta de marca (azul marinho, ciano, verde-lima).

## Stack

**Frontend**
- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens de marca em `src/index.css`, via `@theme`)
- **three.js** + **@react-three/fiber** para a cena 3D do hero (carregada via
  `React.lazy` para não pesar no bundle inicial)

**Backend** (pasta `server/`, projeto Node à parte)
- **Express** + **TypeScript**, trata o formulário de contacto: valida,
  guarda o pedido numa base de dados **SQLite** e envia o email por SMTP.
- Sem base de dados/servidor externos a gerir: o ficheiro `.db` fica num
  volume Docker, e o servidor é um único processo Node.

## Começar

Frontend:

```bash
npm install
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em dist/
npm run preview   # pré-visualizar o build de produção
```

Backend (noutro terminal, para o formulário de contacto funcionar em dev):

```bash
cd server
cp .env.example .env   # opcional: sem isto, simula o envio de email
npm install
npm run dev             # http://localhost:3001, reinicia sozinho ao editar
```

Ou os dois de uma vez, dentro de Docker: `docker compose -f docker-compose.dev.yml up`
(ver secção "Docker" abaixo).

## Estrutura

```
src/
  components/   Navbar, Hero, HeroScene (3D), Services, Products, Mission,
                Sectors, Contact, ValueProps, Footer, Logo, icons
  data/         services.ts, products.ts: conteúdo editável (textos, bullets)
  hooks/        usePrefersReducedMotion.ts
  index.css     tokens de marca (cores, sombras, fontes) e utilitários neobrutalistas

server/
  src/
    index.ts        arranque do Express, CORS, rotas
    db.ts            SQLite: tabela contact_submissions
    mailer.ts        envio do email via SMTP (nodemailer)
    rateLimit.ts     limite simples de pedidos por IP
    routes/contact.ts  validação + honeypot anti-spam
```

## Antes de publicar

- [x] Domínio confirmado (`vektramz.com`), já propagado no `index.html`
      (og:url, canonical), `docker-compose.yml` e `Caddyfile`.
- [x] Logo/ícone final aplicado em `src/components/Logo.tsx`.
- [x] DNS apontado (registo A de `vektramz.com` e `www`) para o IP da VPS,
      site já no ar.
- [x] SEO organizado: favicon/apple-touch-icon com o logo real, `robots.txt`,
      `sitemap.xml`, `site.webmanifest`, dados estruturados (JSON-LD) e
      `og-image.png` atualizada: tudo em `public/` e `index.html`.
- [ ] Configurar `server/.env` com o SMTP real (ver `server/.env.example`):
      sem isto o formulário guarda o pedido mas não envia o email (lança-se
      normalmente assim, dá para ligar depois).
- [x] Google Analytics e banner de cookies prontos no código (ver secção
      "Google Analytics" abaixo). Falta só preencher `VITE_GA_MEASUREMENT_ID`
      no `.env` e reconstruir o `site` para ativar.
- [ ] Google Search Console (vale a pena registar, agora que há `sitemap.xml`).

## Google Analytics

O código já está todo pronto (`src/lib/consent.ts`, `src/hooks/useCookieConsent.ts`,
`src/components/CookieConsent.tsx`), só falta o Measurement ID:

1. Criar/abrir a propriedade GA4 em [analytics.google.com](https://analytics.google.com),
   copiar o Measurement ID (formato `G-XXXXXXXXXX`) em Admin → Fluxos de dados
   → o teu fluxo web.
2. Colar em `.env` (raiz do projeto, copiado de `.env.example`):
   `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`.
3. Reconstruir o site: `docker compose up -d --build site`.

Sem o ID preenchido, o banner de cookies aparece normalmente mas o Analytics
nunca carrega, não há nenhum pedido de rede a mais nem cookies a serem postos.
O script do GA só é injetado depois de o visitante clicar em "Aceitar" no
banner (ou se já tinha aceitado numa visita anterior); "Recusar" nunca o
carrega. A escolha fica guardada no browser do visitante, e pode ser mudada
a qualquer momento no link "Preferências de cookies" no rodapé do site.

## Docker

Há dois modos, para dois objetivos diferentes:

**Desenvolvimento (hot reload, sem build manual)**: para o dia a dia, quando
estás a editar código e queres ver o resultado logo no browser:

```bash
docker compose -f docker-compose.dev.yml up
# abrir http://localhost:5173
```

Isto sobe o site **e** a API (o formulário de contacto já funciona). Cada
alteração a um ficheiro em `src/` ou `server/src/` atualiza sozinha: o
frontend no browser, a API reiniciando-se: tal como `npm run dev` normal,
mas sem precisares de ter o Node instalado na máquina. Não precisa (nem deve)
de `--build`: são os mesmos containers sempre, só o código dentro do volume é
que muda.

**Teste do build de produção**: para validar o mesmo `Dockerfile`/build que
mais tarde corre na VPS, antes de publicar:

```bash
docker compose -f docker-compose.local.yml up --build
# abrir http://localhost:8080
```

Este modo compila o site para ficheiros estáticos e serve-os via Nginx: por
isso, ao contrário do modo de desenvolvimento, cada alteração exige mesmo
`--build` de novo (é serve o resultado final, não código a correr ao vivo).

O `docker-compose.yml` (com Caddy + HTTPS automático) fica pronto para quando
houver domínio + VPS: ver `DEPLOY.md` para o guia completo.

## Performance

- A cena 3D (`HeroScene.tsx`) está isolada num chunk separado (via `lazy()`),
  para que o bundle inicial não dependa de `three.js`.
- A animação respeita `prefers-reduced-motion` (a rede 3D fica estática e o
  scroll suave desliga-se).
