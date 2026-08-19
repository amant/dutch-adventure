<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  userText: string;
  targetVocabulary?: string[];
  targetGrammar?: string[];
  frontierConcepts?: { key: string; kind: string }[];
}>();

const grammarLabels: Record<string, string> = {
  'adjective-inflection': 'bijvoeglijke naamwoordsvorming',
  'causality': 'causaliteit',
  'comparatives': 'vergelijkingen',
  'conditional': 'voorwaardelijke wijs',
  'conditional-past': 'verleden voorwaardelijke wijs',
  'connectors': 'verbindingswoorden',
  'correlative-structures': 'correlatieve structuren',
  'formal-register': 'formeel register',
  'formal-v-informal': 'formeel versus informeel',
  'future tense': 'toekomende tijd',
  'imperative': 'gebiedende wijs',
  'indirect-questions': 'indirecte vragen',
  'inversion': 'inversie',
  'modal-verbs': 'modale werkwoorden',
  'negation': 'ontkenning',
  'nominalisation': 'nominalisatie',
  'passive-voice': 'lijdende vorm',
  'past-perfect': 'voltooid verleden tijd',
  'past-tense': 'verleden tijd',
  'past-tense-ovt': 'onvoltooid verleden tijd',
  'perfect-tense': 'voltooide tijd',
  'polite-requests': 'beleefde verzoeken',
  'prepositions': 'voorzetsels',
  'prepositions-of-time': 'voorzetsels van tijd',
  'pronominal-adverbs': 'voornaamwoordelijke bijwoorden',
  'quantities': 'hoeveelheden',
  'questions': 'vragen',
  'reflexive-verbs': 'wederkerende werkwoorden',
  'semi-auxiliary-verbs': 'semi-hulpwerkwoorden',
  'separable-verbs': 'scheidbare werkwoorden',
  'subordinate clauses': 'bijzinnen',
  'subordinate-clauses': 'bijzinnen',
  'time-clauses': 'tijdsbepalende bijzinnen',
  'want-clause': 'want-bijzin',
  'word-order': 'woordvolgorde',
};

const displayLabel = (label: string) => grammarLabels[label] || label;

const isUsed = (concept: string) => {
  const normalized = props.userText.toLowerCase();
  return normalized.includes(concept.toLowerCase());
};

const allTargets = computed(() => {
  const items: { label: string; kind: 'vocabulary' | 'grammar' | 'frontier'; isUsed: boolean }[] = [];

  props.targetVocabulary?.forEach(v => items.push({ label: v, kind: 'vocabulary', isUsed: isUsed(v) }));
  props.targetGrammar?.forEach(g => items.push({ label: displayLabel(g), kind: 'grammar', isUsed: isUsed(g) }));
  props.frontierConcepts?.forEach((f) => {
    // Avoid duplicates if a frontier concept is already a target
    if (!items.some(i => i.label.toLowerCase() === f.key.toLowerCase())) {
      items.push({ label: f.key, kind: 'frontier', isUsed: isUsed(f.key) });
    }
  });

  return items;
});
</script>

<template>
  <div
    v-if="allTargets.length > 0"
    class="smart-palette"
  >
    <div class="palette-header">
      <span class="p-title">Bouwstenen</span>
      <span class="p-count">{{ allTargets.filter(t => t.isUsed).length }} / {{ allTargets.length }} gebruikt</span>
    </div>

    <div class="palette-chips">
      <div
        v-for="item in allTargets"
        :key="item.label"
        class="chip"
        :class="[item.kind, { used: item.isUsed }]"
      >
        <span class="status-dot" />
        <span class="label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.smart-palette {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.palette-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.p-title {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.05em;
}

.p-count {
  font-size: 12px;
  font-weight: 600;
  color: #176b5b;
}

.palette-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e1;
  transition: background 0.3s ease;
}

.chip.used {
  border-color: #176b5b;
  background: #e8f3ec;
  color: #176b5b;
}

.chip.used .status-dot {
  background: #176b5b;
  box-shadow: 0 0 8px rgba(23, 107, 91, 0.4);
}

.chip.grammar {
  border-style: dashed;
}

.chip.frontier {
  border-color: #d06b3c33;
}

.chip.frontier.used {
  border-color: #d06b3c;
  background: #fef1e8;
  color: #d06b3c;
}

.chip.frontier.used .status-dot {
  background: #d06b3c;
}
</style>
