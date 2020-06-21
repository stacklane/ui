# Shared UI Components

## Guidelines

- Not intended for high theming customization. Instead small variations nearing "flat" Google/Apple flavored themes.
- Avoid hover effects as much as possible (not mobile friendly).
- Reuse/restyle existing HTML elements where they make semantic sense, e.g. `h1`-`h6`, `section`, forms, etc.
- A component should only be responsible for its own internal spacing -- never its external spacing.
  This way components may be used in a variety of cases without needing to override margins.
  An exception is when stacking other known components such as:
  `this-component + that-component { margin-top: var(--ui-spacing); }`
- Don't use the hand for general UI actions. Reserve it for actual HTTP links.
  - Apple’s Human Interface Guidelines: the hand cursor should be used when “the content is a URL link”.
  - W3C User Interface guidelines: "The cursor is a pointer that indicates a link”.
  - Microsoft: Displaying the hand pointer on hover is the definitive indication of a link.
    To avoid confusion, it is imperative not to use the hand pointer for other purposes.