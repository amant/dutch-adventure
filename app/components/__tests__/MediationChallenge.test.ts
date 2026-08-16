import { describe, it, expect, afterEach, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { nextTick } from 'vue';
import MediationChallenge from '~/components/MediationChallenge.vue';
import { mediationExercise, correctFeedback } from './helpers';
import type { Feedback } from '~/types/learning';

const achievedFeedback: Feedback = {
  ...correctFeedback,
  mediationPointsAchieved: ['p1'],
};

describe('MediationChallenge', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the mediation source and the key points to include', async () => {
    const wrapper = await mountSuspended(MediationChallenge, { props: { exercise: mediationExercise } });

    expect(wrapper.text()).toContain('Het probleem');
    expect(wrapper.text()).toContain('Er is een probleem met de planning.');
    expect(wrapper.text()).toContain('NL');
    expect(wrapper.text()).toContain('Vat de bron samen voor een Nederlandstalige collega.');
    expect(wrapper.text()).toContain('Noem het probleem');
    expect(wrapper.text()).toContain('Noem de oplossing');
  });

  it('binds the defineModel response and emits a plain submit', async () => {
    const wrapper = await mountSuspended(MediationChallenge, {
      props: { exercise: mediationExercise, modelValue: 'mijn samenvatting' },
    });

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('mijn samenvatting');

    await wrapper.find('textarea').setValue('Er is een probleem met de planning.');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Er is een probleem met de planning.']);

    await wrapper.findAll('button').find(b => b.text().includes('Submit Mediation'))!.trigger('click');
    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([]);
  });

  it('hides the input area and marks achieved points when feedback is present', async () => {
    const wrapper = await mountSuspended(MediationChallenge, {
      props: { exercise: mediationExercise, feedback: achievedFeedback },
    });

    expect(wrapper.find('.input-area').exists()).toBe(false);
    expect(wrapper.find('textarea').exists()).toBe(false);
    expect(wrapper.findAll('.point-item.achieved').length).toBe(1);
  });

  it('captures a spoken answer into the response and submits', async () => {
    interface TranscriptResult {
      isFinal: boolean;
      [index: number]: { transcript: string } | undefined;
    }

    interface ResultEvent {
      results: TranscriptResult[];
    }

    let capturedRecognition: {
      onstart: (() => void) | null;
      onend: (() => void) | null;
      onresult: ((event: ResultEvent) => void) | null;
      start: ReturnType<typeof vi.fn>;
      stop: ReturnType<typeof vi.fn>;
      abort: ReturnType<typeof vi.fn>;
    } | undefined;

    function createFakeRecognition() {
      const rec = {
        onstart: null as (() => void) | null,
        onend: null as (() => void) | null,
        onresult: null as ((event: ResultEvent) => void) | null,
        start: vi.fn(() => rec.onstart?.()),
        stop: vi.fn(() => rec.onend?.()),
        abort: vi.fn(),
      };
      capturedRecognition = rec;
      return rec;
    }

    vi.stubGlobal('SpeechRecognition', createFakeRecognition);

    const wrapper = await mountSuspended(MediationChallenge, { props: { exercise: mediationExercise } });

    await wrapper.find('.mic-button').trigger('click');
    capturedRecognition!.onresult({ results: [{ 0: { transcript: 'Er is een probleem met de planning.' }, isFinal: true, length: 1 }] });
    await wrapper.find('.mic-button').trigger('click');
    await nextTick();

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Er is een probleem met de planning.');
    expect(wrapper.emitted('submit')?.[0]).toEqual([]);
  });
});
