<script setup lang="ts">
const inputText = ref('');
const analyzedText = ref('');

function analyze() {
  if (inputText.value.trim()) {
    analyzedText.value = inputText.value;
  }
}

function reset() {
  analyzedText.value = '';
  inputText.value = '';
}
</script>

<template>
  <div class="reader-container">
    <header class="page-header">
      <div class="eyebrow gold">
        AUTHENTIC TEXT EXPLORER
      </div>
      <h1>Custom Dutch Reader</h1>
      <p class="muted">
        Paste any Dutch text below (news, articles, stories, emails). We'll highlight words based on your current knowledge log and identify frontier vocabulary to activate.
      </p>
    </header>

    <div
      v-if="!analyzedText"
      class="input-view card"
    >
      <textarea
        v-model="inputText"
        placeholder="Paste your Dutch text here (news articles, emails, stories, podcasts transcripts...)"
        rows="10"
        class="reader-input"
      />
      <div class="actions">
        <button
          class="button gold large"
          :disabled="!inputText.trim()"
          @click="analyze"
        >
          <span>⚡ Analyze & Decode Text</span>
        </button>
      </div>
    </div>

    <div
      v-else
      class="analysis-view"
    >
      <div class="view-header">
        <button
          class="button secondary small"
          @click="reset"
        >
          ← Enter New Text
        </button>
      </div>
      <TextAnalyzer :text="analyzedText" />
    </div>

    <aside class="reader-tips card">
      <h4>How to Navigate the Reader</h4>
      <ul>
        <li><strong>Interact:</strong> Click on any word to inspect its meaning or mastery status.</li>
        <li><strong>Activate:</strong> Words highlighted in <span class="frontier-text">gold</span> are concepts you recognize but haven't actively produced yet. Try using them in your next Mission!</li>
        <li><strong>Exposure:</strong> Every time you interact with a word, an encounter is recorded in your Language Graph.</li>
      </ul>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.reader-container {
  max-width: 860px;
  margin: 0 auto;
  padding: 20px 0 60px;
}

.page-header {
  margin-bottom: 36px;
}

.input-view {
  padding: 32px;
  background: $white-pure;
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  box-shadow: $shadow-card;
}

.reader-input {
  width: 100%;
  padding: 20px;
  border: 1.5px solid #cbd5e1;
  border-radius: $radius-lg;
  font-size: 16px;
  font-family: inherit;
  margin-bottom: 20px;
  resize: vertical;
  line-height: 1.6;

  &:focus {
    outline: none;
    border-color: $ocean-vibrant;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.18);
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.view-header {
  margin-bottom: 20px;
}

.reader-tips {
  margin-top: 40px;
  background: linear-gradient(135deg, $white-pure 0%, $ocean-ice 100%);
  border: 1.5px solid $ocean-border;
  border-radius: $radius-xl;
  padding: 28px;

  h4 {
    margin-bottom: 14px;
    font-family: $font-anime;
    font-size: 16px;
    font-weight: 800;
    color: $ocean-deepest;
  }

  ul {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0;
  }

  li {
    font-size: 14px;
    color: $ink-slate;
    line-height: 1.6;
  }
}

.frontier-text {
  color: $gold-deep;
  font-weight: 800;
  border-bottom: 2px solid $gold-bright;
}
</style>
