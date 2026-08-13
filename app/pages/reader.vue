<script setup lang="ts">
const inputText = ref('')
const analyzedText = ref('')

function analyze() {
  if (inputText.value.trim()) {
    analyzedText.value = inputText.value
  }
}

function reset() {
  analyzedText.value = ''
  inputText.value = ''
}
</script>

<template>
  <div class="reader-container">
    <header class="page-header">
      <div class="eyebrow">Stage 11 — Reading as Real Dutch</div>
      <h1>Custom Reader</h1>
      <p class="muted">Paste any Dutch text below. We'll highlight words based on your current knowledge and help you identify "frontier" vocabulary to activate.</p>
    </header>

    <div v-if="!analyzedText" class="input-view card">
      <textarea 
        v-model="inputText" 
        placeholder="Paste your Dutch text here (news articles, emails, stories...)" 
        rows="12"
        class="reader-input"
      ></textarea>
      <div class="actions">
        <button class="button" :disabled="!inputText.trim()" @click="analyze">
          Analyze Text
        </button>
      </div>
    </div>

    <div v-else class="analysis-view">
      <div class="view-header">
        <button class="button secondary small" @click="reset">← New Text</button>
      </div>
      <TextAnalyzer :text="analyzedText" />
    </div>

    <aside class="reader-tips card">
      <h4>How to use the Reader</h4>
      <ul>
        <li><strong>Interact:</strong> Click on any word to see its meaning or status.</li>
        <li><strong>Activate:</strong> Words highlighted in <span class="frontier-text">orange</span> are concepts you recognize but haven't used yet. Try to use them in your next Mission!</li>
        <li><strong>Exposure:</strong> Every time you interact with a word, we record an encounter in your Language Graph.</li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.reader-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  margin-bottom: 40px;
}

.reader-input {
  width: 100%;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  margin-bottom: 20px;
  resize: vertical;
}

.reader-input:focus {
  outline: none;
  border-color: #176b5b;
  box-shadow: 0 0 0 3px rgba(23, 107, 91, 0.1);
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
  background: #f8fafc;
}

.reader-tips h4 {
  margin-bottom: 12px;
}

.reader-tips ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reader-tips li {
  font-size: 14px;
  color: #475569;
}

.frontier-text {
  color: #b45309;
  font-weight: 700;
  border-bottom: 2px solid #f59e0b;
}
</style>
