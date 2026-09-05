---
trigger: always_on
---

# GSAP Animation Rules

## Purpose

Use **GSAP** as the primary animation library for UI animations. Animations should improve usability, hierarchy, feedback, and visual polish without distracting from content.

---

## 1. General Principles

* Use GSAP when animation provides meaningful UX value.
* Do not animate elements unnecessarily.
* Keep animations subtle, responsive, and purposeful.
* Never let animation block user interaction unnecessarily.
* Prefer consistency across the application.
* Do not introduce another animation library unless explicitly required.

---

## 2. Preferred Properties

Prioritize GPU-friendly properties:

```js
gsap.to(element, {
  x: 100,
  y: 20,
  scale: 1.05,
  rotation: 5,
  opacity: 1,
});
```

Prefer:

* `x`, `y`
* `scale`, `scaleX`, `scaleY`
* `rotation`, `rotationX`, `rotationY`
* `opacity`

Avoid animating layout properties when possible:

* `width`
* `height`
* `top`
* `left`
* `margin`
* `padding`

Use transforms instead.

---

## 3. Duration & Easing

Recommended durations:

| Use case               |     Duration |
| ---------------------- | -----------: |
| Micro interaction      | `0.15–0.25s` |
| Hover / button         |   `0.2–0.3s` |
| UI transition          |   `0.3–0.5s` |
| Component entrance     |   `0.5–0.8s` |
| Hero / major animation |   `0.8–1.2s` |

Preferred easing:

```js
ease: "power2.out"
```

or:

```js
ease: "power3.out"
```

Use `back.out()` sparingly for energetic UI interactions.

Avoid excessive bounce, elastic, or exaggerated easing.

---

## 4. Timelines

Use `gsap.timeline()` for animations that belong to the same sequence.

```js
const tl = gsap.timeline();

tl.from(".title", {
  opacity: 0,
  y: 30,
  duration: 0.6,
})
.from(".description", {
  opacity: 0,
  y: 20,
  duration: 0.5,
}, "-=0.3")
.from(".cta", {
  opacity: 0,
  y: 15,
  duration: 0.4,
}, "-=0.2");
```

Prefer timeline positioning over `setTimeout()`.

Use `stagger` for repeated elements:

```js
gsap.from(".card", {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.08,
});
```

Keep stagger subtle.

---

## 5. React / Next.js

Never run GSAP during render.

Use `useGSAP()` when available:

```jsx
const container = useRef();

useGSAP(() => {
  gsap.from(".title", {
    opacity: 0,
    y: 30,
    duration: 0.6,
  });
}, { scope: container });
```

If `useGSAP()` is unavailable, use `useLayoutEffect()` or `useEffect()` with proper cleanup.

Always scope animations to the component when possible.

Clean up animations when components unmount.

---

## 6. ScrollTrigger

Use `ScrollTrigger` for scroll-based animations.

```js
gsap.from(".section", {
  opacity: 0,
  y: 30,
  duration: 0.7,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%",
    once: true,
  },
});
```

Rules:

* Keep scroll animations subtle.
* Avoid excessive ScrollTriggers.
* Prefer `once: true` for simple entrance animations.
* Never hijack or interfere with normal scrolling.
* Clean up ScrollTriggers when components unmount.

---

## 7. Responsive Animations

Animations must work on desktop, tablet, and mobile.

Use `gsap.matchMedia()` when behavior should differ by viewport:

```js
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  gsap.to(".image", {
    x: 80,
    duration: 0.8,
  });
});

mm.add("(max-width: 767px)", () => {
  gsap.to(".image", {
    y: 30,
    duration: 0.6,
  });
});
```

Do not assume desktop animation values work well on mobile.

---

## 8. Accessibility

Respect `prefers-reduced-motion`.

```js
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

When reduced motion is enabled:

* Remove unnecessary movement.
* Disable parallax.
* Avoid large transforms.
* Prefer instant or very short transitions.
* Keep important content visible.

Accessibility takes priority over animation.

---

## 9. Hover & Interaction

Use GSAP for complex interactions. Use CSS for simple hover transitions when GSAP provides no benefit.

Example:

```js
gsap.to(button, {
  scale: 1.03,
  duration: 0.2,
  ease: "power2.out",
});
```

Interactive animations should:

* Provide immediate feedback.
* Be short.
* Be reversible.
* Never cause layout shifts.
* Never make controls difficult to use.

When animations can be triggered repeatedly, prevent stacking:

```js
gsap.killTweensOf(element);
```

---

## 10. Initial & Exit States

Avoid FOUC (flash of unstyled content).

Preferred entrance:

```js
gsap.from(element, {
  opacity: 0,
  y: 24,
  duration: 0.6,
  ease: "power3.out",
});
```

Exit animations should generally be faster than entrance animations.

Do not make critical content permanently invisible through CSS while waiting for JavaScript.

---

## 11. Performance

Prioritize:

```text
transform
opacity
```

Be careful with:

```text
width
height
top
left
margin
padding
filter
box-shadow
```

Avoid:

* Animating hundreds of DOM elements simultaneously.
* Excessive blur/filter effects.
* Excessive parallax.
* Unnecessary `will-change`.
* Repeated layout reads during animation.

If performance drops, reduce animated elements and prefer transforms.

---

## 12. Animation Architecture

Keep complex animation logic organized.

Example:

```text
animations/
├── hero.js
├── navigation.js
├── cards.js
├── scrollAnimations.js
└── pageTransitions.js
```

Component-specific animations should generally belong to the component.

Use descriptive timeline names:

```js
const heroIntro = gsap.timeline();
const menuAnimation = gsap.timeline();
```

Avoid vague names such as `anim1`, `tl2`, or `thing`.

---

## 13. Page Transitions

Use GSAP timelines for page transitions when appropriate.

Keep transitions short, generally under 1 second.

Page transitions must never make the application feel slower than necessary.

---

## 14. Parallax

Use parallax sparingly.

Good use cases:

* Hero imagery
* Decorative backgrounds
* Editorial sections

Avoid parallax on:

* Forms
* Navigation
* Critical controls
* Text-heavy interfaces
* Mobile unless performance is verified

Disable or simplify it for reduced-motion users.

---

## 15. Avoid Over-Animation

Do not animate every element simply because GSAP is available.

Bad:

```text
Everything fades → moves → rotates → scales → bounces
```

Good:

```text
Important content enters with subtle movement
Primary interaction provides brief feedback
Decorative elements remain mostly static
```

Animation should support the visual hierarchy:

1. Primary content
2. Primary interaction
3. Secondary content
4. Decorative elements

---

## 16. Debugging

During development, ScrollTrigger markers may be enabled:

```js
markers: true
```

Remove all debug markers and unnecessary console logs before production.

---

## 17. Final Checklist

Before shipping an animation:

* [ ] GSAP is actually appropriate for the interaction.
* [ ] Animation has a clear UX purpose.
* [ ] Transform/opacity are preferred.
* [ ] Duration is short and appropriate.
* [ ] Easing is intentional.
* [ ] Animation does not block interaction.
* [ ] Mobile behavior has been considered.
* [ ] Reduced-motion behavior is supported.
* [ ] React/Next.js animations are properly scoped and cleaned up.
* [ ] ScrollTriggers are cleaned up.
* [ ] Repeated animations do not stack.
* [ ] No layout shifts are introduced.
* [ ] No unnecessary `will-change` is used.
* [ ] Debug code is removed.
* [ ] Performance is acceptable on mobile.

---

## Core Rule

**Use GSAP to make the interface feel better, not to demonstrate that GSAP is being used.**

If an animation does not improve usability, feedback, hierarchy, or visual continuity, **do not add it**.
