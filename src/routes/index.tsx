import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "KAORA — Dando vida al presente" },
      {
        name: "description",
        content:
          "KAORA es un estudio de gestión de proyectos y creación de contenido. Fuerza vital y tiempo, al servicio de ideas que impactan.",
      },
      { property: "og:title", content: "KAORA — Dando vida al presente" },
      {
        property: "og:description",
        content:
          "Estudio de gestión de proyectos y creación de contenido. Identidad que impacta, proyectos que se entregan.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const IMG_SERVICES_1 = "/images/services-1.jpg";
const IMG_SERVICES_2 = "/images/services-2.jpg";
const IMG_PHILOSOPHY = "/images/philosophy.jpg";
const IMG_WHY = "/images/why-kaora.jpg";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function ThemeToggle({ light, onToggle }: { light: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={light ? "Activar tema oscuro" : "Activar tema claro"}
      className="fixed top-5 right-5 md:top-7 md:right-7 z-50 w-11 h-11 md:w-12 md:h-12 border border-nude/60 text-nude bg-noche/40 backdrop-blur-sm flex items-center justify-center hover:bg-coral hover:text-noche hover:border-coral transition-colors duration-500"
    >
      {light ? (
        // Moon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        // Sun
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}

function Index() {
  const ref = useReveal();
  const [light, setLight] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (light) root.classList.add("light");
    else root.classList.remove("light");
    return () => root.classList.remove("light");
  }, [light]);
  return (
    <main ref={ref} className="bg-noche text-nude font-body overflow-x-hidden">
      <MarbleFilter />
      <ThemeToggle light={light} onToggle={() => setLight((v) => !v)} />
      <Hero />
      <Divider />
      <Philosophy />
      <Divider />
      <Services />
      <Marquee />
      <WhyKaora />
      <Divider />
      <Testimonials />
      <Divider />
      <Contact />
      <Footer />
    </main>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-purpura-azul" />;
}

function MarbleFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="marble-turbulence" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="turbulence" baseFrequency="0.015 0.025" numOctaves="4" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-noche flex flex-col justify-between overflow-hidden">
      <div className="flex justify-between items-start px-6 md:px-12 pt-8 md:pt-10">
        <span className="text-coral text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium">
          — Gestión de Proyectos
        </span>
        <span className="text-coral text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium text-right">
          Creación de Contenido —
        </span>
      </div>

      <div className="relative flex-1 flex items-center justify-center w-full">
        <h1
          className="marble-text-hero font-display font-black leading-[0.85] tracking-[-0.02em] select-none w-full text-center px-6 md:px-10"
          style={{ fontSize: "clamp(3rem, 18vw, 20rem)" }}
        >
          KAORA
        </h1>
        
      </div>

      <div className="px-6 md:px-12 pb-10 md:pb-14">
        <p className="font-display italic text-nude text-xl md:text-3xl text-center mb-10 md:mb-14">
          Dando vida al presente
        </p>
        <div className="flex justify-center">
          <a
            href="#contacto"
            className="border border-nude text-nude px-8 md:px-12 py-3 md:py-4 text-xs md:text-sm tracking-[0.35em] uppercase hover:bg-nude hover:text-noche transition-colors duration-500"
          >
            Conoce KAORA
          </a>
        </div>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-nude/50 uppercase">
        N°01 · MMXXVI
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="relative">
      {/* Full-bleed image with dark overlay */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        <img
          src={IMG_PHILOSOPHY}
          alt="Fundador en estudio nocturno"
          width={1920}
          height={1280}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(17,20,43,0.55)" }} />
        <div className="absolute inset-0 flex items-end px-6 md:px-16 pb-10 md:pb-16">
          <div className="text-coral text-[10px] tracking-[0.4em] uppercase reveal">
            — Capítulo I · Origen
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 min-h-[80vh] bg-purpura-azul">
        <div className="md:col-span-7 px-6 md:px-16 py-20 md:py-32 flex items-center reveal">
          <blockquote
            className="font-display font-light text-nude leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 5.2vw, 5.5rem)" }}
          >
            <span className="text-coral italic">KA</span>, la fuerza vital
            que da vida al contenido.{" "}
            <span className="text-coral italic">ORA</span>, el tiempo que lo
            hace posible.
          </blockquote>
        </div>

        <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-noche/40 px-6 md:px-10 py-14 md:py-32 flex flex-col justify-center gap-12 bg-noche/30">
          <div className="reveal">
            <div className="text-[10px] tracking-[0.4em] uppercase text-coral mb-3">
              Entrada 01
            </div>
            <div className="font-display text-3xl md:text-4xl text-nude mb-2">KA</div>
            <div className="text-[11px] tracking-[0.25em] uppercase text-nude/60 mb-3">
              / Egipcio /
            </div>
            <p className="text-sm text-nude/80 leading-relaxed">
              Fuerza vital. La energía espiritual que anima al ser y sostiene
              toda creación.
            </p>
          </div>
          <div className="reveal">
            <div className="text-[10px] tracking-[0.4em] uppercase text-coral mb-3">
              Entrada 02
            </div>
            <div className="font-display text-3xl md:text-4xl text-nude mb-2">ORA</div>
            <div className="text-[11px] tracking-[0.25em] uppercase text-nude/60 mb-3">
              / Latín /
            </div>
            <p className="text-sm text-nude/80 leading-relaxed">
              El tiempo. La hora presente, el instante que se entrega y no
              vuelve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  number,
  title,
  body,
  reverse,
  bg,
  image,
  imageAlt,
  imageW,
  imageH,
}: {
  number: string;
  title: string;
  body: string;
  reverse?: boolean;
  bg: string;
  image: string;
  imageAlt: string;
  imageW: number;
  imageH: number;
}) {
  const text = (
    <div className="px-6 md:px-16 py-16 md:py-28 flex flex-col justify-center reveal relative z-10">
      <div className="text-[10px] tracking-[0.4em] uppercase text-coral mb-6">
        Servicio {number}
      </div>
      <h3
        className="font-display font-bold text-nude leading-[0.95] mb-8"
        style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
      >
        {title}
      </h3>
      <p className="max-w-md text-base md:text-lg text-nude/75 leading-relaxed font-light">
        {body}
      </p>
      <div className="mt-10 text-coral text-sm tracking-[0.3em] uppercase">
        Ver más →
      </div>
    </div>
  );
  const visual = (
    <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
      <img
        src={image}
        alt={imageAlt}
        width={imageW}
        height={imageH}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "rgba(17,20,43,0.45)" }} />
      <span
        className="marble-text absolute bottom-4 right-6 font-display font-black leading-none select-none"
        style={{
          fontSize: "clamp(6rem, 14vw, 16rem)",
          letterSpacing: "-0.06em",
        }}
      >
        {number}
      </span>
    </div>
  );
  return (
    <div className={bg}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        {reverse ? (
          <>
            {visual}
            {text}
          </>
        ) : (
          <>
            {text}
            {visual}
          </>
        )}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section>
      <div className="px-6 md:px-16 pt-20 pb-10 bg-noche">
        <div className="text-[10px] tracking-[0.4em] uppercase text-coral mb-3">
          — Capítulo II
        </div>
        <h2
          className="font-display italic text-nude"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
        >
          Lo que hacemos
        </h2>
      </div>
      <Divider />
      <ServiceRow
        number="01"
        title="Gestión de Proyectos"
        body="Convertimos ideas dispersas en planes que respiran. Estructura, tiempos, equipos y entregables alineados con la visión —para que el proyecto suceda, no se quede en la conversación."
        bg="bg-noche"
        image={IMG_SERVICES_1}
        imageAlt="Profesionales revisando contenido en un laptop"
        imageW={1280}
        imageH={1600}
      />
      <Divider />
      <ServiceRow
        number="02"
        title="Creación de Contenido"
        body="Diseñamos narrativas y piezas visuales con voz propia. Identidad, dirección creativa y producción —contenido que se reconoce, recuerda y mueve."
        reverse
        bg="bg-purpura-azul"
        image={IMG_SERVICES_2}
        imageAlt="Sesión de planeación con notas y libretas"
        imageW={1600}
        imageH={1280}
      />
      <Divider />
    </section>
  );
}

function Marquee() {
  const phrase =
    "KAORA · Dando vida al presente · Gestión · Contenido · Presente · ";
  const repeated = phrase.repeat(8);
  return (
    <div className="bg-magenta py-6 md:py-8 overflow-hidden border-y border-noche/20">
      <div className="marquee-track font-display text-nude text-3xl md:text-5xl tracking-tight">
        <span className="pr-8">{repeated}</span>
        <span className="pr-8">{repeated}</span>
      </div>
    </div>
  );
}

function WhyItem({
  num,
  title,
  body,
  className,
}: {
  num: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`reveal ${className ?? ""}`}>
      <div
        className="font-display font-black leading-none mb-4"
        style={{ fontSize: "clamp(3rem, 6vw, 6rem)", color: "var(--coral)" }}
      >
        {num}
      </div>
      <h4 className="font-display text-2xl md:text-3xl text-nude mb-3 leading-tight">
        {title}
      </h4>
      <p className="text-sm md:text-base text-nude/70 max-w-xs leading-relaxed">
        {body}
      </p>
    </div>
  );
}

function WhyKaora() {
  return (
    <section className="bg-noche">
      <div className="px-6 md:px-16 pt-24 md:pt-36 pb-16 md:pb-24">
        <div className="text-[10px] tracking-[0.4em] uppercase text-coral mb-3">
          — Capítulo III
        </div>
        <h2
          className="font-display italic text-nude"
          style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
        >
          Por qué KAORA
        </h2>
      </div>

      {/* Editorial image strip — bleeds to edges */}
      <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
        <img
          src={IMG_WHY}
          alt="Lluvia de ideas frente a un mood board"
          width={1600}
          height={1280}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(17,20,43,0.45)" }} />
        <div className="absolute inset-0 flex items-end px-6 md:px-16 pb-8 md:pb-12">
          <p
            className="font-display italic max-w-2xl"
            style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.6rem)", color: "#E8DDD0" }}
          >
            Cuatro razones. Ningún rodeo.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-16 py-24 md:py-36">
        <div className="border-t border-purpura-azul">
          {[
            { num: "01", title: "Tiempo real", body: "Trabajamos en el presente, con ritmo y respuestas claras. Sin promesas vagas." },
            { num: "02", title: "Creatividad con estructura", body: "Lo intuitivo se sostiene en método. Diseño y planeación caminan juntos." },
            { num: "03", title: "Identidad que impacta", body: "Cada proyecto encuentra su voz. Y esa voz, su público." },
            { num: "04", title: "Proyectos que se entregan", body: "No vendemos procesos. Entregamos resultados terminados, en fecha." },
          ].map((item) => (
            <div
              key={item.num}
              className="reveal group grid grid-cols-12 gap-6 md:gap-10 items-baseline border-b border-purpura-azul py-10 md:py-14 transition-colors duration-500 hover:bg-purpura-azul/20"
            >
              <div
                className="marble-text col-span-2 md:col-span-2 font-display font-black leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
              >
                {item.num}
              </div>
              <h4
                className="col-span-10 md:col-span-5 font-display text-nude leading-[1.05]"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
              >
                {item.title}
              </h4>
              <p className="col-start-3 md:col-start-8 col-span-10 md:col-span-5 text-sm md:text-base text-nude/70 leading-relaxed max-w-md">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-purpura-azul px-6 md:px-16 py-24 md:py-36">
      <div className="text-[10px] tracking-[0.4em] uppercase text-nude mb-12 md:mb-20 reveal">
        — Lo que dicen
      </div>

      {/* Pull quote — 70% width */}
      <div className="reveal mb-24 md:mb-36">
        <blockquote
          className="marble-text font-display font-light leading-[1.08] tracking-[-0.02em] md:w-[70%]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 4.8rem)" }}
        >
          “KAORA no solo entregó el proyecto a tiempo — transformó cómo pensamos nuestra marca desde adentro.”
        </blockquote>
        <hr className="border-0 border-t border-noche/40 mt-10 md:w-[70%]" />
        <div className="mt-4 text-[11px] tracking-[0.3em] uppercase text-nude/70">
          Valentina Ríos · Fundadora · Estudio Nómade
        </div>
      </div>

      {/* Asymmetric 60/40 */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-12 md:gap-20">
        <div className="md:col-span-6 reveal">
          <p
            className="font-display text-nude leading-[1.2] italic"
            style={{ fontSize: "clamp(1.3rem, 2.2vw, 2.1rem)" }}
          >
            “Trabajar con KAORA fue diferente desde el primer día. Entienden que el contenido y la gestión son la misma cosa.”
          </p>
          <hr className="border-0 border-t border-noche/40 mt-8" />
          <div className="mt-4 text-[11px] tracking-[0.3em] uppercase text-nude/70">
            Mateo Fuentes · Co-fundador · Raíz Digital
          </div>
        </div>

        <div className="md:col-span-4 md:pt-24 reveal">
          <p
            className="font-display text-nude leading-[1.2] italic"
            style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.7rem)" }}
          >
            “Le dieron vida a una idea que yo solo tenía en mi cabeza. Eso no tiene precio.”
          </p>
          <hr className="border-0 border-t border-noche/40 mt-8" />
          <div className="mt-4 text-[11px] tracking-[0.3em] uppercase text-nude/70">
            Camila Herrera · Fundadora · Cápsula Studio
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contacto"
      className="bg-noche min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-24 text-center"
    >
      <div className="text-[10px] tracking-[0.4em] uppercase text-coral mb-8 reveal">
        — Capítulo IV
      </div>
      <h2
        className="font-display font-bold text-nude leading-[0.95] mb-6 reveal"
        style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
      >
        ¿Tienes un proyecto?
      </h2>
      <p
        className="font-display italic text-coral mb-16 reveal"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
      >
        Conversemos.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-2xl flex flex-col gap-6 reveal"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <input
            type="text"
            placeholder="Tu nombre"
            className="flex-1 bg-transparent border-0 border-b border-nude/40 px-0 py-4 text-nude placeholder:text-nude/40 focus:outline-none focus:border-coral transition-colors text-lg"
          />
          <input
            type="email"
            placeholder="Tu correo"
            className="flex-1 bg-transparent border-0 border-b border-nude/40 px-0 py-4 text-nude placeholder:text-nude/40 focus:outline-none focus:border-coral transition-colors text-lg"
          />
        </div>
        <div className="pt-6">
          <button
            type="submit"
            className="bg-coral text-noche px-10 py-4 text-xs tracking-[0.35em] uppercase font-medium hover:bg-nude transition-colors duration-500"
          >
            Escribir a KAORA →
          </button>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-noche border-t border-purpura-azul px-6 md:px-16 py-14">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="font-display font-black text-nude text-3xl md:text-4xl tracking-tight leading-none">
            KAORA
          </div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-nude/50 mt-2 italic font-display">
            Dando vida al presente
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-[11px] tracking-[0.3em] uppercase text-nude/60">
          <span>Instagram —</span>
          <span>Behance —</span>
          <span>hola@kaora.studio</span>
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-nude/40">
          © MMXXVI · Estudio
        </div>
      </div>
    </footer>
  );
}
