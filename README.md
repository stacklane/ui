# Shared UI Components

## Guidelines

- Not intended for complex theming customization.
  Instead, targets small variations nearing "flat" Google/Apple flavored themes.
- Hiding important functionality or information behind ":hover" effects is not mobile friendly.
- Reuse/restyle existing HTML elements where they make semantic sense, e.g. `h1`-`h6`, `section`, forms, etc.
- A component should only be responsible for its own internal spacing -- never its external spacing.
  This way components may be used in a variety of cases without needing to override margins.
- Don't use the hand cursor for general UI actions. Reserve it for actual HTTP links.
  - Apple’s Human Interface Guidelines: the hand cursor should be used when “the content is a URL link”.
  - W3C User Interface guidelines: "The cursor is a pointer that indicates a link”.
  - Microsoft: Displaying the hand pointer on hover is the definitive indication of a link.
    To avoid confusion, it is imperative not to use the hand pointer for other purposes.

## Elements

### `h1`-`h6`

Defines `font-size` and `line-height` only.

### `.ui-column`

Simple vertical listing. Supports optional [spacing](#spacing) between the column's rows.

## Spacing

Case specific spacing, used for: padding, margin, gap, row-gap, column-gap.

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
