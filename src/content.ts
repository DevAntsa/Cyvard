export type Lang = 'en' | 'fi'

/* All site copy in one place, per language. Anton can edit the Finnish here directly. */
export const content = {
  en: {
    nav: { threat: 'The threat', services: 'Services', pricing: 'Pricing', freeCheck: 'Free check', privacy: 'Privacy' },
    hero: {
      badge: 'Offensive security · Finland',
      title1: 'Attackers use AI.',
      title2: 'So do we.',
      sub: "Cyvard tests your systems the way a real attacker would — now one armed with AI — and shows you exactly where you're exposed, before someone less friendly finds the same gaps.",
      cta1: 'Get a free exposure check',
      cta2: 'See what we find',
      chips: ['Authorized', 'Scoped & signed', 'EU data', 'One accountable human'],
    },
    spoof: {
      eyebrow: 'No system access · public data only',
      title: "This took three seconds — and it's the easy stuff.",
      body: 'Before we touch anything, plenty is already visible from the outside: a domain anyone can spoof, an admin panel with no login, a cloud bucket left open. We show you what an attacker sees first — for free.',
    },
    threat: {
      eyebrow: 'The barrier just collapsed',
      pre: 'The old comfort — ',
      quote: `"who'd bother attacking us"`,
      post: " — no longer holds. Automation doesn't care about your size.",
      stats: [
        ['5 yrs', 'of expertise, once required to run this attack'],
        ['1 person', 'plus AI is all it takes now'],
        ['SMEs', 'increasingly the target, not the exception'],
      ],
    },
    video: {
      eyebrow: 'Watch',
      title: 'The dangerous evolution of AI hacking',
      body: 'Why someone with almost no technical skill, armed with AI, can now do what took an expert five years ago — and why your data has never been more exposed.',
    },
    services: {
      eyebrow: 'What we do',
      title: 'We find the gaps, and hand you the fix.',
      items: [
        ['Penetration testing', 'Web apps, APIs and infrastructure, tested the way a real attacker would approach them.'],
        ['Security assessments', 'A clear read on your posture — what is exposed, how bad it is, and what to fix first.'],
        ['Email & domain spoofing', 'SPF, DKIM and DMARC gaps that let anyone send mail in your name. The fast, no-touch entry point.'],
        ['GDPR data exposure', 'Open databases, leaky APIs, misconfigured cloud — the findings that become a compliance case.'],
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Fixed starting points, scoped honestly on a call.',
      subtitle: 'Start small, scale as you need.',
      badge: 'Best first step',
      cta: 'Book a scoping call',
      note: "Every finding comes with a clear fix and a free re-test to confirm it's closed. Hands-on remediation and larger cloud/infrastructure scopes are quoted per engagement (or handled with a trusted partner). Prices exclude VAT.",
      tiers: [
        { name: 'Cyvard Pulse', price: '€99', unit: '/mo', sub: 'always-on monitoring', blurb: 'An always-on watch of your public attack surface — you hear from me the moment something changes.', featured: false, features: ['Continuous external monitoring', 'Alerts on new exposures & leaked credentials', 'Watches for fresh vulnerabilities in your stack', 'A clear fix whenever something turns up', 'Ongoing evidence for NIS2 & insurers'] },
        { name: 'Guardian — Continuous Watch', price: 'from €390', unit: '/mo', sub: 'rolling monthly', blurb: 'The full ongoing relationship — watched continuously, re-tested every quarter.', featured: false, features: ['Continuous surface monitoring', 'A full re-test every quarter', 'A senior on call, priority response', 'New exposure caught early'] },
        { name: 'Exposure Review', price: 'from €590', unit: '', sub: 'one-off', blurb: 'The smart place to start — a one-time look at everything exposed on your domain, entirely from public data.', featured: true, features: ['Passive, public-only recon', 'Prioritized exposure report', 'Walkthrough material (slides or email)', 'A clear fix for every finding'] },
        { name: 'Web & API Pentest', price: 'from €2,900', unit: '', sub: 'per project', blurb: 'The deep engagement — the paths that actually reach your data.', featured: false, features: ['Authenticated, in-depth testing', 'Broken auth, IDOR, injection, logic flaws', 'Clear report + a fix for each finding', "One free retest to confirm it's closed", 'Signed, scoped & safe-harboured'] },
      ],
    },
    track: {
      eyebrow: 'Track record',
      title: 'Proven where a mistake costs millions.',
      intro:
        'Before Cyvard, I spent years finding real, exploitable vulnerabilities in live crypto and DeFi systems — the most adversarial environment there is, where a single flaw instantly moves money. The same discipline goes straight to your website, APIs and cloud.',
      role: 'Founder, Cyvard',
      stats: [
        ['$60M+', 'Combined value-at-risk uncovered across engagements — individual findings exposing $16M–27M asset pools.'],
        ['~96k', 'Personal & compliance records exposed by a single unauthenticated endpoint — exactly the leak that becomes a GDPR notification.'],
        ['0', 'False positives shipped. Every finding is hand-verified and demonstrated; non-issues are dropped, never padded.'],
      ],
      findings: [
        ['~$27M', 'Vault-drain path', 'An authorization flaw opened a path to drain a ~$27M asset pool. Proven on a live fork, then remediated with the team.'],
        ['~$16M', 'Single point of failure', 'One key silently controlled ~$16M in treasury and liquidity across an entire platform — a full takeover risk, invisible from the outside.'],
        ['Takeover', 'Dangling infrastructure', 'A forgotten, dangling subdomain could be claimed by anyone and weaponised to phish users from a trusted domain.'],
        ['Live secrets', 'Exposed in production', 'Leaked API keys in shipped code, full source maps served in production, and a publicly-listable cloud bucket of user data — the quiet leaks nobody is watching.'],
      ],
      note: "Anonymized under client confidentiality. I won't name a live client or publish an exploitable detail — that restraint is exactly what you're hiring.",
    },
    cta: {
      title: 'See what your systems reveal.',
      body: "Start with a free, no-touch check of your public email security. If it's spoofable, you'll know in minutes — and so would an attacker.",
      button: 'Get your free check',
    },
    footer: { tagline: 'Whitehat security for Finnish & EU companies' },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: July 2026',
      back: '← Back to home',
      intro: 'This is how Cyvard handles personal data. It is a plain-language summary and will be finalised with legal counsel.',
      sections: [
        ['Who we are', 'Cyvard (Anton Luoto) is the data controller. Contact: anton@cyvard.com. Cyvard provides authorized security-testing services to companies.'],
        ['What we collect', 'This website collects minimal data. If you email us or request a check, we process the contact details and information you provide, only to respond to you. We use privacy-friendly, cookieless analytics and run no advertising trackers. The embedded video loads from YouTube in privacy-enhanced mode, and only when you press play.'],
        ['Why we process it', 'To respond to your enquiry and to pursue our legitimate interest in offering relevant security services (GDPR Art. 6(1)(f)), or on the basis of your consent where required.'],
        ['Engagement data', 'During a paid engagement we may process data on your behalf as a processor, under a separate Data Processing Agreement (GDPR Art. 28). We minimise access, never exfiltrate real personal data, and delete engagement data on an agreed schedule.'],
        ['Retention', 'We keep enquiry data only as long as needed to respond and for legitimate follow-up, then delete it.'],
        ['Your rights', 'You may request access to, correction of, deletion of, or object to the processing of your personal data, and request portability. Contact anton@cyvard.com.'],
        ['Supervisory authority', 'If you believe we handle your data unlawfully, you may lodge a complaint with the Finnish Data Protection Ombudsman (Tietosuojavaltuutetun toimisto).'],
      ],
    },
  },

  fi: {
    nav: { threat: 'Uhka', services: 'Palvelut', pricing: 'Hinnoittelu', freeCheck: 'Ilmainen tarkistus', privacy: 'Tietosuoja' },
    hero: {
      badge: 'Offensiivinen tietoturva · Suomi',
      title1: 'Hyökkääjät käyttävät tekoälyä.',
      title2: 'Niin mekin.',
      sub: 'Cyvard testaa järjestelmäsi kuten oikea hyökkääjä, nyt tekoälyn avustamana, ja osoittaa tarkalleen, missä olet alttiina, ennen kuin joku muu ehtii hyödyntää samat aukot.',
      cta1: 'Pyydä ilmainen tarkistus',
      cta2: 'Katso mitä löydämme',
      chips: ['Valtuutettu', 'Rajattu ja sovittu', 'Data EU:ssa', 'Yksi vastuuhenkilö'],
    },
    spoof: {
      eyebrow: 'Ei pääsyä järjestelmiin · vain julkinen data',
      title: 'Tähän meni kolme sekuntia, ja tämä on vasta se helppo osa.',
      body: 'Ennen kuin kosketamme mitään, ulospäin näkyy jo paljon: verkkotunnus, jonka nimissä kuka tahansa voi lähettää postia, hallintapaneeli ilman kirjautumista, avoimeksi jäänyt pilvitallennus. Näytämme veloituksetta, mitä hyökkääjä näkee ensimmäisenä.',
    },
    threat: {
      eyebrow: 'Taitoraja romahti',
      pre: 'Käsitys ',
      quote: '"pienempi on turvassa"',
      post: ' ei enää pidä paikkaansa. Automatisoidut hyökkäykset eivät valikoi kohteitaan koon mukaan.',
      stats: [
        ['5 v', 'osaamista, jota tämä hyökkäys ennen vaati'],
        ['1 ihminen', 'ja tekoäly riittää nykyään'],
        ['Pk-yritykset', 'yhä useammin kohteena, ei poikkeuksena'],
      ],
    },
    video: {
      eyebrow: 'Katso',
      title: 'Tekoälyhakkeroinnin vaarallinen kehitys',
      body: 'Miksi henkilö, jolla ei ole juurikaan teknistä osaamista, pystyy tekoälyn avulla tekemään sen, mihin ennen tarvittiin vuosien kokemus, ja miksi datasi ei ole koskaan ollut näin alttiina.',
    },
    services: {
      eyebrow: 'Mitä teemme',
      title: 'Löydämme aukot ja annamme korjausohjeet.',
      items: [
        ['Penetraatiotestaus', 'Verkkosovellukset, rajapinnat ja infrastruktuuri testattuina kuten oikea hyökkääjä ne lähestyisi.'],
        ['Tietoturva-arvioinnit', 'Selkeä kuva tilanteestasi: mikä on alttiina, kuinka vakavaa se on ja mitä korjata ensin.'],
        ['Sähköposti- ja verkkotunnusväärennökset', 'SPF-, DKIM- ja DMARC-aukot, joiden kautta kuka tahansa voi lähettää postia nimissäsi. Nopein aloitus, joka ei vaadi pääsyä järjestelmiisi.'],
        ['GDPR-tietovuodot', 'Avoimet tietokannat, vuotavat rajapinnat, väärin konfiguroitu pilvi. Juuri nämä löydökset kääntyvät tietosuojatapaukseksi.'],
      ],
    },
    pricing: {
      eyebrow: 'Hinnoittelu',
      title: 'Kiinteät lähtöhinnat, rajaus sovitaan rehellisesti puhelussa.',
      subtitle: 'Aloita pienestä ja laajenna tarpeen mukaan.',
      badge: 'Paras ensiaskel',
      cta: 'Varaa kartoituspuhelu',
      note: 'Jokaisen löydöksen mukana tulee selkeä korjausohje ja veloitukseton uusintatesti sen varmistamiseksi. Käytännön korjaustyöt ja laajemmat pilvi- ja infrastruktuurikokonaisuudet hinnoitellaan toimeksiantokohtaisesti (tai hoidetaan luotetun kumppanin kanssa). Hinnat eivät sisällä ALV:ia.',
      tiers: [
        { name: 'Cyvard Pulse', price: '99 €', unit: '/kk', sub: 'jatkuva valvonta', blurb: 'Jatkuva vahti julkiseen hyökkäyspintaasi. Kuulet minusta heti, kun jokin muuttuu.', featured: false, features: ['Jatkuva ulkoinen valvonta', 'Hälytykset uusista altistumista ja vuotaneista tunnuksista', 'Vahtii uusia haavoittuvuuksia ympäristössäsi', 'Selkeä korjaus aina kun jotain ilmenee', 'Jatkuva näyttö NIS2:ta ja vakuuttajia varten'] },
        { name: 'Guardian — jatkuva vahti', price: 'alk. 390 €', unit: '/kk', sub: 'kuukausittain jatkuva', blurb: 'Täysi jatkuva kumppanuus: valvomme jatkuvasti ja uusintatestaamme neljännesvuosittain.', featured: false, features: ['Jatkuva hyökkäyspinnan valvonta', 'Täysi uusintatesti neljännesvuosittain', 'Asiantuntija tavoitettavissa, priorisoitu vaste', 'Uudet altistumat kiinni ajoissa'] },
        { name: 'Altistumiskartoitus', price: 'alk. 590 €', unit: '', sub: 'kertaluontoinen', blurb: 'Fiksu paikka aloittaa. Kertaluontoinen katsaus kaikkeen, mitä verkkotunnuksestasi näkyy ulos, pelkästään julkisesta datasta.', featured: true, features: ['Passiivinen, vain julkinen kartoitus', 'Priorisoitu altistumisraportti', 'Läpikäyntimateriaali (kalvot tai sähköposti)', 'Selkeä korjaus jokaiseen löydökseen'] },
        { name: 'Web- & API-pentest', price: 'alk. 2 900 €', unit: '', sub: 'projektikohtainen', blurb: 'Syvin toimeksianto: reitit, jotka oikeasti yltävät dataasi.', featured: false, features: ['Autentikoitu, syvällinen testaus', 'Rikkinäinen autentikointi, IDOR, injektiot, logiikkavirheet', 'Selkeä raportti + korjaus jokaiseen löydökseen', 'Yksi veloitukseton uusintatesti sulkemisen varmistamiseksi', 'Sopimuksella, rajattu ja safe-harbour'] },
      ],
    },
    track: {
      eyebrow: 'Näytöt',
      title: 'Todistettu siellä, missä virhe maksaa miljoonia.',
      intro:
        'Ennen Cyvardia löysin vuosien ajan todellisia, hyödynnettäviä haavoittuvuuksia käytössä olevista krypto- ja DeFi-järjestelmistä, kaikkein vihamielisimmästä ympäristöstä, jossa yksi virhe siirtää rahaa välittömästi. Sama kurinalaisuus kohdistuu suoraan verkkosivustoosi, rajapintoihisi ja pilveesi.',
      role: 'Perustaja, Cyvard',
      stats: [
        ['60 M€+', 'Yhteenlaskettu riskissä ollut arvo eri toimeksiannoissa, yksittäisten löydösten paljastaessa 16–27 M€:n omaisuuseriä.'],
        ['~96k', 'Henkilö- ja compliance-tietuetta paljastui yhdestä todentamattomasta rajapinnasta. Juuri tällainen vuoto johtaa tietosuojailmoitukseen.'],
        ['0', 'Väärää positiivista toimitettu. Jokainen löydös varmennetaan käsin ja todistetaan; ei-ongelmat karsitaan, ei paisutella.'],
      ],
      findings: [
        ['~27 M€', 'Kassan tyhjennysreitti', 'Valtuutusvirhe avasi reitin tyhjentää ~27 M€:n omaisuuserä. Osoitettu toimivalla forkilla ja korjattu yhdessä tiimin kanssa.'],
        ['~16 M€', 'Yksittäinen vikapiste', 'Yksi avain hallitsi huomaamatta ~16 M€:n varoja ja likviditeettiä koko alustalla, täysi haltuunottoriski, näkymätön ulospäin.'],
        ['Haltuunotto', 'Roikkuva infrastruktuuri', 'Unohtunut, roikkuva aliverkkotunnus olisi kenen tahansa vallattavissa ja käytettävissä käyttäjien kalasteluun luotetun verkkotunnuksen turvin.'],
        ['Vuotavat avaimet', 'Näkyvillä tuotannossa', 'Vuotaneita API-avaimia julkaistussa koodissa, täydet source mapit tuotannossa ja julkisesti listattavissa oleva pilvisäilö käyttäjädataa. Hiljaisia vuotoja, joita kukaan ei vahdi.'],
      ],
      note: 'Anonymisoitu asiakasluottamuksen suojaamiseksi. En nimeä asiakasta enkä julkaise hyödynnettävää yksityiskohtaa. Juuri sitä pidättyväisyyttä palkkaat.',
    },
    cta: {
      title: 'Katso mitä järjestelmäsi paljastavat.',
      body: 'Aloita ilmaisella sähköpostisi tietoturvatarkistuksella, joka ei koske järjestelmiisi. Jos verkkotunnuksesi on väärennettävissä, tiedät sen minuuteissa, ja niin tietäisi hyökkääjäkin.',
      button: 'Pyydä ilmainen tarkistus',
    },
    footer: { tagline: 'Whitehat-tietoturvaa suomalaisille ja EU-yrityksille' },
    privacy: {
      title: 'Tietosuojaseloste',
      updated: 'Päivitetty: heinäkuu 2026',
      back: '← Takaisin etusivulle',
      intro: 'Näin Cyvard käsittelee henkilötietoja. Tämä on selkokielinen yhteenveto, ja se viimeistellään lakimiehen kanssa.',
      sections: [
        ['Kuka olemme', 'Cyvard (Anton Luoto) on rekisterinpitäjä. Yhteys: anton@cyvard.com. Cyvard tarjoaa valtuutettuja tietoturvatestauspalveluita yrityksille.'],
        ['Mitä keräämme', 'Tämä sivusto kerää mahdollisimman vähän tietoa. Jos lähetät meille sähköpostia tai pyydät tarkistusta, käsittelemme antamiasi yhteystietoja ja tietoja vain vastataksemme sinulle. Käytämme yksityisyyttä kunnioittavaa, evästeetöntä analytiikkaa emmekä käytä mainosseurantaa. Upotettu video ladataan YouTubesta yksityisyyttä suojaavassa tilassa, vain kun painat toistoa.'],
        ['Miksi käsittelemme', 'Vastataksemme yhteydenottoosi ja oikeutetun etumme perusteella tarjota olennaisia tietoturvapalveluita (GDPR 6 art. 1 f), tai suostumuksesi perusteella silloin kun sitä vaaditaan.'],
        ['Toimeksiantojen data', 'Maksullisen toimeksiannon aikana voimme käsitellä tietoja puolestasi käsittelijänä, erillisen tietojenkäsittelysopimuksen nojalla (GDPR 28 art.). Minimoimme pääsyn, emme koskaan vie oikeaa henkilötietoa ulos, ja poistamme toimeksiannon datan sovitun aikataulun mukaan.'],
        ['Säilytys', 'Säilytämme yhteydenottojen tietoja vain niin kauan kuin on tarpeen vastaamiseen ja perusteltuun jatkoyhteydenpitoon, minkä jälkeen poistamme ne.'],
        ['Oikeutesi', 'Voit pyytää pääsyä tietoihisi, niiden oikaisua tai poistoa, vastustaa käsittelyä ja pyytää tietojen siirtoa. Ota yhteyttä: anton@cyvard.com.'],
        ['Valvontaviranomainen', 'Jos katsot että käsittelemme tietojasi lainvastaisesti, voit tehdä valituksen Tietosuojavaltuutetun toimistolle.'],
      ],
    },
  },
} satisfies Record<Lang, unknown>
