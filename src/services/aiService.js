/**
 * LUMINA AI Style Consultant
 *
 * DEVELOPMENT: Intelligent mock responses tuned for interior design.
 *
 * PRODUCTION:
 * 1. Add VITE_ANTHROPIC_API_KEY=your_key to .env
 * 2. Uncomment callAnthropicAPI below
 * 3. Replace getMockResponse calls with callAnthropicAPI
 */

// ─── PRODUCTION API (uncomment to activate) ──────────────────────────────────
// async function callAnthropicAPI(messages) {
//   const res = await fetch('https://api.anthropic.com/v1/messages', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
//       'anthropic-version': '2023-06-01',
//     },
//     body: JSON.stringify({
//       model: import.meta.env.VITE_AI_MODEL || 'claude-3-5-haiku-20241022',
//       max_tokens: 350,
//       system: `You are LUMINA's AI design consultant for a luxury interior design studio in Mumbai.
// You help prospective clients discover their design language and articulate their vision.
// Tone: Warm, perceptive, quietly authoritative. Like a world-class designer in a first meeting.
// Ask one powerful question per response. Reference specific design styles, materials, and moods.
// Keep responses to 3-4 sentences. Never use bullet points or lists.`,
//       messages,
//     }),
//   })
//   const data = await res.json()
//   if (!res.ok) throw new Error(data.error?.message || 'API error')
//   return data.content[0].text
// }
// ─────────────────────────────────────────────────────────────────────────────

const INTENTS = {
  japandi: {
    k: ['japandi', 'japanese', 'scandinavian', 'minimal', 'minimalist', 'zen', 'wabi'],
    r: [
      "Japandi is one of the most misunderstood aesthetics — people confuse it with empty. The rooms that work are the ones where every object has been earned. What's the one thing in your current space that you never want to live without? That tells me more about your version of Japandi than any mood board.",
      "There's a difference between minimal and considered. Japandi at its best is intensely intentional — smoked oak, handmade ceramics, linen that's been washed a hundred times. Are you drawn to the Japanese side of that — the asymmetry, the imperfection — or the Scandinavian warmth?",
    ]
  },
  luxury: {
    k: ['luxury', 'opulent', 'grand', 'rich', 'premium', 'high-end', 'bespoke', 'custom'],
    r: [
      "Luxury in interiors is the most misused word in the industry. The spaces that genuinely feel luxurious are the ones where time and materiality have been treated as seriously as aesthetics. When you imagine your most luxurious version of this room, what does it feel like at 8am on a slow Sunday morning?",
      "True luxury is the absence of compromise — not the presence of expense. We've designed ₹3Cr rooms that felt provincial and ₹80L rooms that felt genuinely exceptional. What's the one experience in another space — a hotel, a friend's home, a restaurant — that made you feel the way you want to feel in yours?",
    ]
  },
  biophilic: {
    k: ['biophilic', 'nature', 'plants', 'green', 'natural', 'organic', 'earthy', 'botanical'],
    r: [
      "Biophilic design is more than plants on shelves — at its depth, it's about how light moves through a space across a day, how the room smells after rain, the texture of surfaces that connect us to natural materials. How much does natural light play into what you're imagining?",
      "The best biophilic interiors we've done weren't consciously 'green' — they were rooms that breathed. Limewash plaster, raw stone, aged timber, a skylight positioned to catch the afternoon. Tell me about the outdoor spaces you love most. That's usually where we find your interior.",
    ]
  },
  artdeco: {
    k: ['art deco', 'deco', 'gatsby', 'gold', 'glamour', 'geometric', 'bold', 'dramatic'],
    r: [
      "Art Deco in India has its own incredible lineage — look at South Bombay, the old cinema houses, the Warden Road apartment buildings. There's a version of this that feels genuinely rooted and one that feels like a theme park. Which end of that spectrum are you on?",
      "The thing about rooms with real drama is that they need contrast to work. A deeply geometric ceiling reads best against an almost empty floor. Where is this space — and what's the light like? That dictates everything about how far we can push the drama.",
    ]
  },
  bedroom: {
    k: ['bedroom', 'master', 'suite', 'sleep', 'bed', 'wardrobe', 'dressing'],
    r: [
      "A master suite is the room we're most private about — and usually the one that gets the least design attention. What's the first thing you do when you wake up, and the last before you sleep? Those two moments should shape every decision in that room.",
      "The bedroom we've designed that our clients talk about most isn't the grandest — it's the one where the morning light was considered so precisely that you wake up before your alarm. What time does the sun enter your space, and do you love it or hate it?",
    ]
  },
  living: {
    k: ['living room', 'drawing room', 'lounge', 'sitting', 'living space', 'living area'],
    r: [
      "A living room has to hold more emotional weight than any other space — it's where you entertain, recover, connect, and decompress. Often at the same time. Does your version lean more toward a room for gathering, or a room for being alone well?",
      "The most successful living rooms we've done have one unapologetic focal point — it might be an artwork, a fireplace, or a 4m sofa — and everything else plays a supporting role. What's the thing you want people to notice first when they walk in?",
    ]
  },
  kitchen: {
    k: ['kitchen', 'cook', 'dining', 'pantry', 'island', 'cabinet'],
    r: [
      "Kitchens are the most functional rooms in a house, and therefore the ones where great design is most quietly felt. Do you cook daily and need the space to be genuinely ergonomic — or is this more of an aesthetic kitchen that needs to look extraordinary while functioning as a backdrop?",
      "We have a strong point of view on kitchen design: the best ones feel like they grew with the house, not that they were installed. What's your relationship with cooking — and with the people who cook with you? That changes everything about how we approach the layout.",
    ]
  },
  office: {
    k: ['office', 'workspace', 'corporate', 'commercial', 'studio', 'headquarters', 'coworking'],
    r: [
      "Commercial spaces have a brief that domestic ones don't — they need to communicate something to people who've never met the people who built them. What does this office need to make a visitor feel in the first 90 seconds?",
      "We've found that the offices with the strongest cultures are the ones where the physical environment was designed to reinforce a specific set of behaviours — not just values. What's the one thing you want your team to do more of? I want to design for that.",
    ]
  },
  hotel: {
    k: ['hotel', 'boutique', 'hospitality', 'resort', 'villa', 'property', 'guesthouse'],
    r: [
      "Hospitality design is about creating a feeling that persists beyond the stay — the best hotel rooms we've done are the ones guests reference years later when they're trying to describe a mood they want in their own home. What's the feeling you want guests to carry with them when they leave?",
      "There's a version of boutique hospitality that's about distinctiveness — every room tells a different story — and one that's about deep consistency. Which model are you drawn to, and how much does the location or local culture factor into your brief?",
    ]
  },
  general: [
    "Before we talk about what a space should look like, I want to understand how you move through it. Tell me about the moment in your day when you most feel at home — wherever that currently is. That's usually our starting point.",
    "The projects that end up being truly exceptional start with clients who know what they want to feel, not what they want to see. What's the emotional experience you're designing toward — and what does your current space fail to give you?",
    "Interiors are the only art form you actually live inside. When you imagine this project finished — not a photograph of it, but the experience of being in it — what's the first thing you notice? The light? The quiet? The materials underfoot?",
    "I always ask clients the same question early on: describe a space you've been in — a hotel room, a friend's house, a restaurant — that made you feel the way you want to feel in this space. What comes to mind?",
    "There's a brave version of every project and a cautious one. Both can be beautiful. But the ones we're most proud of started with clients who chose brave. What would the brave version of your space look like?",
  ]
}

function getMockResponse(userMessage, convLength) {
  if (convLength === 0) {
    return "Welcome to LUMINA. I'm here to help you discover your design language before your first conversation with our team. Tell me about the space you're imagining — not how it looks, but how you want it to feel."
  }

  const msg = userMessage.toLowerCase()

  for (const [, data] of Object.entries(INTENTS)) {
    if (data === INTENTS.general) continue
    if (data.k.some(kw => msg.includes(kw))) {
      return data.r[Math.floor(Math.random() * data.r.length)]
    }
  }

  if (msg.includes('budget') || msg.includes('cost') || msg.includes('price') || msg.includes('expensive')) {
    return "Budget is a tool, not a ceiling — what matters is how it's allocated. We've seen ₹2Cr spent on the wrong things and ₹60L spent with absolute precision. The most useful thing I can tell you is this: spend the most on what you touch and see every day. What are those surfaces in your space?"
  }
  if (msg.includes('timeline') || msg.includes('how long') || msg.includes('months') || msg.includes('when')) {
    return "A full residential project typically runs 10–18 months from brief to handover — but the phases people remember aren't the build. They're the discovery conversations and the concept presentation. Those happen in the first 4–6 weeks. What's driving your timeline? That helps us understand how to structure the engagement."
  }
  if (msg.includes('portfolio') || msg.includes('example') || msg.includes('work') || msg.includes('projects')) {
    return "You can scroll through our portfolio above — but a portfolio tells you what we've made, not how we think. The most relevant question is whether our sensibility matches yours. Pick a project you've seen that resonates and tell me what specifically speaks to you. Is it the materiality? The restraint? The drama? That conversation is more useful than any case study."
  }
  if (msg.includes('meet') || msg.includes('consultation') || msg.includes('talk') || msg.includes('call') || msg.includes('contact')) {
    return "A discovery call with Anika typically runs 45 minutes — no brief required, no obligation. We talk about your space, your life in it, and whether we're the right fit for each other. To move forward, use the enquiry form below and we'll reach out within 24 hours to schedule."
  }

  const g = INTENTS.general
  return g[Math.floor(Math.random() * g.length)]
}

export async function sendBriefMessage(messages) {
  await new Promise(r => setTimeout(r, 900 + Math.random() * 1100))
  const userMsgs = messages.filter(m => m.role === 'user')
  const last = userMsgs[userMsgs.length - 1]?.content || ''
  return getMockResponse(last, userMsgs.length - 1)
}

export async function getOpeningGreeting() {
  await new Promise(r => setTimeout(r, 550))
  return getMockResponse('', 0)
}
