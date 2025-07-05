# CLAUDE.md - Development Guidelines

We're building production-quality code together. Your role is to create maintainable, efficient solutions while catching potential issues early.

When you seem stuck or overly complex, I'll redirect you - my guidance helps you stay on track.

## CRITICAL WORKFLOW - ALWAYS FOLLOW THIS!

### Research → Plan → Implement
**NEVER JUMP STRAIGHT TO CODING!** Always follow this sequence:
1. **Research**: Explore the codebase, understand existing patterns
2. **Plan**: Create a detailed implementation plan and verify it with me  
3. **Implement**: Execute the plan with validation checkpoints

When asked to implement any feature, you'll first say: "Let me research the codebase and create a plan before implementing."

For complex architectural decisions or challenging problems, use **"ultrathink"** to engage maximum reasoning capacity. Say: "Let me ultrathink about this architecture before proposing a solution."

### Reality Checkpoints
**Stop and validate** at these moments:
- After implementing a complete feature
- Before starting a new major component  
- When something feels wrong
- Before declaring "done"
- **WHEN TESTS OR LINTING FAIL WITH ERRORS** ❌

Run: `npm run lint && npm run test && npm run build`

> Why: You can lose track of what's actually working. These checkpoints prevent cascading failures.

Your code must be 100% clean. No exceptions.

**Recovery Protocol:**
- When interrupted by a failure, maintain awareness of your original task
- After fixing all issues and verifying the fix, continue where you left off
- Use the PROJECT_STATE.md list to track both the fix and your original task
  - If you're in the middle of a task, create a TODO section with the following sections containing a checklist of subtasks:
    - Current Task - what we are doing RIGHT NOW
    - Completed - What is actually done and tested
    - Next Steps - What comes next

## Testing Standards
- Use `data-testid` attributes for all test selectors
- Test components in isolation with mocked dependencies
- Use `screen.getByRole()` for semantic elements, `screen.getByTestId()` for complex components
- Mock Zustand stores in tests using `jest.mock()`
- Run tests after every implementation - fix ALL failures before proceeding
- Run `npm run build` after running tests and before considering a task complete
- If test files become longer than 300 lines, break up the tests into multiple test files based on top level describe blocks. Create a `__tests__` directory next to the files being tested to hold multiple test files

## Code Style & Patterns
- Use functional components with hooks only
- Prefer `const` over `let`, avoid `var`
- Use TypeScript strict mode - no `any` types
- Export types from `types/` directory, not inline
- Use meaningful variable names: `generateBusiness` not `genBiz`
- Destructure props and state for cleaner code

## CSS styling
- If styles do not depend on state to dynamically determine their value, use a .css file instead.

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
- Don't add variables or arguments unless they are being used in the current edit
- Don't use `getElementById` - use React refs or state
- Don't conditionally run assertions in tests
- Don't use the `toBeCloseTo` assertion in tests. Be explicit
- Don't mutate props or state directly
- Don't use `setTimeout` or `setInterval` without cleanup
- Don't hardcode values - use constants
- Don't skip error boundaries around risky operations
- Don't use `console.log` in production code
- Don't create components inside other components