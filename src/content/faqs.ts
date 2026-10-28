/**
 * FAQ content. Answers describe the process only — no pricing, fees,
 * guaranteed outcomes or timelines. Add those once NIL confirms them.
 */

export type Faq = { q: string; a: string }

export const homeFaqs: Faq[] = [
  {
    q: 'What is NIL?',
    a: 'NIL is a sports partnership team. We connect student athletes and sports-focused social media creators with agencies running brand campaigns, and we review and match both sides by hand.',
  },
  {
    q: 'Who should use the athlete form?',
    a: 'Student athletes and creators whose content centers on sports. You’ll share your sport, your school or team if you have one, your social profiles and the kinds of partnerships you’re interested in.',
  },
  {
    q: 'Who should use the agency form?',
    a: 'Agencies and brand teams looking for athletes or sports creators for a campaign. Tell us your goals and the sports or athlete types you have in mind.',
  },
  {
    q: 'Is matching automatic?',
    a: 'No. Our team reviews submissions and proposes matches by hand. That takes longer than an instant algorithm, but it means every introduction has a reason behind it.',
  },
  {
    q: 'Is a deal guaranteed if I sign up?',
    a: 'No. Signing up puts you in front of our team, not into a guaranteed deal. We reach out when we see a genuine fit.',
  },
  {
    q: 'Is the information I submit public?',
    a: 'No. Form submissions go to the NIL team only and are never published on this website. Our privacy policy explains how information is handled.',
  },
]

export const agencyFaqs: Faq[] = [
  {
    q: 'How do you decide which athletes to propose?',
    a: 'We look at how an athlete’s sport, audience, content style and partnership interests line up with your campaign goals — not just the size of their following.',
  },
  {
    q: 'Where do the athletes come from?',
    a: 'From NIL’s private athlete database: student athletes and sports creators who applied to NIL directly and whose profiles our team has reviewed.',
  },
  {
    q: 'Is an athlete guaranteed to say yes?',
    a: 'No. Athletes decide which partnerships they accept, and availability depends on their season and schedule. We’ll tell you plainly when a fit isn’t available.',
  },
  {
    q: 'Can NIL help with campaign content?',
    a: 'Where a campaign calls for it, we can support athlete branding and short-form social content such as Instagram Reels. Tell us what you need in your request.',
  },
  {
    q: 'What happens after we submit the form?',
    a: 'Our team reviews your request and follows up by email to talk through goals, timing and deliverables before proposing any athletes.',
  },
]

export const athleteFaqs: Faq[] = [
  {
    q: 'Do I need a huge following?',
    a: 'Not necessarily. We look at fit — your sport, audience, content and interests — not just follower count. A person on our team reviews every profile.',
  },
  {
    q: 'Is my profile public?',
    a: 'No. Your submission goes to the NIL team and is kept in our private athlete database. It isn’t published on this website or shared publicly.',
  },
  {
    q: 'Am I guaranteed a deal?',
    a: 'No. Applying puts your profile in front of our team. We reach out when an agency campaign is a genuine fit for you.',
  },
  {
    q: 'Do I have to accept every opportunity?',
    a: 'No. You decide which partnerships to take. Nothing moves forward without your agreement.',
  },
  {
    q: 'What do you need from me?',
    a: 'Your name, email, sport and at least one social profile. School, team, position and a message are optional. This form never asks for passwords, ID documents or bank details.',
  },
]
