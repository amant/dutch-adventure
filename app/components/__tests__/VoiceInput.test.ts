import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import VoiceInput from '~/components/VoiceInput.vue';

interface TranscriptResult {
  isFinal: boolean;
  [index: number]: { transcript: string } | undefined;
}

interface ResultEvent {
  results: TranscriptResult[];
}

interface FakeRecognition {
  lang: string;
  continuous: unknown;
  interimResults: unknown;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: ResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  abort: ReturnType<typeof vi.fn>;
}

let capturedRecognition: FakeRecognition | undefined;

function createFakeRecognition(): FakeRecognition {
  const rec: FakeRecognition = {
    lang: '',
    continuous: undefined,
    interimResults: undefined,
    onstart: null,
    onend: null,
    onresult: null,
    onerror: null,
    start: vi.fn(() => rec.onstart?.()),
    stop: vi.fn(() => rec.onend?.()),
    abort: vi.fn(),
  };
  capturedRecognition = rec;
  return rec;
}

describe('VoiceInput', () => {
  beforeEach(() => {
    capturedRecognition = undefined;
    vi.stubGlobal('SpeechRecognition', createFakeRecognition);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the mic button and starts recognition on click', async () => {
    const wrapper = await mountSuspended(VoiceInput);

    expect(wrapper.find('.mic-button').exists()).toBe(true);
    expect(capturedRecognition).toBeDefined();
    expect(capturedRecognition!.lang).toBe('nl-NL');

    await wrapper.find('.mic-button').trigger('click');

    expect(capturedRecognition!.start).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('start')).toHaveLength(1);
    expect(wrapper.find('.mic-button.listening').exists()).toBe(true);
  });

  it('emits result, update:modelValue and submit with the spoken transcript', async () => {
    const wrapper = await mountSuspended(VoiceInput, { props: { modelValue: '' } });

    await wrapper.find('.mic-button').trigger('click');
    capturedRecognition!.onresult({ results: [{ 0: { transcript: 'Hallo daar' }, isFinal: true, length: 1 }] });
    await wrapper.find('.mic-button').trigger('click');
    await nextTick();

    expect(wrapper.emitted('result')?.[0]).toEqual(['Hallo daar']);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hallo daar']);
    expect(wrapper.emitted('submit')?.[0]).toEqual(['Hallo daar']);
  });

  it('joins multiple final result segments into one transcript', async () => {
    const wrapper = await mountSuspended(VoiceInput);

    await wrapper.find('.mic-button').trigger('click');
    capturedRecognition!.onresult({
      results: [
        { 0: { transcript: 'Ik woon' }, isFinal: true, length: 1 },
        { 0: { transcript: 'in Amsterdam' }, isFinal: true, length: 1 },
      ],
    });
    await wrapper.find('.mic-button').trigger('click');
    await nextTick();

    expect(wrapper.emitted('result')?.[0]).toEqual(['Ik woon in Amsterdam']);
  });

  it('ignores non-final result segments', async () => {
    const wrapper = await mountSuspended(VoiceInput);

    await wrapper.find('.mic-button').trigger('click');
    capturedRecognition!.onresult({ results: [{ 0: { transcript: 'tussenresultaat' }, isFinal: false, length: 1 }] });
    await nextTick();

    // Non-final (interim) results are shown live but never submitted.
    expect(wrapper.find('.voice-interim').text()).toContain('tussenresultaat');
    expect(wrapper.emitted('result')).toBeUndefined();
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('stops listening when the active mic is clicked', async () => {
    const wrapper = await mountSuspended(VoiceInput);

    await wrapper.find('.mic-button').trigger('click');
    await wrapper.find('.mic-button').trigger('click');

    expect(capturedRecognition!.stop).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('stop')).toHaveLength(1);
    expect(wrapper.find('.mic-button.listening').exists()).toBe(false);
  });

  it('recreates the recognition session after it ends', async () => {
    const wrapper = await mountSuspended(VoiceInput);

    await wrapper.find('.mic-button').trigger('click');
    const firstSession = capturedRecognition;
    capturedRecognition!.onend();
    await nextTick();

    await wrapper.find('.mic-button').trigger('click');
    expect(capturedRecognition).not.toBe(firstSession);
    expect(capturedRecognition!.start).toHaveBeenCalledTimes(1);
  });

  it('shows a visible error when microphone permission is denied', async () => {
    const wrapper = await mountSuspended(VoiceInput);

    await wrapper.find('.mic-button').trigger('click');
    capturedRecognition!.onerror({ error: 'not-allowed' });
    await nextTick();

    expect(wrapper.emitted('error')?.[0]).toEqual(['not-allowed']);
    expect(wrapper.find('.voice-error').exists()).toBe(true);
    expect(wrapper.text()).toContain('Microphone access denied');
    expect(wrapper.find('.mic-button.listening').exists()).toBe(false);
  });

  it('renders a disabled button when speech recognition is unsupported', async () => {
    vi.unstubAllGlobals();

    const wrapper = await mountSuspended(VoiceInput);

    expect(wrapper.find('.mic-button-disabled').exists()).toBe(true);
    expect(wrapper.find('.mic-button').attributes('disabled')).toBeDefined();
  });

  it('applies the active class when the active prop is set', async () => {
    const wrapper = await mountSuspended(VoiceInput, { props: { active: true } });

    expect(wrapper.find('.mic-button.active').exists()).toBe(true);
  });

  it('shows the recorded transcript and its English translation', async () => {
    const wrapper = await mountSuspended(VoiceInput);

    await wrapper.find('.mic-button').trigger('click');
    capturedRecognition!.onresult({ results: [{ 0: { transcript: 'Ik en je' }, isFinal: true, length: 1 }] });
    capturedRecognition!.onend();
    await nextTick();

    expect(wrapper.find('.voice-transcript').text()).toBe('Ik en je');
    expect(wrapper.findAll('.gloss-nl').map(w => w.text())).toEqual(['Ik', 'en', 'je']);
    expect(wrapper.findAll('.gloss-en').map(w => w.text())).toEqual(['I', 'and', 'you']);
  });

  it('keeps listening across pauses and accumulates results until stopped', async () => {
    const wrapper = await mountSuspended(VoiceInput);

    await wrapper.find('.mic-button').trigger('click');
    capturedRecognition!.onresult({ results: [{ 0: { transcript: 'Ik woon' }, isFinal: true, length: 1 }] });
    await nextTick();

    // Still listening after the first utterance; nothing is submitted yet.
    expect(wrapper.emitted('result')).toBeUndefined();
    expect(capturedRecognition!.start).toHaveBeenCalledTimes(1);
    expect(capturedRecognition!.stop).not.toHaveBeenCalled();

    // A second utterance arrives after a pause (results list is cumulative).
    capturedRecognition!.onresult({
      results: [
        { 0: { transcript: 'Ik woon' }, isFinal: true, length: 1 },
        { 0: { transcript: 'in Amsterdam' }, isFinal: true, length: 1 },
      ],
    });
    await nextTick();

    expect(wrapper.emitted('result')).toBeUndefined();

    await wrapper.find('.mic-button').trigger('click');
    await nextTick();

    expect(wrapper.emitted('result')?.[0]).toEqual(['Ik woon in Amsterdam']);
  });
});
