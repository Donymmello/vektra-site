# Docker: testar localmente e publicar na VPS

Domínio e VPS já estão prontos: `vektramz.com`, servidor Debian 13. Há três
ficheiros compose, cada um para um objetivo diferente:

- **`docker-compose.dev.yml`**: para o dia a dia de desenvolvimento
  (hot-reload, site + api). Ver `README.md`.
- **`docker-compose.local.yml`**: para validar o **build de produção**
  localmente antes de publicar. Site + api em HTTP simples, em portas
  locais. Sem domínio, sem HTTPS, sem rede partilhada.
- **`docker-compose.yml`**: o que corre na VPS (secção "Publicar na VPS"
  abaixo). Inclui o Caddy com HTTPS automático.

## Testar localmente (antes de publicar)

```bash
cp server/.env.example server/.env   # opcional: sem isto, o formulário
                                       # de contacto só regista o pedido e
                                       # simula o envio, sem SMTP real
docker compose -f docker-compose.local.yml up --build
```

Abra **http://localhost:8080**. `Ctrl+C` para parar. Isto usa o mesmo
`Dockerfile` (site e api) que vai correr na VPS: é a forma de confirmar que
o build, o Nginx e a API funcionam antes de tocar no servidor real.

(Nota: para o dia a dia de desenvolvimento: com hot-reload: use
`docker compose -f docker-compose.dev.yml up` ou `npm run dev`, como no
`README.md`. Este Docker local serve para validar o *build de produção*,
não para editar o código.)

---

## Publicar na VPS

O projeto corre em três containers:

- **`site`**: build de produção do Vite, servido por Nginx (sem porta pública).
  O Nginx também encaminha `/api/*` para o container `api` (ver `nginx.conf`).
- **`api`**: o pequeno servidor Node que trata o formulário de contacto
  (envia o email e guarda cada pedido numa base de dados SQLite, num volume
  persistente). Nunca fica exposto diretamente: só o `site` fala com ele.
- **`caddy`**: proxy de borda com HTTPS automático (Let's Encrypt), que
  encaminha `vektramz.com` para o container `site`.

Isto foi pensado para uma VPS que também vai correr **outros serviços**: o
Caddy fica como o único processo a ocupar as portas 80/443, e outros stacks
`docker compose` podem juntar-se à mesma rede `web` mais tarde para serem
adicionados ao mesmo Caddy (ver secção "Adicionar outro serviço" abaixo).

## 1. DNS

No painel do registador do domínio, aponte para o IP da VPS:

| Tipo | Nome | Valor           |
|------|------|-----------------|
| A    | @    | `<IP da VPS>`   |
| A    | www  | `<IP da VPS>`   |

A propagação costuma levar minutos, mas pode demorar até 24h dependendo do
registador. Pode confirmar com `dig vektramz.com +short` de qualquer
máquina: quando devolver o IP da VPS, está propagado.

## 2. Preparar a VPS (Debian 13)

Ligue por SSH (`ssh root@<IP da VPS>`, ou o utilizador que tiver) e instale
o Docker pelo repositório oficial (o `apt` do Debian já traz um `docker.io`
mais antigo: este é o caminho recomendado pela própria Docker):

```bash
# Dependências e chave do repositório
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Repositório (deteta a versão do Debian automaticamente)
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker + Compose plugin
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Confirmar
docker compose version
```

Firewall (se usar `ufw`): abra apenas o necessário antes de o ativar, para
não se trancar de fora por SSH:

```bash
sudo apt install -y ufw
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 3. Clonar o repositório na VPS

O projeto já está num repositório Git privado (GitHub/GitLab/Bitbucket).
Como é privado, a VPS precisa de uma **deploy key**: uma chave SSH que só
serve para dar acesso de leitura a este repositório, sem usar a sua conta
pessoal:

```bash
# 1. Gerar uma chave dedicada ao deploy (sem passphrase, para uso
#    automático; fica só nesta VPS)
ssh-keygen -t ed25519 -C "vektra-vps-deploy" -f ~/.ssh/vektra_deploy_key -N ""

# 2. Mostrar a chave pública para copiar
cat ~/.ssh/vektra_deploy_key.pub
```

No GitHub: **Settings do repositório → Deploy keys → Add deploy key** →
cole a chave pública. Não precisa de marcar "Allow write access" (só
leitura, que é tudo o que a VPS precisa). GitLab/Bitbucket têm o
equivalente em "Deploy keys" nas definições do repositório.

Depois, diga ao SSH da VPS para usar esta chave quando falar com o GitHub:

```bash
cat >> ~/.ssh/config <<'EOF'
Host github.com
  IdentityFile ~/.ssh/vektra_deploy_key
  IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config
```

Agora sim, clone o repositório (troque pelo URL SSH real, algo como
`git@github.com:<utilizador>/<repo>.git`: está no botão "Code → SSH" da
página do repositório):

```bash
sudo mkdir -p /opt/vektra-site
sudo chown $USER:$USER /opt/vektra-site
git clone git@github.com:<utilizador>/<repo>.git /opt/vektra-site
cd /opt/vektra-site
```

## 4. Primeiro arranque

Já dentro da VPS, na pasta do projeto:

```bash
cd /opt/vektra-site

# 1. Rede partilhada (só uma vez, mesmo com múltiplos serviços/stacks)
docker network create web

# 2. Confirmar domínio/email: os valores por omissão já são os certos
#    (vektramz.com), mas vale a pena copiar e confirmar:
cp .env.example .env
# ACME_EMAIL é o contacto que a Let's Encrypt usa para avisos do
# certificado: pode deixar admin@vektramz.com ou trocar pelo seu.

# 3. Build + arrancar
docker compose up -d --build

# 4. Ver logs (confirmar que o Caddy emitiu o certificado)
docker compose logs -f caddy
```

O site fica acessível em `https://vektramz.com` assim que o DNS propagar e
o Caddy obtiver o certificado (normalmente segundos a poucos minutos depois
do DNS já apontar certo).

**Sobre o email do formulário de contacto:** ainda não há SMTP configurado,
e não é preciso para lançar. Sem `server/.env`, cada pedido de orçamento
fica guardado na base de dados (dá para consultar depois), só não é
enviado por email. Quando tiver um serviço de email pronto (Gmail com
password de app, Resend, Mailgun, ou o email profissional
`@vektramz.com`), basta:

```bash
cp server/.env.example server/.env
nano server/.env   # preencher SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
docker compose up -d api   # reinicia só a api, sem afetar o site
```

## Atualizar depois de alterações no código

```bash
cd /opt/vektra-site
git pull
docker compose up -d --build site
```

O `caddy` não precisa de ser reconstruído a não ser que o `Caddyfile` mude:
nesse caso, `docker compose restart caddy`.

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
com sintaxe e configuração corretas: `docker compose config` resolve sem
erros), mas este sandbox não tem acesso ao Docker Hub para descarregar as
imagens base (`node`, `nginx`, `caddy`), por isso o `docker build` completo
só pôde ser testado na estrutura, não executado até ao fim. Vale a pena
correr `docker compose up -d --build` na VPS e confirmar que tudo sobe como
esperado: se algo falhar, `docker compose logs` mostra o motivo.
