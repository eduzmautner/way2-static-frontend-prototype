import { useState, type ReactNode } from 'react';
import {
  Avatar, BackButton, Badge, Button, Checkbox, Divider, Field, FollowPlus,
  Icon, IconButton, Input, Logo, Radio, Rating, SearchInput, Select,
  SparkleLoader, StatusPill, Tag, Textarea, Toast
} from '../index';
import { strokeGlyphs, type IconName } from '../icons/glyphs';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-subsection text-primary">{title}</h2>
      <div className="rounded-surface bg-surface-subtle p-6">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      {label && <p className="mb-2 text-meta text-secondary">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function Gallery() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(true);
  const [tags, setTags] = useState<string[]>(['Festas']);
  const [checkA, setCheckA] = useState(true);
  const [checkB, setCheckB] = useState(false);
  const [pay, setPay] = useState<'pix' | 'card'>('card');
  const [stars, setStars] = useState(3);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  }

  const toggleTag = (t: string) =>
    setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <div className="mx-auto max-w-[880px] px-6 py-12">
      <header className="mb-12 flex items-center gap-6">
        <Logo width={70} />
        <div className="flex-1">
          <h1 className="text-section text-primary">Building blocks</h1>
          <p className="text-body text-secondary">
            @way2/ui — fase 2. Átomos apenas; composições ficam no app.
          </p>
        </div>
        <Button variant="secondary" onClick={toggleTheme}>
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={16} />
          {theme === 'light' ? 'Dark' : 'Light'}
        </Button>
      </header>

      <div className="flex flex-col gap-10">
        <Section title="Button">
          <Row label="Variantes">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="quiet">seguindo</Button>
            <Button disabled>Disabled</Button>
          </Row>
          <Row label="Tamanhos — o raio não muda com a altura">
            <Button size="sm">Permitir</Button>
            <Button size="md">Cadastrar</Button>
            <Button size="lg">Comprar — R$79,90</Button>
          </Row>
          <Row label="Com ícone / link / bloco">
            <Button variant="secondary">Filtros <Icon name="filters" size={16} /> <Badge count={3} /></Button>
            <Button href="#evento">ver mais</Button>
            <div className="w-full max-w-[320px]"><Button block size="lg">Criar evento</Button></div>
          </Row>
        </Section>

        <Section title="BackButton · IconButton · FollowPlus">
          <Row>
            <BackButton onClick={() => history.back()} />
            <IconButton name="heart" label="Curtir" active={liked} onClick={() => setLiked(!liked)} />
            <IconButton name="comment" label="Comentar" />
            <IconButton name="send" label="Compartilhar" />
            <IconButton name="bookmark" label="Salvar" active={saved} onClick={() => setSaved(!saved)} />
            <IconButton name="x" label="Fechar" />
            <FollowPlus handle="cj_parties" following={following} onClick={() => setFollowing(!following)} />
            <span className="text-meta text-secondary">← clique para alternar</span>
          </Row>
        </Section>

        <Section title="Tag · StatusPill · Badge">
          <Row label="Tags — selecionáveis e removíveis">
            {['Festas', 'Arte', 'Esporte'].map((t) => (
              <Tag key={t} label={t} selectable selected={tags.includes(t)} onClick={() => toggleTag(t)} />
            ))}
            <Tag label="Networking" onRemove={() => undefined} />
            <Tag label="Estática" />
          </Row>
          <Row label="Status (Gerenciador)">
            <StatusPill tone="upcoming">Em breve</StatusPill>
            <StatusPill tone="draft">Rascunho</StatusPill>
            <StatusPill tone="past">Encerrado</StatusPill>
          </Row>
          <Row label="Badge">
            <Badge count={3} />
            <Badge count={12} />
            <Badge />
            <span className="text-meta text-secondary">← dot de não-lido</span>
          </Row>
        </Section>

        <Section title="Form controls">
          <div className="grid max-w-[520px] gap-5">
            <Field label="Nome do usuário" htmlFor="g-user">
              <Input id="g-user" placeholder="fulano_silva" />
            </Field>
            <Field label="Estado" htmlFor="g-uf" hint="Seleção nativa com chevron do sistema">
              <Select id="g-uf" defaultValue="SP">
                <option>SP</option><option>RJ</option><option>MG</option><option>PR</option>
              </Select>
            </Field>
            <Field label="Bio" htmlFor="g-bio">
              <Textarea id="g-bio" placeholder="escreva algo..." maxLength={100} counter />
            </Field>
            <SearchInput placeholder="Descobrir eventos, pessoas, e organizadores" />
            <SearchInput placeholder="Buscar evento" square />
            <div className="flex flex-col gap-3">
              <Checkbox
                checked={checkA}
                onChange={setCheckA}
                label={<>Eu li e concordo com os <u>Termos de Serviço</u>.</>}
              />
              <Checkbox checked={checkB} onChange={setCheckB} tone="default" label="Em breve" trailing="5" />
              <div className="flex gap-6">
                <Radio checked={pay === 'pix'} onChange={() => setPay('pix')} label="Pagar com PIX" />
                <Radio checked={pay === 'card'} onChange={() => setPay('card')} label="Pagar com cartão" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Avatar">
          <Row label="Tamanhos">
            <Avatar name="Eduardo Mautner" size="xs" />
            <Avatar name="Eduardo Mautner" size="sm" />
            <Avatar name="Eduardo Mautner" size="md" />
            <Avatar name="Eduardo Mautner" size="lg" />
            <Avatar name="Eduardo Mautner" size="xl" />
          </Row>
          <Row label="Com gradiente placeholder (art)">
            <Avatar name="cj_parties" art="party" size="lg" />
            <Avatar name="masp_sp" art="masp" size="lg" />
            <Avatar name="Matheus Braga" art="portrait" size="lg" />
            <Avatar name="ralle" art="river" size="lg" />
          </Row>
        </Section>

        <Section title="Rating">
          <Row label="Exibição — só as sparkles conquistadas, como no feed">
            <Rating value={3} />
          </Row>
          <Row label="Entrada — trilha completa, clique para avaliar">
            <Rating value={stars} onChange={setStars} />
            <span className="text-meta text-secondary">{stars}/5</span>
          </Row>
        </Section>

        <Section title="Loader · Toast · Divider">
          <Row><SparkleLoader /></Row>
          <Row><Toast>Evento salvo</Toast></Row>
          <div className="py-2"><Divider /></div>
        </Section>

        <Section title="Icon — registro completo">
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
            {(Object.keys(strokeGlyphs) as IconName[]).map((name) => (
              <div key={name} className="flex flex-col items-center gap-2 rounded-control bg-surface p-3">
                <Icon name={name} size={22} className="text-icon-active" />
                <span className="text-micro text-secondary">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Tipografia — as 12 combinações permitidas">
          <div className="flex flex-col gap-3">
            <p className="text-hero">Hero 32 Bold</p>
            <p className="text-section">Section 24 Bold</p>
            <p className="text-subsection">Sub-section 20 Semi Bold</p>
            <p className="text-item">Item 16 Semi Bold</p>
            <p className="text-button">Button 14 Semi Bold</p>
            <p className="text-small-label">Small label 12 Semi Bold</p>
            <p className="text-body-lg">Body large 20 Regular</p>
            <p className="text-body">Body 14 Regular</p>
            <p className="text-meta">Meta 12 Regular</p>
            <p className="text-micro">Micro 10 Regular</p>
            <Divider />
            <p className="font-accent text-accent-hero">Welcome to W2</p>
            <p className="font-accent text-accent-tag uppercase">Development — tag accent</p>
          </div>
        </Section>
      </div>
    </div>
  );
}
