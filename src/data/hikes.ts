import type { Hike } from './types'

export const hikes: Hike[] = [
  {
    id: 'hike-seven-hanging-valleys',
    name: 'Seven Hanging Valleys Trail (PR1 LGA)',
    category: 'hike',
    tripId: 'algarve',
    coords: [37.09017, -8.41283],
    description:
      'Cliff-top trail from Praia da Marinha along the Algarve\'s most photographed coast. Sea arches, the Benagil cave overhead, swims off small beaches. 5.7 km one-way — leave Alvor by 08:00 to beat the heat and the parking crunch.',
    distanceKm: 11.4,
    durationHours: 4,
    difficulty: 'moderate',
    tags: ['carvoeiro', 'coastal', 'must-do'],
    links: [
      {
        label: 'AllTrails — PR1 LGA',
        url: 'https://www.alltrails.com/trail/portugal/faro/pr1-lga-sete-vales-suspensos',
      },
    ],
    photos: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Praia_da_Marinha_(2012-09-27),_by_Klugschnacker_in_Wikipedia_(86).JPG/1280px-Praia_da_Marinha_(2012-09-27),_by_Klugschnacker_in_Wikipedia_(86).JPG',
        caption: 'Praia da Marinha — the trail starts above this beach',
        credit: 'Wikimedia / CC BY-SA',
      },
    ],
  },
]
