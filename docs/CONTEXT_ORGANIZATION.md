# Context Organization

The app context has been organized into three separate contexts for better separation of concerns and easier state management.

## Contexts

### SimulariumUiContext
Contains UI-related state:
- `page`, `setPage` - Current page number
- `module`, `setModule` - Current module
- `progressionElement` - Current progression element for hints
- `quizQuestion` - Current quiz question
- `section` - Current section
- `viewportType`, `setViewportType` - Lab vs Simulation view
- `completedModules`, `addCompletedModule` - Track module completion
- `resetAllState()` - Reset all application state

### SimulariumSimulationContext
Contains simulation-related state:
- `isPlaying`, `setIsPlaying` - Playback state
- `simulariumController` - Viewer controller
- `trajectoryName` - Current trajectory
- `timeFactor`, `timeUnit` - Time settings
- `viewportSize`, `setViewportSize` - Viewer dimensions
- `productName`, `adjustableAgentName` - Agent info
- `currentProductionConcentration`, `fixedAgentStartingConcentration`, `maxConcentration` - Concentration values
- `getAgentColor()` - Color mapping
- `handleMixAgents()`, `handleStartExperiment()`, `handleTimeChange()`, `handleTrajectoryChange()` - Handlers

### SimulariumAnalysisContext
Contains analysis and recorded data:
- `recordedConcentrations` - User-recorded concentration values
- `resetAnalysisState()` - Clear recorded data without resetting UI

## Usage

### Using the Hooks

Import the hooks instead of using `useContext` directly:

```tsx
import {
    useSimulariumUi,
    useSimulariumSimulation,
    useSimulariumAnalysis,
} from "../hooks/useSimulationContext";

const MyComponent = () => {
    const { page, setPage } = useSimulariumUi();
    const { isPlaying, setIsPlaying } = useSimulariumSimulation();
    const { recordedConcentrations } = useSimulariumAnalysis();
    
    // Use the values...
};
```

### Using the Reset Button

A `ResetButton` component is available for resetting state:

```tsx
import ResetButton from "../shared/ResetButton";

// Reset all state (UI + simulation + analysis)
<ResetButton resetAll />

// Reset only analysis data
<ResetButton />

// Custom label
<ResetButton resetAll>Start Over</ResetButton>
```

## Benefits

1. **Clearer separation of concerns** - UI, simulation, and analysis state are separate
2. **Easier to reset** - Individual contexts can be reset without affecting others
3. **Better performance** - Components only re-render when their specific context changes
4. **Type safety** - Each context has its own strongly-typed interface
5. **Cleaner imports** - Use hooks instead of context + useContext everywhere
