<script setup lang="ts">
import { chapters } from '~/data/chapters'
import { useLearnerMemory } from '~/composables/useLearnerMemory'

const { memory, hydrate } = useLearnerMemory()
onMounted(hydrate)

const levels = ['A1', 'A2', 'B1', 'B2'] as const

const getConceptState = (type: 'vocabulary' | 'grammar', id: string) => {
  return memory.value[type][id]
}

const getMastery = (type: 'vocabulary' | 'grammar', id: string) => {
  const state = getConceptState(type, id)
  if (!state) return 0
  return (state.production + state.automaticity + state.speaking + state.recognition) / 4
}

const chapterData = computed(() => {
  return chapters.map(c => {
    const vocab = new Set<string>()
    const grammar = new Set<string>()
    c.stages.forEach(s => s.exercises.forEach(ex => {
      ex.vocabulary?.forEach(v => vocab.add(v))
      ex.grammar?.forEach(g => grammar.add(g))
    }))
    
    const vList = Array.from(vocab).map(v => ({ id: v, type: 'vocabulary' as const, mastery: getMastery('vocabulary', v) }))
    const gList = Array.from(grammar).map(g => ({ id: g, type: 'grammar' as const, mastery: getMastery('grammar', g) }))
    
    const totalMastery = [...vList, ...gList].reduce((acc, curr) => acc + curr.mastery, 0)
    const avgMastery = [...vList, ...gList].length > 0 ? totalMastery / [...vList, ...gList].length : 0

    return {
      ...c,
      concepts: [...vList, ...gList],
      avgMastery
    }
  })
})

const filteredChapters = (level: string) => chapterData.value.filter(c => c.level === level)

const activeConcept = ref<{ id: string, type: 'vocabulary' | 'grammar', level: string, chapterTitle: string } | null>(null)

const conceptRelations = computed(() => {
  if (!activeConcept.value) return []
  
  const relations: { fromChapter: string, toChapter: string }[] = []
  chapterData.value.forEach(c => {
    if (c.concepts.some(con => con.id === activeConcept.value?.id) && c.title !== activeConcept.value?.chapterTitle) {
      relations.push({ fromChapter: activeConcept.value!.chapterTitle, toChapter: c.title })
    }
  })
  return relations
})
</script>

<template>
  <div class="graph-page">
    <div class="hero">
      <div class="eyebrow">Language Graph</div>
      <h1>Your Dutch Network</h1>
      <p class="muted">Every concept you learn connects to another. Watch your network grow as you build capabilities.</p>
    </div>

    <div class="graph-container">
      <div v-for="level in levels" :key="level" class="level-column">
        <div class="level-header">
          <span class="level-tag">{{ level }}</span>
        </div>
        
        <div class="chapters-stack">
          <div v-for="chapter in filteredChapters(level)" :key="chapter.slug" class="chapter-node" :class="{ related: conceptRelations.some(r => r.toChapter === chapter.title) }">
            <div class="chapter-info">
              <h3>{{ chapter.title }}</h3>
              <div class="mastery-mini-bar">
                <div class="fill" :style="{ width: chapter.avgMastery + '%' }"></div>
              </div>
            </div>
            
            <div class="concept-cloud">
              <div 
                v-for="concept in chapter.concepts" 
                :key="concept.id"
                class="concept-dot"
                :class="[concept.type, { active: activeConcept?.id === concept.id, highlighted: activeConcept?.id === concept.id }]"
                :style="{ 
                  opacity: 0.3 + (concept.mastery / 100) * 0.7,
                  transform: `scale(${0.8 + (concept.mastery / 100) * 0.4})`
                }"
                @mouseenter="activeConcept = { ...concept, level, chapterTitle: chapter.title }"
                @mouseleave="activeConcept = null"
              >
                <div class="tooltip" v-if="activeConcept?.id === concept.id">
                  <strong>{{ concept.id }}</strong>
                  <span>{{ Math.round(concept.mastery) }}% mastered</span>
                  <div class="hits">Hits: {{ getConceptState(concept.type, concept.id)?.successes || 0 }} / {{ getConceptState(concept.type, concept.id)?.encounters || 0 }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item"><span class="dot vocabulary"></span> Vocabulary</div>
      <div class="legend-item"><span class="dot grammar"></span> Grammar</div>
      <div class="legend-item"><span class="dot-scale"></span> Mastery (Size/Opacity)</div>
    </div>
  </div>
</template>

<style scoped>
.graph-page { padding: 20px 0; }
.hero { margin-bottom: 60px; }

.graph-container {
  display: flex;
  gap: 40px;
  overflow-x: auto;
  padding-bottom: 40px;
  min-height: 600px;
}

.level-column {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.level-header {
  border-bottom: 2px solid #e1e5de;
  padding-bottom: 12px;
  margin-bottom: 10px;
}

.level-tag {
  background: #176b5b;
  color: white;
  padding: 4px 12px;
  border-radius: 99px;
  font-weight: 700;
  font-size: 14px;
}

.chapters-stack {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.chapter-node {
  background: white;
  border: 1px solid #e1e5de;
  border-radius: 16px;
  padding: 16px;
  position: relative;
  transition: all 0.3s;
}

.chapter-node:hover, .chapter-node.related {
  border-color: #176b5b;
  box-shadow: 0 10px 25px rgba(23, 107, 91, 0.05);
}

.chapter-node.related {
  background: #f0f7f4;
  transform: scale(1.02);
}

.chapter-info h3 {
  font-size: 16px;
  margin: 0 0 8px;
  color: #20302d;
}

.mastery-mini-bar {
  height: 4px;
  background: #f0f2f0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 15px;
}

.mastery-mini-bar .fill {
  height: 100%;
  background: #176b5b;
  transition: width 1s ease-out;
}

.concept-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.concept-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  cursor: help;
  transition: transform 0.2s;
}

.concept-dot.vocabulary { background: #176b5b; }
.concept-dot.grammar { background: #d06b3c; }

.concept-dot.highlighted {
  box-shadow: 0 0 0 2px white, 0 0 0 4px #176b5b;
  z-index: 5;
  opacity: 1 !important;
  transform: scale(1.3) !important;
}

.concept-dot:hover {
  transform: scale(1.5) !important;
  z-index: 10;
  opacity: 1 !important;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #20302d;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #20302d;
}

.tooltip strong { font-size: 13px; }
.tooltip .hits { font-size: 10px; opacity: 0.7; }

.legend {
  margin-top: 60px;
  display: flex;
  gap: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e1e5de;
  width: fit-content;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #52645f;
}

.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot.vocabulary { background: #176b5b; }
.dot.grammar { background: #d06b3c; }
.dot-scale { 
  width: 14px; height: 14px; border-radius: 50%; 
  background: linear-gradient(135deg, #eee, #999);
}

@media (max-width: 900px) {
  .graph-container {
    flex-direction: column;
  }
  .level-column {
    min-width: 0;
  }
}
</style>
