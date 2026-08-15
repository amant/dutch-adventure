import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import ListeningLadder from '~/components/ListeningLadder.vue';
import { listeningLadderExercise, correctFeedback, resetLearnerMemory } from './helpers';
import type { Exercise } from '~/types/learning';

const clozeExercise: Exercise = {
  ...listeningLadderExercise,
  id: 'listening-cloze-test',
  kind: 'listening-cloze',
  listeningQuestion: undefined,
  listeningOptions: undefined,
  clozeData: {
    textWithGaps: 'Ik [..] naar huis.',
    answers: ['ga'],
  },
};

const hintedExercise: Exercise = {
  ...listeningLadderExercise,
  listeningQuestion: undefined,
  listeningOptions: undefined,
  wordHints: {
    goedemorgen: { meaning: 'Good morning', category: 'greeting' },
  },
};

const dialogueExercise: Exercise = {
  ...listeningLadderExercise,
  transcript: 'A: Goedemorgen.\nB: Hallo!',
};

const speakMock = vi.fn();
const cancelMock = vi.fn();
let lastUtterance: any;

describe('ListeningLadder', () => {
  beforeEach(() => {
    resetLearnerMemory();
    lastUtterance = undefined;
    speakMock.mockClear();
    cancelMock.mockClear();

    vi.stubGlobal('speechSynthesis', {
      cancel: cancelMock,
      speak: speakMock.mockImplementation((utterance: any) => {
        lastUtterance = utterance;
      }),
      getVoices: vi.fn(() => []),
    });
    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text = '';
      lang = '';
      rate = 1;
      pitch = 1;
      voice = null;
      onend: (() => void) | null = null;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the audio controls and the comprehension question', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: listeningLadderExercise } });

    expect(wrapper.find('input[type=range]').exists()).toBe(true);
    expect(wrapper.findAll('button').some(b => b.text().includes('Play Audio'))).toBe(true);
    expect(wrapper.text()).toContain('Wie spreekt er?');
    expect(wrapper.findAll('.option-button')).toHaveLength(2);
  });

  it('changes the speed hint and noise overlay with the difficulty level', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: listeningLadderExercise } });

    expect(wrapper.text()).toContain('Slow, clear speech.');
    expect(wrapper.find('.noise-overlay').exists()).toBe(false);

    await wrapper.find('input[type=range]').setValue('5');

    expect(wrapper.text()).toContain('Native-level speed. Good luck!');
    expect(wrapper.find('.noise-overlay').exists()).toBe(true);

    await wrapper.find('input[type=range]').setValue('3');

    expect(wrapper.text()).toContain('Normal learner speed.');
    expect(wrapper.find('.noise-overlay').exists()).toBe(false);
  });

  it('speaks the transcript through speech synthesis', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: listeningLadderExercise } });

    await wrapper.findAll('button').find(b => b.text().includes('Play Audio'))!.trigger('click');

    expect(cancelMock).toHaveBeenCalledTimes(1);
    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(lastUtterance.text).toBe('Goedemorgen, ik ben de docent.');
    expect(lastUtterance.lang).toBe('nl-NL');
  });

  it('speaks a dialogue line by line', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: dialogueExercise } });

    await wrapper.findAll('button').find(b => b.text().includes('Play Audio'))!.trigger('click');

    expect(speakMock).toHaveBeenCalledTimes(1);
    expect(lastUtterance.text).toBe('Goedemorgen.');

    // Simulate the first line finishing so the next line plays
    lastUtterance.onend?.();
    await nextTick();

    expect(speakMock).toHaveBeenCalledTimes(2);
    expect(lastUtterance.text).toBe('Hallo!');
    expect(lastUtterance.pitch).toBe(1.2);
  });

  it('emits submit with the selected comprehension option', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: listeningLadderExercise } });

    await wrapper.findAll('.option-button')[1].trigger('click');
    await wrapper.findAll('button').find(b => b.text() === 'Check Answer')!.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([{ answer: 'de student' }]);
  });

  it('toggles the transcript and shows word hints', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: hintedExercise } });

    await wrapper.findAll('button').find(b => b.text().includes('Show Transcript'))!.trigger('click');

    expect(wrapper.find('.transcript-box').exists()).toBe(true);
    expect(wrapper.text()).toContain('Goedemorgen, ik ben de docent.');

    await wrapper.findAll('.word.interactable')[0].trigger('click');

    expect(wrapper.find('.hint-popup').exists()).toBe(true);
    expect(wrapper.text()).toContain('Good morning');

    await wrapper.find('.close-btn').trigger('click');

    expect(wrapper.find('.hint-popup').exists()).toBe(false);
  });

  it('renders cloze gaps and submits the filled answers', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: clozeExercise } });

    const inputs = wrapper.findAll('input.cloze-input');
    expect(inputs).toHaveLength(1);

    await inputs[0].setValue('ga');
    await wrapper.findAll('button').find(b => b.text() === 'Check Transcription')!.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([{ clozeAnswers: ['ga'] }]);
  });

  it('emits next after a correct comprehension attempt', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: listeningLadderExercise } });

    await wrapper.findAll('.option-button')[0].trigger('click');
    await wrapper.findAll('button').find(b => b.text() === 'Check Answer')!.trigger('click');
    await wrapper.setProps({ feedback: correctFeedback });

    await wrapper.findAll('button').find(b => b.text() === 'Continue')!.trigger('click');

    expect(wrapper.emitted('next')).toHaveLength(1);
  });

  it('reveals shadowing after a correct comprehension attempt', async () => {
    const wrapper = await mountSuspended(ListeningLadder, { props: { exercise: listeningLadderExercise } });

    await wrapper.findAll('.option-button')[0].trigger('click');
    await wrapper.findAll('button').find(b => b.text() === 'Check Answer')!.trigger('click');
    await wrapper.setProps({ feedback: correctFeedback });

    expect(wrapper.find('.shadowing-promo').exists()).toBe(true);

    await wrapper.findAll('button').find(b => b.text() === 'Start Shadowing')!.trigger('click');

    expect(wrapper.find('.shadowing-area').exists()).toBe(true);
    expect(wrapper.text()).toContain('Shadowing Mode');
  });
});
