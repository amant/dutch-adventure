import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import CorrectionChallenge from '~/components/CorrectionChallenge.vue';
import { correctionExercise } from './helpers';

describe('CorrectionChallenge', () => {
  it('pre-fills the editor with the original text and shows the mistake count', async () => {
    const wrapper = await mountSuspended(CorrectionChallenge, { props: { exercise: correctionExercise } });

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe(
      correctionExercise.correctionData!.originalText,
    );
    expect(wrapper.text()).toContain('1 errors');
    expect(wrapper.text()).toContain('0 / 1 fixed');
  });

  it('keeps the finalize button disabled while the text is unchanged', async () => {
    const wrapper = await mountSuspended(CorrectionChallenge, { props: { exercise: correctionExercise } });

    const finalize = wrapper.findAll('button').find(b => b.text().includes('Finalize Corrections'))!;
    expect(finalize.attributes('disabled')).toBeDefined();
  });

  it('emits submit with the corrected text once the mistakes are fixed', async () => {
    const wrapper = await mountSuspended(CorrectionChallenge, { props: { exercise: correctionExercise } });

    await wrapper.find('textarea').setValue('Ik ben naar de markt geweest en kocht brood.');

    expect(wrapper.text()).toContain('1 / 1 fixed');
    expect(wrapper.find('.hints-box').exists()).toBe(false);

    await wrapper.findAll('button').find(b => b.text().includes('Finalize Corrections'))!.trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Ik ben naar de markt geweest en kocht brood.']);
  });

  it('resets the editor back to the original text', async () => {
    const wrapper = await mountSuspended(CorrectionChallenge, { props: { exercise: correctionExercise } });

    await wrapper.find('textarea').setValue('Iets anders');
    await wrapper.findAll('button').find(b => b.text().includes('Reset to Original'))!.trigger('click');

    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe(
      correctionExercise.correctionData!.originalText,
    );
  });
});
