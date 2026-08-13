import type { LearnerMemory, SkillDimension } from '~/types/learning'

const storageKey = 'dutch-adventure-memory'
const emptyMemory = (): LearnerMemory => ({ recognition: 0, meaning: 0, production: 0, automaticity: 0 })

export function useLearnerMemory() {
  const memory = useState<LearnerMemory>('learner-memory', emptyMemory)
  const hydrated = useState('learner-memory-hydrated', () => false)

  function hydrate() {
    if (hydrated.value || !import.meta.client) return
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) ?? '')
      if (parsed && typeof parsed === 'object') {
        const fresh = emptyMemory()
        for (const skill of Object.keys(fresh) as SkillDimension[]) {
          if (typeof parsed[skill] === 'number' && Number.isFinite(parsed[skill])) fresh[skill] = Math.max(0, Math.min(100, parsed[skill]))
        }
        memory.value = fresh
      }
    } catch { /* Missing or malformed storage starts safely fresh. */ }
    hydrated.value = true
  }

  function record(skills: SkillDimension[], outcome: 'correct' | 'acceptable' | 'retry') {
    const change = outcome === 'correct' ? 12 : outcome === 'acceptable' ? 8 : 2
    const next = { ...memory.value }
    for (const skill of skills) next[skill] = Math.min(100, next[skill] + change)
    memory.value = next
    if (import.meta.client) localStorage.setItem(storageKey, JSON.stringify(next))
  }

  function reset() {
    memory.value = emptyMemory()
    if (import.meta.client) localStorage.removeItem(storageKey)
  }

  return { memory, hydrated, hydrate, record, reset }
}