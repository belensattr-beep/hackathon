# 👨‍💻 Developer Guide

## 🏗️ Architecture Overview

The Asteroid Impact Simulator is built with a modern React architecture using TypeScript, featuring a clean separation of concerns and modular design.

### Core Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │    Services     │    │   External      │
│                 │    │                 │    │   APIs          │
│ • ControlPanel  │◄──►│ • impactCalc    │◄──►│ • NASA NEO      │
│ • ResultsPanel  │    │ • mitigation    │    │ • Supabase      │
│ • ImpactMap     │    │ • nasaService   │    │                 │
│ • OrbitalSim    │    │ • supabaseClient│    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧩 Component Structure

### ControlPanel.tsx
**Purpose**: Main control interface for simulation parameters

**Key Features**:
- Asteroid parameter controls (diameter, velocity, angle)
- Location selection
- Mitigation strategy selection
- Real asteroid data loading

**Props Interface**:
```typescript
interface ControlPanelProps {
  diameter: number;
  velocity: number;
  angle: number;
  impactLat: number;
  impactLon: number;
  mitigation: MitigationStrategy;
  warningTime: number;
  onDiameterChange: (value: number) => void;
  // ... other handlers
  asteroids?: NASAAsteroid[];
}
```

### ResultsPanel.tsx
**Purpose**: Display simulation results and metrics

**Key Features**:
- Impact energy visualization
- Crater dimensions
- Damage zone information
- Population impact estimates
- Mitigation effectiveness

**Data Flow**:
```typescript
interface ResultsPanelProps {
  results: ImpactResults;
  mitigation?: MitigationResult | null;
}
```

### ImpactMap.tsx
**Purpose**: Interactive 2D map visualization

**Technology**: Leaflet.js
**Features**:
- Click-to-select impact location
- Damage zone overlays
- Ocean/land impact visualization
- Real-time updates

### OrbitalSimulation.tsx
**Purpose**: 3D orbital trajectory visualization

**Technology**: Three.js
**Features**:
- 3D Earth model
- Asteroid trajectory
- Mitigation effect visualization
- Interactive camera controls

## 🔧 Service Layer

### impactCalculations.ts
**Purpose**: Core physics calculations for impact simulations

**Key Functions**:
```typescript
// Mass calculation
export function calculateMass(diameter: number): number

// Energy calculation
export function calculateEnergy(mass: number, velocity: number): number

// Crater formation
export function calculateCraterDiameter(
  energy: number,
  velocity: number,
  angle: number,
  isOcean: boolean
): number

// Main calculation orchestrator
export async function calculateImpact(data: AsteroidData): Promise<ImpactResults>
```

**Scientific Models**:
- **Energy**: Kinetic energy formula (0.5 × m × v²)
- **Crater**: Schmidt-Holsapple scaling law
- **Shockwave**: Empirical blast radius
- **Seismic**: Richter scale magnitude
- **Thermal**: Heat radiation zones

### mitigationService.ts
**Purpose**: Asteroid deflection strategy calculations

**Available Strategies**:
```typescript
type MitigationStrategy = 
  | 'none'
  | 'kinetic_impactor'    // DART-style collision
  | 'nuclear_device'      // Standoff nuclear burst
  | 'gravity_tractor'     // Gravitational pull
  | 'ion_beam';          // Ion beam ablation
```

**Physics Models**:
- **Kinetic Impactor**: Momentum transfer with ejecta enhancement
- **Nuclear Device**: Energy coupling efficiency
- **Gravity Tractor**: Gravitational force calculations
- **Ion Beam**: Ablation thrust modeling

### nasaService.ts
**Purpose**: NASA NEO API integration

**Key Functions**:
```typescript
// Fetch asteroids approaching Earth
export async function fetchNearEarthAsteroids(
  startDate?: string,
  endDate?: string
): Promise<NASAAsteroid[]>

// Fetch specific asteroid
export async function fetchAsteroidById(id: string): Promise<NASAAsteroid | null>

// Historical impact scenarios
export function getHistoricalImpacts()
```

**Data Processing**:
- API response parsing
- Data validation
- Fallback to mock data
- Error handling

### supabaseClient.ts
**Purpose**: Database operations for simulation storage

**Key Functions**:
```typescript
// Save simulation
export async function saveSimulation(data: SimulationRecord)

// Load recent simulations
export async function loadRecentSimulations(limit: number = 10)

// Load by ID
export async function loadSimulationById(id: string)
```

## 🎨 Styling Architecture

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'space-blue': '#1e3a8a',
        'impact-red': '#dc2626',
        'crater-brown': '#92400e'
      }
    }
  }
}
```

### Component Styling Patterns
```typescript
// Consistent button styling
const buttonClasses = "px-4 py-2 rounded-lg transition-colors focus:ring-2";

// Card components
const cardClasses = "bg-white rounded-lg shadow-xl p-6";

// Metric displays
const metricClasses = "text-2xl font-bold text-gray-900";
```

## 🔄 State Management

### React State Structure
```typescript
// App.tsx state
const [diameter, setDiameter] = useState(500);
const [velocity, setVelocity] = useState(20);
const [angle, setAngle] = useState(45);
const [impactLat, setImpactLat] = useState(40.7);
const [impactLon, setImpactLon] = useState(-74.0);
const [mitigation, setMitigation] = useState<MitigationStrategy>('none');
const [results, setResults] = useState<ImpactResults | null>(null);
const [asteroids, setAsteroids] = useState<NASAAsteroid[]>([]);
```

### Data Flow
1. **User Input** → ControlPanel
2. **Parameter Changes** → App state
3. **State Updates** → useEffect triggers
4. **Calculations** → Services
5. **Results** → Components update

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Example test structure
describe('Impact Calculations', () => {
  test('calculates mass correctly', () => {
    const mass = calculateMass(100);
    expect(mass).toBeCloseTo(expectedMass, 2);
  });

  test('calculates energy correctly', () => {
    const energy = calculateEnergy(mass, velocity);
    expect(energy).toBeCloseTo(expectedEnergy, 2);
  });
});
```

### Integration Tests
```typescript
// API integration tests
describe('NASA Service', () => {
  test('fetches asteroid data', async () => {
    const asteroids = await fetchNearEarthAsteroids();
    expect(asteroids).toHaveLength(greaterThan(0));
  });
});
```

### Component Tests
```typescript
// React component tests
describe('ControlPanel', () => {
  test('renders parameter controls', () => {
    render(<ControlPanel {...mockProps} />);
    expect(screen.getByLabelText(/diameter/i)).toBeInTheDocument();
  });
});
```

## 🚀 Performance Optimization

### Code Splitting
```typescript
// Lazy load heavy components
const OrbitalSimulation = lazy(() => import('./components/OrbitalSimulation'));

// Use Suspense for loading states
<Suspense fallback={<LoadingSpinner />}>
  <OrbitalSimulation />
</Suspense>
```

### Memoization
```typescript
// Memoize expensive calculations
const results = useMemo(() => {
  return calculateImpact(asteroidData);
}, [diameter, velocity, angle, impactLat, impactLon]);

// Memoize components
const MemoizedResultsPanel = memo(ResultsPanel);
```

### Bundle Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'leaflet': ['leaflet'],
          'lucide': ['lucide-react']
        }
      }
    }
  }
});
```

## 🔒 Security Considerations

### API Security
- Use environment variables for API keys
- Implement rate limiting
- Validate all input data
- Sanitize user inputs

### Data Protection
- No sensitive data in client-side code
- Secure database connections
- Input validation and sanitization
- CORS configuration

## 📊 Monitoring and Analytics

### Error Tracking
```typescript
// Error boundary for React components
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
    // Send to monitoring service
  }
}
```

### Performance Monitoring
```typescript
// Track calculation performance
const startTime = performance.now();
const results = await calculateImpact(data);
const endTime = performance.now();
console.log(`Calculation took ${endTime - startTime} milliseconds`);
```

## 🛠️ Development Workflow

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-mitigation-strategy
git add .
git commit -m "Add new mitigation strategy"
git push origin feature/new-mitigation-strategy
# Create pull request
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run typecheck

# Formatting
npm run format
```

### Build Process
```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## 🔮 Future Development

### Planned Features
- [ ] Real-time asteroid tracking
- [ ] Advanced atmospheric modeling
- [ ] Machine learning predictions
- [ ] VR/AR support
- [ ] Mobile app version

### Architecture Improvements
- [ ] State management with Zustand/Redux
- [ ] GraphQL API integration
- [ ] Microservices architecture
- [ ] Container deployment
- [ ] CI/CD pipeline

### Performance Enhancements
- [ ] Web Workers for calculations
- [ ] Service Worker for offline support
- [ ] Progressive Web App features
- [ ] Advanced caching strategies

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [Leaflet Documentation](https://leafletjs.com/reference.html)

### Scientific References
- [NASA NEO API](https://api.nasa.gov/)
- [Planetary Defense Research](https://www.nasa.gov/planetarydefense)
- [Impact Crater Studies](https://www.lpi.usra.edu/science/kring/epo_web/impact_cratering/)

### Development Tools
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Supabase](https://supabase.com/)
