# 🚀 Asteroid Impact Simulator

A comprehensive web application that simulates asteroid impacts using real NASA data and scientific calculations. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

- **🎯 Real NASA Data**: Fetches actual asteroid data from NASA's Near Earth Object (NEO) API
- **🗺️ Interactive Maps**: Visualize impact zones and damage areas using Leaflet
- **🌌 3D Orbital Visualization**: Watch asteroid trajectories in 3D using Three.js
- **🛡️ Mitigation Strategies**: Test real deflection methods like DART mission
- **📊 Scientific Calculations**: Accurate impact physics based on research models
- **💾 Save Simulations**: Store and retrieve simulation results
- **📱 Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/asteroid-impact-simulator.git
   cd asteroid-impact-simulator/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables (Optional)**
   Create a `.env` file in the project directory:
   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 How to Use

### Basic Simulation
1. **Adjust asteroid parameters**:
   - Diameter (meters)
   - Velocity (km/s)
   - Impact angle (degrees)

2. **Select impact location**:
   - Click on the interactive map
   - Choose coordinates manually

3. **View results**:
   - Impact energy
   - Crater dimensions
   - Damage zones
   - Affected population

### Real Asteroid Data
1. **Load NASA data**:
   - Select from "Load Real Asteroid Data" dropdown
   - Choose from current near-Earth objects
   - View actual asteroid properties

2. **Historical scenarios**:
   - Access famous impact events
   - Compare with real historical data

### Mitigation Strategies
1. **Select strategy**:
   - Kinetic Impactor (DART-style)
   - Nuclear Standoff Burst
   - Gravity Tractor
   - Ion Beam Shepherd

2. **Configure parameters**:
   - Warning time available
   - Mission parameters

3. **Analyze effectiveness**:
   - Success probability
   - Velocity change
   - Trajectory deflection

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Leaflet** for 2D interactive maps
- **Three.js** for 3D orbital visualization
- **Lucide React** for icons
- **Vite** for build tooling

### Backend & Data
- **Supabase** for database and real-time data
- **NASA NEO API** for real asteroid data
- **PostgreSQL** with Row Level Security

### Development Tools
- **ESLint** for code quality
- **TypeScript** for type safety
- **PostCSS** for CSS processing

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── ControlPanel.tsx     # Parameter controls
│   ├── ResultsPanel.tsx     # Impact metrics display
│   ├── ImpactMap.tsx        # 2D Leaflet map
│   └── OrbitalSimulation.tsx # 3D Three.js visualization
├── services/                # Business logic
│   ├── impactCalculations.ts   # Impact physics
│   ├── mitigationService.ts    # Deflection strategies
│   ├── nasaService.ts          # NASA API integration
│   └── supabaseClient.ts       # Database client
├── App.tsx                  # Main application
└── index.css                # Global styles
```

## 🧮 Scientific Models

### Impact Calculations
- **Energy**: Kinetic energy = 0.5 × mass × velocity²
- **Crater Size**: Schmidt-Holsapple scaling law
- **Shockwave**: Empirical blast radius formulas
- **Seismic**: Richter scale magnitude estimation
- **Thermal**: Heat radiation zone calculations

### Mitigation Physics
- **Kinetic Impactor**: Momentum transfer with ejecta enhancement
- **Nuclear Device**: Standoff detonation energy coupling
- **Gravity Tractor**: Gravitational force calculations
- **Ion Beam**: Ablation thrust modeling

### Population Impact
- **Density Models**: Latitude/longitude-based estimation
- **Damage Zones**: Overpressure and thermal effects
- **Affected Area**: Circular zone calculations

## 🌐 API Integration

### NASA NEO API
- **Endpoint**: `https://api.nasa.gov/neo/rest/v1`
- **Data**: Real-time asteroid tracking
- **Fallback**: Mock data for offline use
- **Rate Limiting**: Uses demo key (limited requests)

### Supabase Integration
- **Database**: PostgreSQL with RLS
- **Features**: Save/load simulations
- **Authentication**: Anonymous access
- **Real-time**: Live data synchronization

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 📊 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler
```

## 🎓 Educational Use

This simulator is designed for:
- **STEM Education**: Understanding planetary defense
- **Science Communication**: Visualizing impact scenarios
- **Research**: Exploring mitigation strategies
- **Public Awareness**: Asteroid threat education

## 🔬 Scientific Accuracy

### Data Sources
- **NASA JPL**: Official asteroid tracking data
- **Research Papers**: Peer-reviewed impact models
- **Historical Events**: Real impact case studies

### Limitations
These are simplified models for educational purposes. Real impacts depend on:
- Asteroid composition and structure
- Atmospheric entry effects
- Local geology and topography
- Ocean depth (for water impacts)
- Many other complex factors

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- More sophisticated atmospheric entry models
- Enhanced population density maps
- Additional mitigation technologies
- Improved 3D visualizations
- Mobile app version

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA JPL** for providing the NEO API
- **Supabase** for backend infrastructure
- **Open source community** for excellent libraries
- **Planetary defense researchers** for scientific models

## 📞 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/your-username/asteroid-impact-simulator/issues) page
2. Create a new issue with detailed information
3. Include browser console errors if applicable

## 🔮 Future Enhancements

- [ ] Real-time asteroid tracking
- [ ] Advanced atmospheric entry modeling
- [ ] Machine learning impact predictions
- [ ] Multiplayer simulation mode
- [ ] VR/AR support
- [ ] Mobile app version

---

**⚠️ Disclaimer**: This simulator is for educational purposes only. Results are estimates and actual impacts would vary based on many factors. Always consult with planetary defense experts for real-world applications.