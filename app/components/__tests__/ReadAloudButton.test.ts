import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ReadAloudButton from '~/components/ReadAloudButton.vue';

const speakMock = vi.fn();
const cancelMock = vi.fn();
const getVoicesMock = vi.fn(() => []);

interface UtteranceLike {
  text: string;
  lang: string;
  rate: number;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

let utterances: UtteranceLike[] = [];

describe('ReadAloudButton', () => {
  beforeEach(() => {
    utterances = [];
    speakMock.mockClear();
    cancelMock.mockClear();
    getVoicesMock.mockClear();

    vi.stubGlobal('speechSynthesis', {
      cancel: cancelMock,
      speak: speakMock.mockImplementation((utterance: UtteranceLike) => {
        utterances.push(utterance);
      }),
      getVoices: getVoicesMock,
    });
    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text = '';
      lang = '';
      rate = 1;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(text: string) { this.text = text; }
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders a read-aloud toggle', async () => {
    const wrapper = await mountSuspended(ReadAloudButton, { props: { text: 'Hallo wereld.' } });

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.text()).toContain('Lees voor');
  });

  it('speaks the text in Dutch when toggled on', async () => {
    const wrapper = await mountSuspended(ReadAloudButton, { props: { text: 'Hallo wereld. Tot ziens.' } });

    await wrapper.find('button').trigger('click');

    expect(speakMock).toHaveBeenCalled();
    expect(utterances).toHaveLength(2);
    expect(utterances[0].lang).toBe('nl-NL');
    expect(utterances[0].text).toBe('Hallo wereld.');
    expect(utterances[1].text).toBe('Tot ziens.');
  });

  it('stops speech when toggled off', async () => {
    const wrapper = await mountSuspended(ReadAloudButton, { props: { text: 'Hallo wereld.' } });

    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('Stop');

    await wrapper.find('button').trigger('click');

    expect(cancelMock).toHaveBeenCalled();
    expect(wrapper.text()).toContain('Lees voor');
  });
});
