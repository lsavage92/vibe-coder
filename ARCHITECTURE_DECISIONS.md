# Architecture Decisions - Vibe Coder

## Technical Stack Decisions

### Frontend Framework: React 18+ with TypeScript
**Decision**: Use React with TypeScript for the frontend
**Rationale**: 
- Strong ecosystem for incremental games
- TypeScript provides type safety for complex game state
- React's component model fits UI requirements well
- Excellent tooling and testing support

### Build Tool: Vite
**Decision**: Use Vite instead of Create React App
**Rationale**:
- Faster development builds and hot reload
- Better TypeScript support out of the box
- Modern ES modules approach
- Smaller bundle sizes for production

### State Management: Zustand
**Decision**: Use Zustand over Redux or Context API
**Rationale**:
- Lightweight and simple API
- Perfect for game state management
- Built-in TypeScript support
- Easy to persist state to localStorage
- Less boilerplate than Redux
- Excellent performance for real-time updates

**Implementation Notes**:
- Single store pattern with all game state
- Real-time progression system with setInterval
- Proper cleanup of intervals in store actions

### Testing: Jest + React Testing Library
**Decision**: Use Jest with React Testing Library
**Rationale**:
- Industry standard for React testing
- Excellent matcher library with @testing-library/jest-dom
- jsdom environment suitable for component testing
- Good TypeScript integration

### Code Quality: ESLint + Prettier
**Decision**: Use ESLint with Prettier for code formatting
**Rationale**:
- Consistent code style across the project
- Catches potential bugs early
- Integrates well with TypeScript
- Customizable rules for project preferences

## Game Architecture Decisions

### Date Management: dayjs
**Decision**: Use dayjs for all date operations instead of native Date objects
**Rationale**:
- Immutable date objects prevent accidental mutations
- Consistent API for date manipulation
- Better TypeScript support with Dayjs type
- Smaller bundle size than moment.js
- Cleaner date arithmetic and comparisons

**Implementation**:
- All dates stored as dayjs objects in game state
- Date comparisons use .isAfter(), .isSame() methods
- Time calculations use .diff() for precise intervals

### State Structure: Single Store
**Decision**: Use one main Zustand store for all game state
**Rationale**:
- Simpler than multiple stores for game logic
- Easier to persist entire game state
- Better performance for frequent updates
- Centralized state management

**Implementation**:
- Real-time progression with 1-second intervals
- Automatic cleanup of intervals on store actions
- State validation and bounds checking built-in

### Component Architecture: Feature-Based
**Decision**: Organize components by feature (ui/, game/, layout/)
**Rationale**:
- Clear separation of concerns
- Easier to find and maintain components
- Scales well as features are added
- Follows React best practices

### Testing Strategy: Comprehensive Coverage
**Decision**: Use data-testid attributes for element selection with comprehensive test patterns
**Rationale**:
- More reliable than text-based selectors
- Doesn't break when copy changes
- Explicit testing contract
- Recommended by React Testing Library

**Implementation**:
- Global Math.random mock in setupTests.ts for predictable results
- No conditional assertions - make conditions into assertions
- Explicit expectations instead of toBeCloseTo
- Proper cleanup of intervals and timers in tests
- 100% coverage of implemented functionality

## Configuration Decisions

### Code Formatting
**Decision**: 
- No semicolons (semi: false)
- Single quotes (singleQuote: true)
- 120 character line width (printWidth: 120)
- 4 space indentation (tabWidth: 4)
- Trailing commas everywhere (trailingComma: "all")

**Rationale**: Team preference for cleaner, more readable code

### Module Resolution
**Decision**: Use relative imports for now, with path mapping ready
**Rationale**:
- Simpler initially
- Easy to refactor to @ imports later
- Jest configured to handle both patterns

### CSS Strategy: CSS Modules (Future)
**Decision**: Plan to use CSS-in-JS or styled-components for vaporwave evolution
**Rationale**:
- Dynamic styling based on game state
- Better theme switching capabilities
- Component-scoped styles
- Runtime style generation for visual evolution

## Development Workflow Decisions

### Version Control: Git
**Decision**: Use Git for version control
**Rationale**:
- Industry standard
- Excellent branching for feature development
- Integration with development tools

### Package Manager: npm
**Decision**: Use npm over yarn or pnpm
**Rationale**:
- Comes with Node.js
- Simpler setup
- Good performance for project size

### Development Process: TDD Approach
**Decision**: Write tests before implementing features
**Rationale**:
- Better code quality
- Fewer bugs in production
- Easier refactoring
- Clear requirements definition

**Enhanced npm Scripts**:
- `npm run lint` now includes TypeScript checking (tsc --noEmit)
- Integrated code quality pipeline
- Fail fast on type errors and linting issues

## Future Architecture Considerations

### Performance Optimizations
- Consider React.memo for expensive components
- Use useMemo for complex calculations
- Implement virtual scrolling for large business lists

### Scalability Considerations
- Split stores if game state becomes too large
- Consider service workers for background calculations
- Plan for web workers if needed for complex AI calculations

### Accessibility
- Ensure keyboard navigation works
- Add ARIA labels for screen readers
- Maintain color contrast ratios

## Risk Mitigation

### Browser Compatibility
- Target modern browsers (ES2020+)
- Test on major browsers
- Use progressive enhancement

### Performance Monitoring
- Add performance monitoring for game loops
- Monitor bundle size growth
- Track memory usage for long sessions

### Security Considerations
- Validate all user inputs
- Secure localStorage data
- No sensitive data in client-side code