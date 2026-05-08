import type { LucideIcon } from 'lucide-react';
import { Headphones, Lock, Mail, PercentCircle, Tag } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import bookingHome from '@/public/images/bookingHome.jpg';
import emailIcon from '@/public/images/icons/email.svg';
import facebookIcon from '@/public/images/icons/facebook.svg';
import googleIcon from '@/public/images/icons/google.svg';
import BookingLargeDestinationCard from '@/components/client-booking/BookingLargeDestinationCard';
import BookingPropertyCarousel from '@/components/client-booking/BookingPropertyCarousel';
import BookingSplitDestinationCard from '@/components/client-booking/BookingSplitDestinationCard';

const featuredStays = [
  {
    id: '1',
    title: 'Chroma Tessera',
    location: 'Lazio, Roma, Termini',
    category: 'Holiday home',
    rating: '9.3',
    ratingSubtitle: 'Over 8 real reviews',
    ratingAlign: 'right' as const,
    statusLabel: 'Fully booked today',
  },
  {
    id: '2',
    title: 'Chroma Italy — Doc…',
    location: 'Lazio, Roma, San Paolo',
    category: 'Guest house',
    rating: '8.9',
    ratingSubtitle: 'Over 12 real reviews',
    ratingAlign: 'right' as const,
    statusLabel: 'Fully booked today',
  },
  {
    id: '3',
    title: 'Domus Helena',
    location: 'Lazio, Roma, Prati',
    category: 'Holiday home',
    statusLabel: 'Fully booked today',
  },
  {
    id: '4',
    title: 'Suite Trastevere',
    location: 'Lazio, Roma, Trastevere',
    category: 'Apartment',
    rating: '9.1',
    ratingSubtitle: 'Over 20 real reviews',
    ratingAlign: 'right' as const,
    statusLabel: 'Fully booked today',
  },
  {
    id: '5',
    title: 'Aventino Loft',
    location: 'Lazio, Roma, Aventino',
    category: 'Guest house',
    statusLabel: 'Fully booked today',
  },
];

const exploreRegions = [
  {
    id: 'lazio',
    title: 'Lazio',
    body: "Il Lazio regione dell'Italia centrale affacciata sul Mar Tirreno prevalentemente collinare che si estende fino agli Appennini. Il suo capoluogo, Roma, è la capitale d'Italia cuore dell'antico Impero Romano. Il Lazio possiede un gr",
  },
  {
    id: 'toscana',
    title: 'Toscana',
    body: "La Toscana è una regione dell'Italia centrale. Il suo territorio è tra i piu' variegati d'Italia, comprende gli aspri Appennini, le meravigliose località balneari e le sue isole nel mar tirreno, gli oliveti e i ricchi vigneti del Chianti. Il suo c",
  },
  {
    id: 'abruzzo',
    title: 'Abruzzo',
    body: "L'Abruzzo è una regione italiana che si trova, tra il mare Adriatico e la catena montuosa degli Appennini. L'entroterra è costituito per la gran parte da parchi nazionali e riserve naturali. La regione comprende, anche paesini medievali e rinascim",
  },
  {
    id: 'umbria',
    title: 'Umbria',
    body: "L'umbria chiamata Il cuore verde dell'Italia centrale, conosciuta per le sue città medievali situate in cima alle colline, dai suoi folti boschi e la sua cucina, in particolare i tartufi e il vino. Ricca di spiritualità e borghi medioevali. Famosa",
  },
];

type InspirationPlace = {
  id: string;
  title: string;
  subtitle: string;
  highlighted?: boolean;
};

const regionsToDiscover: InspirationPlace[] = [
  { id: 'umbria-r', title: 'Umbria', subtitle: 'Italia' },
  { id: 'toscana-r', title: 'Toscana', subtitle: 'Italia' },
  { id: 'abruzzo-r', title: 'Abruzzo', subtitle: 'Italia' },
  { id: 'lazio-r', title: 'Lazio', subtitle: 'Italia' },
  { id: 'veneto-r', title: 'Veneto', subtitle: 'Italia' },
  { id: 'puglia-r', title: 'Puglia', subtitle: 'Italia' },
  { id: 'lombardia-r', title: 'Lombardia', subtitle: 'Italia' },
  { id: 'sicilia-r', title: 'Sicilia', subtitle: 'Italia', highlighted: true },
  { id: 'calabria-r', title: 'Calabria', subtitle: 'Italia' },
  { id: 'campania-r', title: 'Campania', subtitle: 'Italia' },
  { id: 'piemonte-r', title: 'Piemonte', subtitle: 'Italia' },
  { id: 'liguria-r', title: 'Liguria', subtitle: 'Italia' },


];

const citiesNotToMiss: InspirationPlace[] = [
  { id: 'bagnoregio', title: 'Bagnoregio', subtitle: 'VT, Lazio, Italia' },
  { id: 'calcata-vecchia', title: 'Calcata Vecchia', subtitle: 'VT, Lazio, Italia' },
  { id: 'bomarzo', title: 'Bomarzo', subtitle: 'VT, Lazio, Italia' },
  { id: 'roccantica', title: 'Roccantica', subtitle: 'RI, Lazio, Italia' },
  { id: 'sutri', title: 'Sutri', subtitle: 'VT, Lazio, Italia' },
  { id: 'vitorchiano', title: 'Vitorchiano', subtitle: 'VT, Lazio, Italia' },
  { id: 'sermoneta', title: 'Sermoneta', subtitle: 'LT, Lazio, Italia' },
  { id: 'alatri', title: 'Alatri', subtitle: 'FR, Lazio, Italia' },
  { id: 'guardiagrele', title: 'Guardiagrele', subtitle: 'CH, Abruzzo, Italia' },
  { id: 'pennapiedimonte', title: 'Pennapiedimonte', subtitle: 'CH, Abruzzo, Italia' },
  { id: 'orvieto', title: 'Orvieto', subtitle: 'TR, Umbria, Italia' },
  { id: 'todi', title: 'Todi', subtitle: 'PG, Umbria, Italia' },
  { id: 'spello', title: 'Spello', subtitle: 'PG, Umbria, Italia' },
  { id: 'norcia', title: 'Norcia', subtitle: 'PG, Umbria, Italia' },
  { id: 'scanno', title: 'Scanno', subtitle: 'AQ, Abruzzo, Italia' },

];

type BestTravelIdea = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
};

const bestTravelIdeas: BestTravelIdea[] = [
  {
    id: 'idea-bomarzo',
    title: 'Il parco dei Mostri di Bomarzo',
    subtitle: 'Lazio, Italia',
    imageSrc: bookingHome,
    imageAlt: 'Parco dei Mostri di Bomarzo, Lazio',
  },
  {
    id: 'idea-sutri',
    title: 'La Grotta di Orlando a Sutri',
    subtitle: 'Lazio, Italia',
    imageSrc: bookingHome,
    imageAlt: 'Grotta di Orlando a Sutri, Lazio',
  },
  {
    id: 'idea-roccantica',
    title: 'Il Revotano di Roccantica',
    subtitle: 'Lazio, Italia',
    imageSrc: bookingHome,
    imageAlt: 'Revotano di Roccantica, Lazio',
  },
  {
    id: 'idea-chia',
    title: 'La città fantasma di Chia',
    subtitle: 'Lazio, Italia',
    imageSrc: bookingHome,
    imageAlt: 'Città fantasma di Chia, Lazio',
  },
  {
    id: 'idea-tivoli',
    title: 'Tivoli e le sue ville',
    subtitle: 'Lazio, Italia',
    imageSrc: bookingHome,
    imageAlt: 'Tivoli e ville, Lazio',
  },
];

const italiaCountryStoryParagraphs = [
  "Il paese delle opere d'arte, e non si deve fare nessuna coda per vederle, basta recarsi per i centri storici di ogni città, o per uno dei tantissimi borghi medievali dislocati su tutto il territorio per ammirare la grande bellezza di un paese con più di duemila anni di storia e cultura.",
  "L'Italia è una penisola quasi completamente bagnata dal mare, protetta dalle più belle e affascinanti catene montuose al mondo. In Italia si possono trascorrere vacanze da sogno, si può decidere di andare in montagna per godersi quei meravigliosi e rigogliosi paesaggi, con panorami e tramonti mozzafiato …",
];

type WhyBookFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const whyBookFeatures: WhyBookFeature[] = [
  {
    icon: Mail,
    title: 'Direct booking',
    description:
      'Book and communicate directly with hosts. It is a platform managed directly by the structure. You have a doubt or a special request, request it immediately.',
  },
  {
    icon: Tag,
    title: 'Instant Booking',
    description:
      'The availabilities are in real time and always updated. They are managed directly by the hosts and there are no intermediaries. The price offered is clear and transparent',
  },
  {
    icon: Headphones,
    title: 'No brokerage fees',
    description:
      'There are no intermediaries with agencies, the online booking service is direct with the host and is completely free for all.',
  },
  {
    icon: Lock,
    title: 'Security of the service',
    description:
      'The booking service complies with all online security standards your data is securely encrypted and protected. Nobody will communicate your phone and email, we take care of and respect your privacy',
  },
  {
    icon: PercentCircle,
    title: 'Safe Payments',
    description:
      'Book and pay for your stay in complete safety. Pay easily with Paypal or choose to pay directly to the trusted Host, thus eliminating all risks and worries.',
  },
];

type ManagementFeatureCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
};

const managementFeatureCards: ManagementFeatureCard[] = [
  {
    id: 'management-pms',
    title: 'Management Pms',
    description: 'More free time with automated booking management. Your reception always in your pocket and wherever you are.',
    imageSrc: bookingHome,
    imageAlt: 'Management PMS on laptop',
  },
  {
    id: 'channel-manager',
    title: 'Channel Manager',
    description: 'Update availability and prices with a simple click in real time, avoid overbooking and increase turnover.',
    imageSrc: bookingHome,
    imageAlt: 'Channel manager dashboard on mobile devices',
  },
  {
    id: 'booking-engine',
    title: 'Booking Engine',
    description:
      'The direct booking solution that integrates into your website. Eliminate the costs of online agencies and connect you directly to the customer.',
    imageSrc: bookingHome,
    imageAlt: 'Booking engine on laptop screen',
  },
];

type SocialShareItem = {
  id: string;
  label: string;
  short: string;
  bgClass: string;
  iconSrc?: string;
  iconAlt?: string;
};

const socialShareItems: SocialShareItem[] = [
  { id: 'email', label: 'E-mail', short: '@', bgClass: 'bg-teal-600', iconSrc: emailIcon, iconAlt: 'E-mail icon' },
  { id: 'facebook', label: 'Facebook', short: 'f', bgClass: 'bg-blue-700', iconSrc: facebookIcon, iconAlt: 'Facebook icon' },
  { id: 'google', label: 'Google', short: 'g', bgClass: 'bg-white', iconSrc: googleIcon, iconAlt: 'Google icon' },
  { id: 'twitter', label: 'Twitter', short: 't', bgClass: 'bg-sky-500' },
  { id: 'telegram', label: 'Telegram', short: 'tg', bgClass: 'bg-sky-600' },
  { id: 'skype', label: 'Skype', short: 's', bgClass: 'bg-cyan-500' },
  { id: 'whatsapp', label: 'WhatsApp', short: 'wa', bgClass: 'bg-emerald-600' },
  { id: 'instagram', label: 'Instagram', short: 'ig', bgClass: 'bg-pink-600' },
  { id: 'reddit', label: 'Reddit', short: 'r', bgClass: 'bg-orange-500' },
  { id: 'linkedin', label: 'LinkedIn', short: 'in', bgClass: 'bg-blue-800' },
  { id: 'pinterest', label: 'Pinterest', short: 'p', bgClass: 'bg-rose-600' },
  { id: 'tumblr', label: 'Tumblr', short: 't', bgClass: 'bg-slate-700' },
  { id: 'vk', label: 'VK', short: 'vk', bgClass: 'bg-blue-500' },
];

const BookingSection = () => {
  return (
    <section className="w-full min-w-0 overflow-x-clip bg-white py-14">
      <div className="mx-auto mb-8 max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Organize your trip now</h2>
        <p className="mt-1.5 text-sm italic text-slate-500 md:text-base">Choose your next destination</p>
      </div>

      <div className="mx-auto flex w-full max-w-[1920px] min-w-0 flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-stretch lg:gap-5 lg:px-8 xl:gap-6 xl:px-10 2xl:px-12">
        <div className="min-w-0 shrink-0 lg:w-[min(50%,36rem)] xl:w-[min(48%,38rem)]">
          <BookingLargeDestinationCard
            className="h-full min-h-[270px] md:min-h-[300px] lg:min-h-[24.5rem]"
            title="Roma"
            subtitle="Discover all the other hotels"
            imageSrc={bookingHome}
            imageAlt="Rome city view"
          />
        </div>

        <div className="flex min-h-[25.5rem] min-w-0 flex-1 md:min-h-[26.5rem]">
          <BookingPropertyCarousel className="w-full min-w-0" slideCount={featuredStays.length}>
            {featuredStays.map((stay) => (
              <BookingSplitDestinationCard
                key={stay.id}
                size="narrow"
                title={stay.title}
                location={stay.location}
                category={stay.category}
                imageSrc={bookingHome}
                imageAlt=""
                rating={stay.rating}
                ratingSubtitle={stay.ratingSubtitle}
                ratingAlign={stay.ratingAlign ?? 'left'}
                statusLabel={stay.statusLabel}
              />
            ))}
          </BookingPropertyCarousel>
        </div>
      </div>

      <div className="mt-20 w-full px-0 sm:mt-24 lg:mt-28" role="separator" aria-hidden>
        <div className="h-px w-full bg-slate-300" />
      </div>

      <div className="mt-10 w-full bg-white py-12 sm:mt-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 xl:max-w-[min(100%,100rem)] 2xl:max-w-[110rem]">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">Exploring Italia!</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm italic text-slate-500 md:text-2xl">
            Discover the most popular places chosen for you
          </p>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-center gap-8 px-4 sm:mt-12 sm:px-6 lg:gap-9 lg:px-8 xl:max-w-[min(100%,100rem)] 2xl:max-w-[110rem]">
          {exploreRegions.map((region, index) => (
            <div
              key={region.id}
              className="w-full shrink-0 animate-explore-card-reveal motion-reduce:animate-none sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-6.75rem)/4)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <BookingSplitDestinationCard
                variant="region"
                title={region.title}
                location={region.body}
                category="Region"
                imageSrc={bookingHome}
                imageAlt={`${region.title} landscape`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 w-full px-0 sm:mt-14 lg:mt-16" role="separator" aria-hidden>
        <div className="h-px w-full bg-slate-300" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14 xl:max-w-[min(100%,100rem)] 2xl:max-w-[110rem]">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">Still undecided?</h2>
          <p className="mx-auto mt-1.5 max-w-2xl text-base italic text-slate-500 md:text-2xl">
            Find the inspiration for your next trip
          </p>
        </div>

        <div className="mt-8 md:mt-9">
          <h3 className="text-center text-lg font-semibold text-slate-900 sm:text-left md:text-xl">
            Regions to discover
          </h3>

          <div className="mt-4 sm:hidden">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {regionsToDiscover.map((place) => (
                <div
                  key={place.id}
                  className={
                    place.highlighted
                      ? 'rounded-lg bg-slate-100 px-2 py-3 text-center shadow-sm'
                      : 'px-1 py-2 text-center'
                  }
                >
                  <p className="text-sm font-bold text-slate-900">{place.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{place.subtitle}</p>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="mt-7 block text-left text-sm font-semibold text-[#008489] transition hover:underline"
            >
              Show more
            </a>
          </div>

          <div className="mt-3 hidden sm:-mx-4 sm:block sm:overflow-x-auto sm:px-4 sm:pb-2 md:mx-0 md:overflow-visible md:px-0">
            <div className="flex min-w-min flex-nowrap items-end gap-x-8 md:gap-x-9 lg:gap-x-10">
              {regionsToDiscover.map((place) => (
                <div
                  key={place.id}
                  className={
                    place.highlighted
                      ? 'shrink-0 rounded-lg bg-slate-100 px-3 py-2 shadow-sm'
                      : 'shrink-0 rounded-lg px-1 py-0.5'
                  }
                >
                  <p className="text-sm font-bold text-slate-900 md:text-[15px]">{place.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500 md:text-sm">{place.subtitle}</p>
                </div>
              ))}
              <a
                href="#"
                className="shrink-0 self-center text-sm font-semibold text-[#008489] transition hover:underline md:text-[15px]"
              >
                Show more
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-8 md:mt-9">
          <h3 className="text-center text-lg font-semibold text-slate-900 sm:text-left md:text-xl">
            Cities not to be missed
          </h3>

          <div className="mt-4 sm:hidden">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {citiesNotToMiss.map((place) => (
                <div key={place.id} className="px-1 py-2 text-center">
                  <p className="text-sm font-bold text-slate-900">{place.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{place.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 hidden sm:-mx-4 sm:block sm:overflow-x-auto sm:px-4 sm:pb-2 md:mx-0 md:overflow-visible md:px-0">
            <div className="flex min-w-min flex-nowrap gap-x-8 md:gap-x-9 lg:gap-x-10">
              {citiesNotToMiss.map((place) => (
                <div key={place.id} className="shrink-0">
                  <p className="text-sm font-bold text-slate-900 md:text-[15px]">{place.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500 md:text-sm">{place.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <h3 className="text-left text-lg font-semibold text-slate-900 sm:text-3xl">Best travel ideas</h3>
          <div className="mt-3 -mx-2 min-h-0 sm:mx-0">
            <BookingPropertyCarousel
              className="w-full max-w-none flex-none px-0 sm:px-0"
              slideCount={bestTravelIdeas.length}
              overlayArrows
            >
              {bestTravelIdeas.map((idea) => (
                <div
                  key={idea.id}
                  {...{ 'data-carousel-card': '' }}
                  className="w-full shrink-0 snap-start sm:w-[min(48vw,420px)] md:w-[min(440px,42vw)] lg:w-[460px]"
                >
                  <BookingLargeDestinationCard
                    variant="travel-idea"
                    className="h-full w-full"
                    title={idea.title}
                    subtitle={idea.subtitle}
                    imageSrc={idea.imageSrc}
                    imageAlt={idea.imageAlt}
                  />
                </div>
              ))}
            </BookingPropertyCarousel>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <p className="text-left text-base font-medium text-slate-950 sm:text-2xl">A country can not be forgotten</p>
          <div className="mt-2 sm:mt-3">
            <BookingLargeDestinationCard
              variant="country-banner"
              className="w-full"
              title="Italia"
              subtitle=""
              imageSrc={bookingHome}
              imageAlt="Paesaggio costiero italiano"
              bannerParagraphs={italiaCountryStoryParagraphs}
            />
          </div>
        </div>
      </div>

      <div className="mt-14 w-full border-t border-slate-200 px-4 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16 xl:px-16 2xl:px-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
          Why book on PMP Platform.com?
        </h2>
        <div className="mx-auto mt-8 grid w-full max-w-none grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:mt-10 lg:grid-cols-5 lg:gap-x-5 lg:gap-y-8 xl:gap-x-8 2xl:gap-x-10">
          {whyBookFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex w-full max-w-none flex-col items-center gap-2.5 px-1 text-center sm:px-2 md:px-3"
              >
                <Icon className="h-11 w-11 shrink-0 text-slate-700 sm:h-12 sm:w-12" strokeWidth={1.65} aria-hidden />
                <h3 className="text-lg font-bold text-slate-950 sm:text-xl">{feature.title}</h3>
                <p className="w-full max-w-none text-[15px] leading-relaxed text-slate-800 sm:text-base md:leading-[1.65]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full px-0 pt-5 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12">
        <div
          className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden sm:min-h-[320px] lg:min-h-[360px]"
          style={{
            backgroundImage: `url(${bookingHome.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-slate-900/55" />
          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 text-center text-white sm:px-6">
            <h3 className="text-4xl font-bold tracking-tight sm:text-5xl">Register your property on PMP </h3>
            <p className="mt-2 text-2xl italic text-white/95 sm:text-3xl">The first Italian portal for Italy</p>
            <p className="mt-5 text-3xl font-medium text-white sm:text-4xl">The only platform to book directly with the Hosts</p>
            <button
              type="button"
              className="mt-8 inline-flex h-12 min-w-[340px] items-center justify-center rounded-full bg-white px-12 text-sm font-semibold tracking-wide text-slate-900 shadow-md transition hover:bg-slate-100 sm:h-14 sm:min-w-[620px]"
            >
              REGISTER YOUR PROPERTY
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-[1700px]">
          <h3 className="text-center text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Do you want to get the most out of your facility?
          </h3>
          <p className="mx-auto mt-2 max-w-4xl text-center text-lg italic text-slate-600 md:text-xl">
            Try the Holisense.com technologies in the hospitality industry, the applications are simple, fast, secure
            and ready to use from any device.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 xl:gap-8">
            {managementFeatureCards.map((item) => (
              <BookingSplitDestinationCard
                key={item.id}
                variant="feature"
                title={item.title}
                location={item.description}
                category=""
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full border-t border-slate-200 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <h3 className="text-2xl font-medium text-slate-900 sm:text-3xl">Tell your friends</h3>
          <div className="mt-5 w-full sm:hidden">
            <div className="mx-auto grid w-full max-w-[230px] grid-cols-3 gap-x-3 gap-y-4">
              {socialShareItems.slice(0, 3).map((item) => (
                <button key={item.id} type="button" className="group inline-flex flex-col items-center text-center" aria-label={item.label}>
                  {item.iconSrc ? (
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-sm shadow-sm ${item.bgClass}`}>
                      <img src={item.iconSrc} alt={item.iconAlt ?? `${item.label} icon`} className="h-4 w-4 object-contain" />
                    </span>
                  ) : (
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-sm text-[11px] font-bold uppercase text-white shadow-sm ${item.bgClass}`}
                    >
                      {item.short}
                    </span>
                  )}
                  <span className="mt-1.5 text-xs text-slate-700 transition group-hover:text-slate-900">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="my-4 h-px w-full bg-slate-200" />

            <div className="grid grid-cols-2 gap-x-10 gap-y-4">
              {socialShareItems.slice(3, 9).map((item) => (
                <button key={item.id} type="button" className="group inline-flex flex-col items-center text-center" aria-label={item.label}>
                  {item.iconSrc ? (
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-sm shadow-sm ${item.bgClass}`}>
                      <img src={item.iconSrc} alt={item.iconAlt ?? `${item.label} icon`} className="h-4 w-4 object-contain" />
                    </span>
                  ) : (
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-sm text-[11px] font-bold uppercase text-white shadow-sm ${item.bgClass}`}
                    >
                      {item.short}
                    </span>
                  )}
                  <span className="mt-1.5 text-xs text-slate-700 transition group-hover:text-slate-900">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 hidden flex-wrap items-start justify-center gap-x-7 gap-y-4 sm:flex">
            {socialShareItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="group inline-flex flex-col items-center text-center"
                aria-label={item.label}
              >
                {item.iconSrc ? (
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-sm shadow-sm ${item.bgClass}`}>
                    <img src={item.iconSrc} alt={item.iconAlt ?? `${item.label} icon`} className="h-4 w-4 object-contain" />
                  </span>
                ) : (
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-sm text-[11px] font-bold uppercase text-white shadow-sm ${item.bgClass}`}
                  >
                    {item.short}
                  </span>
                )}
                <span className="mt-1.5 text-xs text-slate-700 transition group-hover:text-slate-900">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
