# 📡 API Documentation

## NASA NEO API Integration

### Overview
The application integrates with NASA's Near Earth Object (NEO) API to fetch real-time asteroid data for impact simulations.

### Base URL
```
https://api.nasa.gov/neo/rest/v1
```

### Authentication
- **API Key**: `DEMO_KEY` (public demo key with rate limits)
- **Rate Limit**: 1000 requests per hour
- **Fallback**: Mock data when API is unavailable

### Endpoints Used

#### 1. Feed Endpoint
```http
GET /feed?start_date={date}&end_date={date}&api_key={key}
```

**Parameters:**
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)
- `api_key`: API key

**Response Structure:**
```json
{
  "near_earth_objects": {
    "2024-01-01": [
      {
        "id": "2000433",
        "name": "433 Eros",
        "estimated_diameter": {
          "meters": {
            "estimated_diameter_min": 16800,
            "estimated_diameter_max": 17000
          }
        },
        "close_approach_data": [
          {
            "close_approach_date": "2024-01-01",
            "relative_velocity": {
              "kilometers_per_second": "23.5"
            }
          }
        ],
        "is_potentially_hazardous_asteroid": false,
        "absolute_magnitude_h": 10.4
      }
    ]
  }
}
```

#### 2. Individual Asteroid Endpoint
```http
GET /neo/{asteroid_id}?api_key={key}
```

**Parameters:**
- `asteroid_id`: Unique asteroid identifier
- `api_key`: API key

### Data Processing

#### Extracted Fields
```typescript
interface NASAAsteroid {
  id: string;                    // Unique identifier
  name: string;                  // Asteroid name
  estimatedDiameter: {           // Size estimates
    min: number;                 // Minimum diameter (meters)
    max: number;                 // Maximum diameter (meters)
    average: number;             // Average diameter (meters)
  };
  velocity: number;              // Relative velocity (km/s)
  closeApproachDate: string;     // Date of closest approach
  isPotentiallyHazardous: boolean; // Hazard classification
  absoluteMagnitude: number;     // Brightness magnitude
}
```

#### Data Transformation
```typescript
// Calculate average diameter
const average = (min + max) / 2;

// Parse velocity
const velocity = parseFloat(closeApproach.relative_velocity.kilometers_per_second);

// Extract hazard status
const isPotentiallyHazardous = neo.is_potentially_hazardous_asteroid;
```

### Error Handling

#### API Errors
```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  console.error('Error fetching NASA data:', error);
  return getMockAsteroids(); // Fallback to mock data
}
```

#### Fallback Data
When the API is unavailable, the application uses predefined mock data:
- **Apophis**: 325m diameter, 7.42 km/s
- **Bennu**: 491m diameter, 6.3 km/s
- **Eros**: 16900m diameter, 23.5 km/s
- **2004 MN4**: 245m diameter, 12.6 km/s
- **Ryugu**: 910m diameter, 8.9 km/s

### Usage Examples

#### Fetch Recent Asteroids
```typescript
import { fetchNearEarthAsteroids } from './services/nasaService';

const asteroids = await fetchNearEarthAsteroids();
console.log(`Found ${asteroids.length} asteroids`);
```

#### Fetch Specific Asteroid
```typescript
import { fetchAsteroidById } from './services/nasaService';

const asteroid = await fetchAsteroidById('2000433');
if (asteroid) {
  console.log(`Asteroid: ${asteroid.name}`);
  console.log(`Diameter: ${asteroid.estimatedDiameter.average}m`);
}
```

#### Date Range Query
```typescript
const startDate = '2024-01-01';
const endDate = '2024-01-07';
const asteroids = await fetchNearEarthAsteroids(startDate, endDate);
```

### Rate Limiting

#### Current Implementation
- Uses `DEMO_KEY` with 1000 requests/hour limit
- Caches results to minimize API calls
- Falls back to mock data when limit exceeded

#### Production Recommendations
1. **Get API Key**: Register at [api.nasa.gov](https://api.nasa.gov)
2. **Implement Caching**: Store results locally
3. **Error Handling**: Graceful degradation
4. **Monitoring**: Track API usage

### Mock Data Structure

```typescript
const mockAsteroids = [
  {
    id: '2099942',
    name: 'Apophis',
    estimatedDiameter: {
      min: 310,
      max: 340,
      average: 325
    },
    velocity: 7.42,
    closeApproachDate: '2029-04-13',
    isPotentiallyHazardous: true,
    absoluteMagnitude: 19.7
  }
  // ... more asteroids
];
```

### Historical Impact Data

The application also includes historical impact scenarios:

```typescript
const historicalImpacts = [
  {
    name: 'Chicxulub (Dinosaur Extinction)',
    diameter: 10000,
    velocity: 20,
    location: { lat: 21.3, lon: -89.5 },
    energy: 100000000 // 100 million megatons
  },
  {
    name: 'Tunguska Event',
    diameter: 60,
    velocity: 15,
    location: { lat: 60.9, lon: 101.9 },
    energy: 15 // 15 megatons
  }
  // ... more historical events
];
```

### Best Practices

1. **Always handle errors gracefully**
2. **Use fallback data for offline functionality**
3. **Cache API responses when possible**
4. **Respect rate limits**
5. **Validate data before processing**
6. **Log API usage for monitoring**

### Future Enhancements

- [ ] Real-time WebSocket connections
- [ ] Advanced filtering and search
- [ ] Asteroid trajectory predictions
- [ ] Impact probability calculations
- [ ] Custom date range selection
- [ ] Export functionality for data
