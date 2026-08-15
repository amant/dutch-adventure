import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import FormalityDrill from '~/components/FormalityDrill.vue';
import { formalityExercise } from './helpers';

describe('FormalityDrill', () => {
  it('renders the core thought and the register level tabs', async () => {
    const wrapper = await mountSuspended(FormalityDrill, { props: { exercise: formalityExercise } });

    expect(wrapper.text()).toContain('Kies het formele register.');
    expect(wrapper.findAll('.level-tab').length).toBe(3);
    expect(wrapper.text()).toContain('casual');
    expect(wrapper.text()).toContain('neutral');
    expect(wrapper.text()).toContain('formal');
    expect(wrapper.find('.level-tab.active').text()).toBe('casual');
  });

  it('walks through every level and emits submit with the joined answers', async () => {
    const wrapper = await mountSuspended(FormalityDrill, { props: { exercise: formalityExercise } });
    const nextButton = () => wrapper.findAll('button').find(b => b.text() === 'Next Register' || b.text() === 'Finish Challenge')!;

    await wrapper.find('textarea').setValue('Wil je wat drinken?');
    await nextButton().trigger('click');

    await wrapper.find('textarea').setValue('Wil je iets drinken?');
    await nextButton().trigger('click');

    await wrapper.find('textarea').setValue('Wilt u iets drinken?');
    await nextButton().trigger('click');

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual(['Wil je wat drinken? | Wil je iets drinken? | Wilt u iets drinken?']);
  });

  it('disables Previous on the first level', async () => {
    const wrapper = await mountSuspended(FormalityDrill, { props: { exercise: formalityExercise } });

    const previous = wrapper.findAll('button').find(b => b.text() === 'Previous')!;
    expect((previous.element as HTMLButtonElement).disabled).toBe(true);
  });

  it('returns to a completed level with its stored answer when its tab is clicked', async () => {
    const wrapper = await mountSuspended(FormalityDrill, { props: { exercise: formalityExercise } });

    await wrapper.find('textarea').setValue('Wil je wat drinken?');
    await wrapper.findAll('button').find(b => b.text() === 'Next Register')!.trigger('click');

    await wrapper.find('.level-tab').trigger('click');
    expect(wrapper.find('.level-tab.active').text()).toBe('casual');
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Wil je wat drinken?');
  });
});
