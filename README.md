# Shared UI Components

## Guidelines

- Not intended for complex theming customization.
  Instead, targets small variations nearing "flat" Google/Apple flavored themes.
- Hiding important functionality or information behind ":hover" effects is not mobile friendly.
- Reuse/restyle existing HTML elements where they make semantic sense, e.g. `h1`-`h6`, `section`, forms, etc.
- A component should only be responsible for its own internal spacing -- never its external spacing.
  This way components may be used in a variety of cases without needing to override margins.
- Consider server-side rendering, and use `connectedCallback()` to ensure declarative setup is possible.
- Don't use the hand cursor for general UI actions. Reserve it for actual HTTP links.
  - Apple’s Human Interface Guidelines: the hand cursor should be used when “the content is a URL link”.
  - W3C User Interface guidelines: "The cursor is a pointer that indicates a link”.
  - Microsoft: Displaying the hand pointer on hover is the definitive indication of a link.
    To avoid confusion, it is imperative not to use the hand pointer for other purposes.

## Elements

### `h1`-`h6`

Defines `font-size` and `line-height` only.

### `ui-appbar`

Primarily a case-specific container for one or more `<ui-bar>`'s.

Provides coloring, prominence, spacing, and positioning.

Unlike `<ui-bar>` it is not concerned with the spacing *between* items.

### `ui-bar`

Horizontal layout for related buttons/controls, and responsible for spacing between them.

For positioning and prominence, see `<ui-appbar>` instead.

May be nested.

Variations:
    - `.is-path`
    - `.is-even`
    - `.is-end`
    - `.is-grow`
    - `.is-stretch`

### `ui-button` / `ui-icon-button`

- Textual button, with optional `<ui-icon>`.
- Button with a single `<ui-icon>`.

### `ui-spinner`

`.is-init` / `ui-is-init`

## Spacing

Case specific spacing, used for e.g.: padding, margin, gap, row-gap, column-gap.

### `ui-tab`

#### `ui-tab-closer`

Click event handler placed inside a `ui-tab`. Parent of any other visible component such as a `<ui-button>`.

### Variables

- `var(--ui-2xs-spacing)`
- `var(--ui-xs-spacing)`
- `var(--ui-s-spacing)`
- `var(--ui-spacing)`
- `var(--ui-l-spacing)`
- `var(--ui-xl-spacing)`
- `var(--ui-2xl-spacing)`

### Case Specific Modifiers

- `.has-2xs-spacing`
- `.has-xs-spacing`
- `.has-s-spacing`
- `.has-spacing`
- `.has-l-spacing`
- `.has-xl-spacing`
- `.has-2xl-spacing`
