/**
 * Homepage copy used by the design concepts in /mockups. It matches the live
 * homepage (src/app/page.tsx) and the original homepage (/mockups/original-home),
 * so every concept tells the same story. When a concept is adopted, the
 * homepage should read its copy from here.
 *
 * Same rules as the rest of the site: no invented stats, partners, athletes,
 * testimonials, prices or timelines.
 */

export type Point = { title: string; body: string }

export const hero = {
  eyebrow: 'Athlete-powered campaigns',
  lines: ['Real athletes.', 'Real content.', 'Real fit.'],
  intro:
    'We pair agencies with student athletes and sports creators, hand-picked by our team, and help produce the short-form content that carries your campaign.',
  points: [
    'Athletes hand-picked from our private database',
    'Matched on sport, audience and style, not follower count alone',
    'Content support for Instagram Reels and short-form video',
    'A real person reviewing every request',
  ],
  note: 'Two separate signups. One team reviewing both.',
}

export const mission = {
  eyebrow: 'Why Real NIL Agency',
  /** Reads as one sentence: "where game meets brand, and people make the call." */
  statement: { game: 'game', brand: 'brand', people: 'people' },
  body: 'Real NIL Agency connects student athletes and sports creators with agencies running brand campaigns. Our team reviews every athlete profile and every agency request, so every introduction has a reason behind it.',
}

export const whatWeDo = {
  eyebrow: 'What we do',
  title: 'Hand-matched, not mass-matched.',
  intro:
    'No algorithm firing off hundreds of offers. A team that reads every request and every profile, then makes introductions that make sense.',
}

export const sides = {
  title: 'Pick your side.',
  intro:
    'Real NIL Agency works with both sides of every partnership. Choose the path that fits you. Each has its own signup and its own process.',
  agency: {
    eyebrow: 'For agencies & brands',
    title: 'Campaigns built on fit, not guesswork.',
    altTitle: 'Brief us once. Meet athletes who fit.',
    steps: [
      'Tell us the goal, the sports and the audience',
      'Get a shortlist our team picked for your campaign',
      'Approve the athletes you want to work with',
      'Launch, with content support where you need it',
    ],
    points: [
      'Your request reviewed by our team',
      'Athletes proposed from our private database',
      'Fit weighed over follower count',
      'Help with athlete content where you need it',
    ],
    moreHref: '/agencies',
    moreLabel: 'How it works for agencies',
  },
  athlete: {
    eyebrow: 'For athletes & creators',
    title: 'Opportunities that actually fit you.',
    altTitle: 'Turn your game into partnerships that fit.',
    steps: [
      'Apply once. It takes a couple of minutes',
      'Get your profile reviewed by a real person',
      'Hear from us when a campaign fits you',
      'Say yes only to what you want',
    ],
    points: [
      'Your profile reviewed by a real person',
      'Considered for campaigns that suit your sport and audience',
      'Support with branding and short-form content',
      'You choose which opportunities to take',
    ],
    moreHref: '/athletes',
    moreLabel: 'How it works for athletes',
  },
}

export const reasons = {
  eyebrow: 'For brands',
  title: 'Why brands team up with athletes.',
  items: [
    { title: 'Built-in trust', body: 'Fans follow athletes for who they are. The right partnership borrows that credibility.' },
    {
      title: 'Stories, not ads',
      body: 'Training, game day, the grind. Athletes have stories that make branded content feel real.',
    },
    {
      title: 'Communities that show up',
      body: 'Teams, schools and hometowns rally around their athletes, and notice who backs them.',
    },
    {
      title: 'Content you can track',
      body: 'Social content leaves a trail of views, saves and clicks on the platforms you already use.',
    },
  ] satisfies Point[],
}

export const playbook = {
  eyebrow: 'How it works',
  title: 'Every match is drawn up by hand.',
  intro: 'No instant algorithm, no mass inbox. Here’s what actually happens between signing up and going live.',
  steps: [
    {
      title: 'Sign up',
      body: 'Athletes and agencies each use their own short form. No passwords, no sensitive documents.',
    },
    {
      title: 'We review',
      body: 'Our team reads every athlete profile and every agency request. Athlete profiles are kept in our private database.',
    },
    {
      title: 'We match',
      body: 'When a campaign comes in, we look for athletes whose sport, audience and style suit it, and propose them.',
    },
    {
      title: 'You activate',
      body: 'Once both sides agree, the campaign goes live. Where it helps, we support branding and content like Reels.',
    },
  ] satisfies Point[],
  timingNote:
    'Matching is done by people, so it isn’t instant. Timing depends on each campaign and on athlete availability. We’ll keep you posted rather than promise a date we can’t control.',
}

export const commitments = {
  eyebrow: 'Straight talk',
  title: 'What you can count on.',
  intro: 'Clear expectations on both sides make for better partnerships.',
  items: [
    {
      title: 'People review every submission',
      body: 'No auto-accept, no bulk outreach. A person on our team reads each athlete profile and agency request.',
    },
    {
      title: 'Your details stay private',
      body: 'Submissions go to our team only. We never publish athlete profiles or agency requests on this site.',
    },
    {
      title: 'You decide',
      body: 'Athletes and agencies choose which partnerships move forward. Nothing goes ahead without your agreement.',
    },
    {
      title: 'No guaranteed deals',
      body: 'Not every profile or request leads to a match, and we won’t pretend otherwise. We reach out when the fit is real.',
    },
  ] satisfies Point[],
}

export const contentSupport = {
  eyebrow: 'Content support',
  title: 'Content that lands.',
  intro:
    'A strong match still needs strong content. Where a campaign calls for it, Real NIL Agency can help athletes sharpen their personal brand and create short-form social content like Instagram Reels.',
  items: [
    { title: 'Personal brand', body: 'Bio, visuals and voice that feel like you, and read clearly to brands.' },
    { title: 'Short-form video', body: 'Reels concepts and content support shaped around the campaign.' },
    { title: 'On-brief', body: 'Content built around what the agency actually asked for.' },
  ] satisfies Point[],
}

export const proof = {
  partnersTitle: 'Brands, agencies & press',
  partnersPlaceholder:
    'Placeholder: add real partner logos and press mentions in src/content/proof.ts once they exist and you have permission.',
  workEyebrow: 'The work',
  workTitle: 'Made with athletes.',
  workPlaceholder: 'Placeholder: add published campaign posts in src/content/proof.ts once you have permission to share them.',
}

export const closing = {
  title: 'Ready to make a play?',
  body: 'Two short signups, one team reviewing both. Pick your side, or talk to us first.',
  contactLabel: 'Talk to our team',
}

export const footer = {
  blurb: 'Student athletes and sports creators, matched with agencies by people who review every profile and every request.',
  signoff: 'Matched by people, not algorithms.',
}
