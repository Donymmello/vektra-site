# Docker: testar localmente e (mais tarde) publicar na VPS

Ainda não há domínio nem VPS comprados — por agora isto corre só na sua
máquina, em `http://localhost`. Há dois ficheiros compose:

- **`docker-compose.local.yml`** — o que usa **agora**. Só o container do
  site, em HTTP simples, numa porta local. Sem domínio, sem HTTPS, sem rede
  partilhada.
- **`docker-compose.yml`** — para quando tiver domínio + VPS (secção
  "Publicar na VPS" mais abaixo). Inclui o Caddy com HTTPS automático.

## Testar localmente (agora)

```bash
docker compose -f docker-compose.local.yml up --build
```

Abra **http://localhost:8080**. `Ctrl+C` para parar. Isto usa o mesmo
`Dockerfile` que vai correr na VPS mais tarde — é a forma de confirmar que o
build e o Nginx funcionam antes de haver domínio.

(Nota: para o dia a dia de desenvolvimento — com hot-reload — continue a
usar `npm run dev`, como no `README.md`. Este Docker local serve para
validar o *build de produção*, não para editar o código.)

---

## Publicar na VPS (mais tarde)

Quando tiver domínio + VPS, este projeto corre em dois containers:

- **`site`** — build de produção do Vite, servido por Nginx (sem porta pública).
- **`caddy`** — proxy de borda com HTTPS automático (Let's Encrypt), que
  encaminha `vektratechnologies.com` para o container `site`.

Isto foi pensado para uma VPS que também vai correr **outros serviços**: o
Caddy fica como o único processo a ocupar as portas 80/443, e outros stacks
`docker compose` podem juntar-se à mesma rede `web` mais tarde para serem
adicionados ao mesmo Caddy (ver secção "Adicionar outro serviço" abaixo).

## Pré-requisitos na VPS

- Docker + Docker Compose plugin instalados.
- DNS: um registo A de `vektratechnologies.com` (e `www`) a apontar para o IP da VPS.
- Portas 80 e 443 livres (nenhum outro processo/proxy já a usá-las).

## Primeira vez

```bash
# 1. Rede partilhada (só uma vez, mesmo com múltiplos serviços/stacks)
docker network create web

# 2. Configurar domínio/email
cp .env.example .env
# editar .env se necessário (DOMAIN, ACME_EMAIL)

# 3. Build + arrancar
docker compose up -d --build

# 4. Ver logs (confirmar que o Caddy emitiu o certificado)
docker compose logs -f caddy
```

O site fica acessível em `https://vektratechnologies.com` assim que o DNS
propagar e o Caddy obtiver o certificado (normalmente segundos a poucos
minutos).

## Atualizar depois de alterações no código

```bash
git pull   # ou rsync dos ficheiros atualizados
docker compose up -d --build site
```

O `caddy` não precisa de ser reconstruído a não ser que o `Caddyfile` mude —
nesse caso: `docker compose restart caddy`.

## Adicionar outro serviço mais tarde

Noutra pasta/stack `docker-compose.yml`, junte o serviço à mesma rede `web`
(sem publicar portas) e adicione um bloco no `Caddyfile` deste projeto a
apontar para ele:

```yaml
# no docker-compose.yml do outro serviço
networks:
  web:
    external: true
services:
  outro-servico:
    # ...
    networks: [web]
```

```caddyfile
# adicionar ao Caddyfile
outro-dominio.com {
    reverse_proxy outro-servico:PORTA
}
```

Depois: `docker compose restart caddy` (aqui, no projeto do site).

## Nota sobre este ambiente de build

O build da imagem Docker foi validado aqui (Dockerfile e `docker-compose.yml`
com sintaxe e configuração corretas — `docker compose config` resolve sem
erros), mas este sandbox não tem acesso ao Docker Hub para descarregar as
imagens base (`node`, `nginx`, `caddy`), por isso o `docker build` completo
só pôde ser testado na estrutura, não executado até ao fim. Vale a pena
correr `docker compose up -d --build` uma primeira vez na VPS e confirmar
que tudo sobe como esperado.
