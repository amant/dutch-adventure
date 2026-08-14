export interface DiffPart {
  value: string
  type: 'added' | 'removed' | 'same'
}

export function diffStrings(oldStr: string = '', newStr: string = ''): DiffPart[] {
  const oldWords = (oldStr || '').split(/(\s+)/)
  const newWords = (newStr || '').split(/(\s+)/)
  
  // Very simple word-based diff for pedagogical purposes
  // A real diff algorithm (like Myers) would be better, but this is a start
  // Let's use a simple heuristic: if words match, same. 
  // If not, show old as removed and new as added.
  
  const result: DiffPart[] = []
  let i = 0
  let j = 0
  
  while (i < oldWords.length || j < newWords.length) {
    if (i < oldWords.length && j < newWords.length && oldWords[i].toLowerCase() === newWords[j].toLowerCase()) {
      result.push({ value: oldWords[i], type: 'same' })
      i++
      j++
    } else {
      if (i < oldWords.length) {
        result.push({ value: oldWords[i], type: 'removed' })
        i++
      }
      if (j < newWords.length) {
        result.push({ value: newWords[j], type: 'added' })
        j++
      }
    }
  }
  
  return result
}
