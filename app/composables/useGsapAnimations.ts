import { gsap } from 'gsap'

export function useGsapAnimations() {
  /**
   * Smoothly animates a bounty number counting up with a celebratory comic scale punch
   */
  function animateBountyCounter(
    targetRef: Ref<HTMLElement | null>,
    startVal: number,
    endVal: number,
    duration = 1.5,
    onComplete?: () => void
  ) {
    if (!import.meta.client || !targetRef.value) return

    const counter = { val: startVal }
    
    // Pulse target during count
    gsap.fromTo(
      targetRef.value,
      { scale: 1 },
      {
        scale: 1.15,
        duration: 0.2,
        yoyo: true,
        repeat: 3,
        ease: 'power1.inOut'
      }
    )

    gsap.to(counter, {
      val: endVal,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (targetRef.value) {
          targetRef.value.innerText = `฿ ${Math.floor(counter.val).toLocaleString('nl-NL')}`
        }
      },
      onComplete: () => {
        if (targetRef.value) {
          targetRef.value.innerText = `฿ ${Math.floor(endVal).toLocaleString('nl-NL')}`
          // Final landing bounce
          gsap.fromTo(
            targetRef.value,
            { scale: 1.25, color: '#ffd000' },
            { scale: 1, color: '', duration: 0.35, ease: 'back.out(2)' }
          )
        }
        if (onComplete) onComplete()
      }
    })
  }

  /**
   * Anime sword slash impact (One Piece style Santoryu / Slash)
   */
  function animateSlashImpact(targetRef: Ref<HTMLElement | null>, callback?: () => void) {
    if (!import.meta.client || !targetRef.value) return

    const el = targetRef.value
    const tl = gsap.timeline({ onComplete: callback })

    tl.to(el, {
      x: -12,
      y: 6,
      rotate: -2,
      duration: 0.05,
      ease: 'power4.in'
    })
      .to(el, {
        x: 14,
        y: -8,
        rotate: 3,
        duration: 0.05
      })
      .to(el, {
        x: -8,
        y: 4,
        rotate: -1,
        duration: 0.05
      })
      .to(el, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.15,
        ease: 'elastic.out(1, 0.3)'
      })
  }

  /**
   * Dramatic Anime Manga Sound Impact (*DON!!* / *BAM!!*)
   */
  function animateDonSlam(badgeRef: Ref<HTMLElement | null>) {
    if (!import.meta.client || !badgeRef.value) return

    gsap.fromTo(
      badgeRef.value,
      {
        scale: 3.5,
        rotation: -25,
        opacity: 0
      },
      {
        scale: 1,
        rotation: -4,
        opacity: 1,
        duration: 0.35,
        ease: 'back.out(2.5)'
      }
    )
  }

  /**
   * Bouncy Comic Element Entry
   */
  function animateComicPop(targetRef: Ref<HTMLElement | null>, delay = 0) {
    if (!import.meta.client || !targetRef.value) return

    gsap.fromTo(
      targetRef.value,
      {
        scale: 0.4,
        opacity: 0,
        rotation: -8
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        delay,
        duration: 0.45,
        ease: 'back.out(1.8)'
      }
    )
  }

  /**
   * Staggered cards entrance for lists / grids
   */
  function animateStaggerGrid(containerSelector: string, itemSelector: string) {
    if (!import.meta.client) return

    gsap.fromTo(
      `${containerSelector} ${itemSelector}`,
      {
        y: 30,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.06,
        ease: 'back.out(1.4)'
      }
    )
  }

  /**
   * Damage / Mistake Shake effect
   */
  function animateDamageShake(targetRef: Ref<HTMLElement | null>) {
    if (!import.meta.client || !targetRef.value) return

    gsap.fromTo(
      targetRef.value,
      { x: -10, filter: 'brightness(1.4) drop-shadow(0 0 10px #e63946)' },
      {
        x: 10,
        duration: 0.06,
        repeat: 5,
        yoyo: true,
        ease: 'rough',
        onComplete: () => {
          gsap.to(targetRef.value, { x: 0, filter: 'none', duration: 0.1 })
        }
      }
    )
  }

  /**
   * Haki Aura / Energy burst expansion
   */
  function animateHakiBurst(targetRef: Ref<HTMLElement | null>) {
    if (!import.meta.client || !targetRef.value) return

    gsap.fromTo(
      targetRef.value,
      {
        boxShadow: '0 0 0px #9d4edd',
        borderColor: '#7209b7'
      },
      {
        boxShadow: '0 0 35px #9d4edd, inset 0 0 20px #7209b7',
        borderColor: '#ffd000',
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      }
    )
  }

  return {
    animateBountyCounter,
    animateSlashImpact,
    animateDonSlam,
    animateComicPop,
    animateStaggerGrid,
    animateDamageShake,
    animateHakiBurst
  }
}
