import type { ScenicSpot } from './types'

export const scenicSpots: ScenicSpot[] = [
  {
    id: 'scenic-porto-covo',
    name: 'Porto Covo',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.85250, -8.79000],
    description:
      'Small whitewashed fishing village on the Alentejo cliffs, opposite Ilha do Pessegueiro. Cobbled square, a handful of seafood spots — good lunch stop on the drive down.',
    bestTime: 'midday',
    tags: ['road-trip-stop', 'alentejo'],
  },
  {
    id: 'scenic-vila-nova-de-milfontes',
    name: 'Vila Nova de Milfontes',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.72500, -8.78100],
    description:
      'Town at the mouth of the Mira river, popular base for the Costa Vicentina. Calm river beach on one side, Atlantic surf on the other — handy halfway stop on the Lisbon-to-Aljezur run.',
    bestTime: 'midday',
    tags: ['road-trip-stop', 'alentejo', 'river-mouth'],
  },
  {
    id: 'scenic-cabo-de-sao-vicente',
    name: 'Cabo de São Vicente',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.02300, -8.99644],
    description:
      'South-westernmost point of mainland Europe — sheer 75 m cliffs, a working lighthouse and big Atlantic views. The road runs out here; sunset is the moment.',
    bestTime: 'sunset',
    tags: ['lighthouse', 'sw-corner', 'sagres'],
  },
  {
    id: 'scenic-sagres-fort',
    name: 'Fortaleza de Sagres',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.00080, -8.94770],
    description:
      'Wind-blasted promontory fort on the cliffs above Sagres town, traditionally tied to Henry the Navigator. Mostly the views and the giant compass rose — but the walk around the headland is the draw.',
    bestTime: 'morning',
    tags: ['sagres', 'fort', 'sw-corner'],
  },
  {
    id: 'scenic-silves',
    name: 'Silves',
    category: 'scenic',
    tripId: 'algarve',
    coords: [37.19010, -8.43840],
    description:
      'Inland Algarve town built around a red-sandstone Moorish castle, once the regional capital. Cobbled lanes, the old cathedral, and a short walk down to the river.',
    bestTime: 'morning',
    tags: ['castle', 'inland', 'algarve-history'],
  },
  {
    id: 'scenic-lagos-old-town',
    name: 'Lagos Old Town',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.10280, -8.67350],
    description:
      'Walled old town with marina, sea-walks out to Ponta da Piedade, and an easy strip of bars and restaurants. The main hub of the western Algarve.',
    bestTime: 'sunset',
    tags: ['old-town', 'marina', 'sw-algarve'],
  },
  {
    id: 'scenic-tavira',
    name: 'Tavira',
    category: 'scenic',
    tripId: 'algarve',
    coords: [37.12730, -7.64910],
    description:
      'Quiet eastern-Algarve town straddling the Gilão river, with a Roman bridge, ruined castle and rooftops in scissor-cut tile. Lagoon and barrier-island beaches a short ferry away.',
    bestTime: 'morning',
    tags: ['east-algarve', 'old-town', 'day-trip'],
  },
]
