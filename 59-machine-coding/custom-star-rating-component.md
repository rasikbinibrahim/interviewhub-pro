# Q5907 · Accessible Custom Star Rating Component

**Difficulty:** Easy
**Companies Asked:** Amazon, Meta, Google, Uber, Airbnb
**Interview Frequency:** ★★★★☆
**Category:** Machine Coding
**Concepts:** machine-coding, star-rating, accessibility, keyboard-navigation

## Problem Statement

Implement a `StarRating` component — `StarRating({ maxStars, onChange
})` — following the WAI-ARIA radio group pattern: clicking a star sets
the rating to that star's value, hovering previews the rating visually,
and with focus anywhere in the group, `ArrowRight`/`ArrowUp` increase
the rating by one star and `ArrowLeft`/`ArrowDown` decrease it by one
(both clamped to `[1, maxStars]`), matching how native radio buttons
behave.

## Input

`maxStars`: optional number, defaults to `5`. `onChange`: optional
`(rating: number) => void`, called whenever the rating changes.

## Output

Renders `maxStars` star buttons; the current rating (or, while
hovering, a live preview) is reflected by how many stars appear filled.

## Constraints

`maxStars >= 1`

## Examples

```tsx
<StarRating maxStars={5} onChange={(rating) => console.log(rating)} />
// Clicking the 3rd star sets the rating to 3 and calls onChange(3);
// hovering the 4th star (without clicking) visually previews 4 filled
// stars, reverting to the last clicked rating on mouse leave. With
// focus in the group, ArrowRight increases the rating to 4 and calls
// onChange(4).
```

## Edge Cases

- No rating selected yet (`rating = 0`) → no stars filled, and the
  roving tabindex lands on the first star (there's no "checked" star to
  land on)
- `ArrowRight` pressed at `maxStars` already selected → clamped, stays
  at `maxStars` rather than going out of range
- `ArrowLeft` pressed at a rating of `1` → clamped, stays at `1` rather
  than going to `0` or negative (a `radiogroup` always has an option
  selected once any option has been chosen, mirroring native radio
  button groups)
- Hovering away without clicking → the preview reverts to the actual
  selected `rating`, not to `0`, when a rating was already set

## Hints

1. `role="radiogroup"` and `role="radio"` describe this to assistive
   technology as a set of mutually-exclusive options — but native
   `<input type="radio">` groups get arrow-key navigation between
   options for free from the browser; a custom `role="radio"` group has
   to implement that keyboard behavior manually to match native
   behavior.
2. Use a roving tabindex: only the star matching the current rating
   (or the first star, if nothing's been rated yet) has `tabIndex={0}`;
   every other star has `tabIndex={-1}`, so `Tab` moves into and out of
   the group as a single stop, while arrow keys move *within* it.
3. `ArrowRight`/`ArrowUp` and `ArrowLeft`/`ArrowDown` should both change
   the rating *and* move focus to the newly-selected star's button, and
   both directions need to clamp to `[1, maxStars]` rather than
   wrapping or going out of bounds — unlike a Tabs component, a rating
   scale has real, meaningful endpoints.

## Algorithm

**Pattern:** WAI-ARIA radio group with roving tabindex and clamped
arrow-key adjustment.
**Core insight:** a star rating is fundamentally a single-choice value
from a fixed range, which is exactly what the ARIA radio group pattern
models — but because these are custom `<button role="radio">` elements
rather than native `<input type="radio">`, the browser's built-in
arrow-key-moves-between-options behavior doesn't exist here for free
and must be implemented explicitly. Unlike patterns that wrap around at
their ends (like Tabs), a rating scale has genuine boundaries — a
rating can't meaningfully go below 1 star or above `maxStars` — so the
arrow-key handler clamps rather than wraps.
**Invariant:** at all times, exactly one star button carries
`tabIndex={0}` (the one matching the current `rating`, or the first
star if `rating` is still `0`), keeping the group a single stop in the
page's overall tab order while still allowing full within-group
navigation via arrow keys.

## Dry Run

**Input:** `maxStars = 5`, focus in the group at rating `3`, press
`ArrowRight` twice, then `ArrowLeft` three times

| Step | Key | rating before | computed next (clamped to [1,5]) | rating after |
|---|---|---|---|---|
| 1 | `ArrowRight` | 3 | `min(3+1, 5) = 4` | 4 |
| 2 | `ArrowRight` | 4 | `min(4+1, 5) = 5` | 5 |
| 3 | `ArrowLeft` | 5 | `max(5-1, 1) = 4` | 4 |
| 4 | `ArrowLeft` | 4 | `max(4-1, 1) = 3` | 3 |
| 5 | `ArrowLeft` | 3 | `max(3-1, 1) = 2` | 2 |

**Result:** rating moves star-by-star, clamped at both ends — matches
expected radio-group keyboard behavior.

## JavaScript Solution

```jsx
import React, { useRef, useState } from 'react';

export function StarRating({ maxStars = 5, onChange }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const starRefs = useRef([]);

  function selectRating(value) {
    const clamped = Math.max(1, Math.min(maxStars, value));
    setRating(clamped);
    if (onChange) onChange(clamped);
    starRefs.current[clamped - 1]?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      selectRating((rating || 0) + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      selectRating((rating || 1) - 1);
    }
  }

  const activeIndex = Math.max(0, rating - 1);

  return (
    <div
      className="star-rating"
      role="radiogroup"
      aria-label="Rating"
      onKeyDown={handleKeyDown}
    >
      {Array.from({ length: maxStars }).map((_, idx) => {
        const starValue = idx + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <button
            key={starValue}
            ref={(el) => (starRefs.current[idx] = el)}
            type="button"
            role="radio"
            aria-checked={rating === starValue}
            aria-label={`${starValue} Star${starValue > 1 ? 's' : ''}`}
            tabIndex={idx === activeIndex ? 0 : -1}
            onClick={() => selectRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              fontSize: 24,
              color: isFilled ? '#ffc107' : '#e0e0e0',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
```

## TypeScript Solution

```tsx
import React, { useRef, useState } from 'react';

interface StarRatingProps {
  maxStars?: number;
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, onChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectRating(value: number): void {
    const clamped = Math.max(1, Math.min(maxStars, value));
    setRating(clamped);
    if (onChange) onChange(clamped);
    starRefs.current[clamped - 1]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      selectRating((rating || 0) + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      selectRating((rating || 1) - 1);
    }
  }

  const activeIndex = Math.max(0, rating - 1);

  return (
    <div
      className="star-rating"
      role="radiogroup"
      aria-label="Rating"
      onKeyDown={handleKeyDown}
    >
      {Array.from({ length: maxStars }).map((_, idx) => {
        const starValue = idx + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <button
            key={starValue}
            ref={(el) => { starRefs.current[idx] = el; }}
            type="button"
            role="radio"
            aria-checked={rating === starValue}
            aria-label={`${starValue} Star${starValue > 1 ? 's' : ''}`}
            tabIndex={idx === activeIndex ? 0 : -1}
            onClick={() => selectRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              fontSize: 24,
              color: isFilled ? '#ffc107' : '#e0e0e0',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};
```

## Time Complexity

O(1) per click, hover, or key press — no work scales with `maxStars`
beyond the initial O(maxStars) render of the star buttons.

## Space Complexity

O(maxStars) — one ref and one rendered button per star.

## Common Mistakes

- Adding `role="radiogroup"`/`role="radio"` and considering the
  accessibility work complete — these ARIA roles set an *expectation*
  for assistive technology and keyboard users (arrow-key navigation
  between options, exactly like native radio buttons), which then has to
  actually be implemented; the roles alone don't provide that behavior.
- Reverting the hover preview to `0` instead of the actual `rating` on
  mouse leave when a rating has already been selected — makes the
  filled-star display flicker to empty every time the pointer leaves the
  group, even though a rating is still set.
- Letting arrow keys go out of `[1, maxStars]` bounds (or wrapping, like
  a Tabs component would) — a rating scale has real endpoints; going
  below 1 or above `maxStars` (or wrapping around) doesn't correspond to
  any meaningful rating value.

## Interview Follow-up Questions

1. How would you support half-star ratings (e.g. 3.5 out of 5)?
2. How would you make the component read-only/display-only (showing an
   existing rating without allowing changes), and what ARIA attributes
   would need to change?
3. How would you announce the current rating value to screen reader
   users more explicitly, beyond what `aria-checked` on the selected
   star already conveys?

## Similar Questions

- Accessible Custom Tabs Component (see [custom-tabs-accessible-component.md](custom-tabs-accessible-component.md))
- Accessible Custom Accordion Component (see [custom-accordion-accessible-component.md](custom-accordion-accessible-component.md))
