<script setup lang="ts">
import { useGsapAnimations } from '~/composables/useGsapAnimations'

const props = withDefaults(defineProps<{
  text?: string
  variant?: 'gold' | 'red' | 'purple' | 'green' | 'orange'
  rotate?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  autoAnimate?: boolean
}>(), {
  text: 'DON!!',
  variant: 'gold',
  rotate: -6,
  size: 'md',
  autoAnimate: true
})

const badgeRef = ref<HTMLElement | null>(null)
const { animateDonSlam } = useGsapAnimations()

onMounted(() => {
  if (props.autoAnimate) {
    animateDonSlam(badgeRef)
  }
})
</script>

<template>
  <div 
    ref="badgeRef" 
    class="comic-sound-badge" 
    :class="[variant, size]"
    :style="{ transform: `rotate(${rotate}deg)` }"
  >
    <span class="badge-inner">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.comic-sound-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-anime-title;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.08em;
  border-radius: $radius-anime-sm;
  user-select: none;
  transform-origin: center center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    transform: scale(1.05) rotate(0deg) !important;
  }

  &.gold {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }

  &.red {
    background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  &.purple {
    background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  &.green {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  &.orange {
    background: linear-gradient(135deg, #0284c7 0%, #0056b3 100%);
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
  }

  &.sm {
    padding: 3px 8px;
    font-size: 0.75rem;
  }

  &.md {
    padding: 4px 12px;
    font-size: 0.95rem;
  }

  &.lg {
    padding: 8px 18px;
    font-size: 1.25rem;
  }

  &.xl {
    padding: 10px 24px;
    font-size: 1.6rem;
  }

  .badge-inner {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>
