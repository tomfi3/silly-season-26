import type { ScenicSpot } from './types'

export const scenicSpots: ScenicSpot[] = [
  {
    id: 'scenic-porto-covo',
    name: 'Porto Covo',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.85250, -8.79000],
    description:
      'Whitewashed Alentejo cliff village opposite the Ilha do Pessegueiro. Café in the square, fish lunch on the cobbles, hour-long stop on the drive south. Park outside the centre.',
    bestTime: 'midday',
    tags: ['road-trip-stop', 'alentejo'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Porto_Covo_pano_April_2009-4.jpg/1280px-Porto_Covo_pano_April_2009-4.jpg',
        caption: 'Porto Covo coast looking south',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
  {
    id: 'scenic-vila-nova-de-milfontes',
    name: 'Vila Nova de Milfontes',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.72500, -8.78100],
    description:
      'Bigger Alentejo town at the mouth of the Mira river. Calm river beach for a swim, Atlantic surf on the seaward side. Plenty of cafés for a proper lunch — roughly halfway to Aljezur.',
    bestTime: 'midday',
    tags: ['road-trip-stop', 'alentejo', 'river-mouth'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/V._Nova_de_Milfontes.JPG/1280px-V._Nova_de_Milfontes.JPG',
        caption: 'Vila Nova de Milfontes from the river',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
  {
    id: 'scenic-cabo-de-sao-vicente',
    name: 'Cabo de São Vicente',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.02300, -8.99644],
    description:
      'South-westernmost point of mainland Europe — 75 m cliffs, working lighthouse, end-of-the-road feel. Go at sunset; café in the lighthouse complex if it\'s open.',
    bestTime: 'sunset',
    tags: ['lighthouse', 'sw-corner', 'sagres'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Lighthouse_of_Cabo_de_São_Vicente.jpg/1280px-Lighthouse_of_Cabo_de_São_Vicente.jpg',
        caption: 'Cabo de São Vicente lighthouse',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
  {
    id: 'scenic-sagres-fort',
    name: 'Fortaleza de Sagres',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.00080, -8.94770],
    description:
      'Wind-blasted Henry-the-Navigator fort on the cliffs above Sagres. €3 entry, walk the headland for the views — the buildings themselves are sparse. Pair with Cabo de São Vicente.',
    bestTime: 'morning',
    tags: ['sagres', 'fort', 'sw-corner'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Fortaleza_de_Sagres_(2012-09-25),_by_Klugschnacker_in_Wikipedia_(46).JPG/1280px-Fortaleza_de_Sagres_(2012-09-25),_by_Klugschnacker_in_Wikipedia_(46).JPG',
        caption: 'Fortaleza de Sagres on the cliffs',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
  {
    id: 'scenic-silves',
    name: 'Silves',
    category: 'scenic',
    tripId: 'algarve',
    coords: [37.19010, -8.43840],
    description:
      'Inland Algarve town under a red-sandstone Moorish castle (Algarve\'s largest). Cobbled lanes, old cathedral, riverside cafés. Half-day from Alvor, especially if jeep tours stop here.',
    bestTime: 'morning',
    tags: ['castle', 'inland', 'algarve-history'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Silves_castle_-_ancient_capital_of_Algarve_-_The_Algarve,_Portugal_(1388874324).jpg/1280px-Silves_castle_-_ancient_capital_of_Algarve_-_The_Algarve,_Portugal_(1388874324).jpg',
        caption: 'Silves castle on the hill',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
  {
    id: 'scenic-lagos-old-town',
    name: 'Lagos Old Town',
    category: 'scenic',
    tripId: 'west-coast',
    coords: [37.10280, -8.67350],
    description:
      'Walled old town, marina, sea-walks out to the dramatic Ponta da Piedade cliffs. Western Algarve\'s main hub — busy in summer evenings, plenty of bars and dinner spots.',
    bestTime: 'sunset',
    tags: ['old-town', 'marina', 'sw-algarve'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Ponta_da_Piedade_(Lagos)_(Portugal)_(42218057361).jpg/1280px-Ponta_da_Piedade_(Lagos)_(Portugal)_(42218057361).jpg',
        caption: 'Ponta da Piedade cliffs west of Lagos',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
  {
    id: 'scenic-tavira',
    name: 'Tavira',
    category: 'scenic',
    tripId: 'algarve',
    coords: [37.12730, -7.64910],
    description:
      'Quiet eastern-Algarve town straddling the Gilão river. Roman bridge, ruined castle, scissor-cut rooftops. Barrier-island beaches by short ferry from town. 1.5 hr drive each way from Alvor.',
    bestTime: 'morning',
    tags: ['east-algarve', 'old-town', 'day-trip'],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Roman_bridge,_Tavira,_Portugal_(14583478126).jpg/1280px-Roman_bridge,_Tavira,_Portugal_(14583478126).jpg',
        caption: 'Roman bridge over the Gilão, Tavira',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
]
