# CLAUDE.md - Development Guidelines

## Testing Standards
- Use `data-testid` attributes for all test selectors
- Test components in isolation with mocked dependencies
- Use `screen.getByRole()` for semantic elements, `screen.getByTestId()` for complex components
- Mock Zustand stores in tests using `jest.mock()`
- Run tests after every implementation - fix ALL failures before proceeding

## Code Style & Patterns
- Use functional components with hooks only
- Prefer `const` over `let`, avoid `var`
- Use TypeScript strict mode - no `any` types
- Export types from `types/` directory, not inline
- Use meaningful variable names: `generateBusiness` not `genBiz`
- Destructure props and state for cleaner code

## Zustand Store Patterns
- Actions should be pure functions that update state
- Use `immer` for complex state updates if needed
- Subscribe to store slices, not entire store: `const cash = useGameStore(state => state.cash)`
- Keep store actions simple - complex logic goes in utils/

## Component Organization
- One component per file, matching filename
- Export default the component, named export for types
- Props interface should be named `[ComponentName]Props`
- Keep components under 150 lines - split if larger
- Use composition over inheritance

## Error Handling
- Wrap localStorage operations in try/catch
- Validate user inputs before state updates
- Handle division by zero in calculations
- Provide fallback values for missing data
- Never let the app crash - graceful degradation

## Performance Considerations
- Use `React.memo()` for expensive components
- Avoid creating objects/arrays in render
- Use `useCallback` for event handlers passed to children
- Debounce user input (price changes, etc.)
- Clean up intervals/timeouts in useEffect cleanup

## File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `camelCase.ts`
- Tests: `ComponentName.test.tsx` or `fileName.test.ts`
- Stores: `storeName.ts`

## Common Patterns
- Time calculations: Use `dayjs` for parsing, manipulating and displaying dates.
- Dates: prefer using `dayjs` objects for in memory state instead of converting to `Date` objects
- Number formatting: Use `toLocaleString()` for currency display
- State updates: Validate before updating, never mutate directly
- Event handlers: Use arrow functions in components
- Constants: Define in separate files, use UPPER_CASE

## Testing Utilities
```typescript
// Mock timers for cooldown testing
jest.useFakeTimers();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock Zustand store
jest.mock('../stores/gameStore', () => ({
  useGameStore: jest.fn(),
}));
```

## Don't Do This
- Don't end lines with semi-colons. It goes against the .prettier.rc file
- Don't use `getElementById` - use React refs or state
- Don't conditionally run assertions in tests
- Don't use the `toBeCloseTo` assertion in tests. Be explicit
- Don't mutate props or state directly
- Don't use `setTimeout` or `setInterval` without cleanup
- Don't hardcode values - use constants
- Don't skip error boundaries around risky operations
- Don't use `console.log` in production code
- Don't create components inside other components