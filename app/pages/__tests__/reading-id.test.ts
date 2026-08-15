import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import ReadingArticlePage from '~/pages/reading/[id].vue';
import { resetLearnerMemory } from './helpers';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

const { routeMock, navigateMock } = vi.hoisted(() => ({ routeMock: vi.fn(), navigateMock: vi.fn() }));
mockNuxtImport('useRoute', () => routeMock);
mockNuxtImport('navigateTo', () => navigateMock);

describe('reading article page', () => {
  beforeEach(() => {
    resetLearnerMemory();
    navigateMock.mockClear();
    routeMock.mockReset();
    routeMock.mockReturnValue({ params: { id: 'a1-weer' } });
  });

  it('renders the article title, source and interactable words', async () => {
    const wrapper = await mountSuspended(ReadingArticlePage);

    expect(wrapper.text()).toContain('Het weer in Nederland');
    expect(wrapper.text()).toContain('Eenvoudig Nederlands');
    expect(wrapper.findAll('.word').length).toBeGreaterThan(0);
  });

  it('shows a hint and records exposure when a hintable word is clicked', async () => {
    const { memory } = useLearnerMemory();
    const wrapper = await mountSuspended(ReadingArticlePage);

    const hintWord = wrapper.findAll('.word').find(w => w.text() === 'schijnt')!;
    await hintWord.trigger('click');

    expect(wrapper.find('.word-card').exists()).toBe(true);
    expect(wrapper.text()).toContain('shines');
    expect(memory.value.vocabulary['schijnt'].encounters).toBe(1);
  });

  it('finishes reading and reveals the post-reading challenge', async () => {
    const wrapper = await mountSuspended(ReadingArticlePage);

    await wrapper.findAll('button').find(b => b.text().includes('Finish Reading'))!.trigger('click');

    expect(wrapper.text()).toContain('Finished!');
    expect(wrapper.text()).toContain('Hoe is het weer vandaag bij jou?');
    expect(wrapper.find('.post-reading-challenge').exists()).toBe(true);
  });

  it('submits the challenge answer and shows feedback', async () => {
    const wrapper = await mountSuspended(ReadingArticlePage);

    await wrapper.findAll('button').find(b => b.text().includes('Finish Reading'))!.trigger('click');
    await wrapper.find('textarea').setValue('Vandaag schijnt de zon en het is warm.');
    await wrapper.findAll('button').find(b => b.text() === 'Submit Answer')!.trigger('click');

    expect(wrapper.find('.feedback').exists()).toBe(true);
    expect(wrapper.text()).toContain('🎉');
  });

  it('shows the not-found state for an unknown article id', async () => {
    routeMock.mockReturnValue({ params: { id: 'unknown-article' } });

    const wrapper = await mountSuspended(ReadingArticlePage);

    expect(wrapper.text()).toContain('Article not found.');
  });
});
