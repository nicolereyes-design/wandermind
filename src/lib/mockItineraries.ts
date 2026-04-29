import type { Itinerary } from '@/types/itinerary'

export const MOCK_ITINERARIES: Itinerary[] = [
  {
    title: '7 jours au Japon — culture & gastronomie',
    destination: 'Tokyo & Kyoto',
    summary:
      'Une immersion totale entre modernité tokyoïte et traditions millénaires de Kyoto. Temples, marchés de rue, ryokans et gastronomie étoilée.',
    tags: ['Culture', 'Gastronomie', 'Temples', 'Budget moyen'],
    days: [
      {
        day: 1,
        theme: 'Arrivée à Tokyo — premiers pas',
        activities: [
          { time: '14h00', name: 'Arrivée à Narita / Haneda', description: 'Navette express vers le centre-ville', type: 'transport' },
          { time: '17h00', name: 'Check-in hôtel Shinjuku', description: 'Boutique hôtel design dans le quartier animé', type: 'accommodation' },
          { time: '19h30', name: 'Izakaya Omoide Yokocho', description: 'Dîner dans les ruelles des "Alées de la Nostalgie"', type: 'food' },
        ],
      },
      {
        day: 2,
        theme: 'Shibuya & Harajuku',
        activities: [
          { time: '09h00', name: 'Sanctuaire Meiji-jingū', description: 'Forêt sacrée au cœur de la ville', type: 'activity' },
          { time: '12h00', name: 'Takeshita Street', description: 'Street food et mode alternative', type: 'activity' },
          { time: '18h00', name: 'Carrefour de Shibuya', description: "L'intersection la plus fréquentée du monde", type: 'activity' },
          { time: '20h00', name: 'Yakitori sous les rails', description: 'Brochettes et bière Sapporo', type: 'food' },
        ],
      },
      {
        day: 3,
        theme: 'Voyage vers Kyoto',
        activities: [
          { time: '08h00', name: 'Shinkansen Tokyo → Kyoto', description: '2h15 de trajet à 320 km/h', type: 'transport' },
          { time: '11h00', name: 'Fushimi Inari', description: 'Milliers de torii vermillon sur la colline', type: 'activity' },
          { time: '15h00', name: 'Quartier de Gion', description: 'Maisons de thé et geishas traditionnelles', type: 'activity' },
          { time: '19h00', name: 'Kaiseki dinner', description: 'Gastronomie japonaise raffinée en 8 services', type: 'food' },
        ],
      },
    ],
  },
  {
    title: '7 jours au Portugal — soleil & authenticité',
    destination: 'Lisbonne & Porto',
    summary:
      'Entre les azulejos de Lisbonne et les caves à vins de Porto, découvrez un pays où le temps s\'étire doucement au rythme du fado.',
    tags: ['Gastronomie', 'Vie urbaine', 'Architecture', 'Économique'],
    days: [
      {
        day: 1,
        theme: 'Arrivée à Lisbonne',
        activities: [
          { time: '13h00', name: 'Arrivée à l\'aéroport Humberto Delgado', description: 'Métro ligne rouge vers le centre', type: 'transport' },
          { time: '16h00', name: 'Quartier de l\'Alfama', description: 'Dédale de ruelles, miradouros et fado', type: 'activity' },
          { time: '20h00', name: 'Pastel de nata chez Pastéis de Belém', description: 'L\'original depuis 1837', type: 'food' },
        ],
      },
      {
        day: 2,
        theme: 'Lisbonne — Belém & Baixa',
        activities: [
          { time: '09h00', name: 'Tour de Belém', description: 'Symbole de l\'ère des découvertes', type: 'activity' },
          { time: '11h00', name: 'Monastère des Jerónimos', description: 'Chef-d\'œuvre manuélin classé UNESCO', type: 'activity' },
          { time: '14h00', name: 'LX Factory', description: 'Marché créatif dans une ancienne usine', type: 'activity' },
          { time: '19h30', name: 'Marisqueira', description: 'Fruits de mer frais et vinho verde', type: 'food' },
        ],
      },
      {
        day: 3,
        theme: 'Train vers Porto',
        activities: [
          { time: '08h30', name: 'Train Alfa Pendular vers Porto', description: '3h de trajet côtier', type: 'transport' },
          { time: '12h00', name: 'Livraria Lello', description: 'La plus belle librairie du monde', type: 'activity' },
          { time: '15h00', name: 'Cave Sandeman à Vila Nova de Gaia', description: 'Dégustation de Porto tawny 20 ans', type: 'activity' },
          { time: '20h00', name: 'Francesinha au café Santiago', description: 'Le sandwich emblématique de Porto', type: 'food' },
        ],
      },
    ],
  },
  {
    title: '7 jours au Mexique — nature & aventure',
    destination: 'Oaxaca & Côte Pacifique',
    summary:
      'Des marchés colorés de Oaxaca aux vagues de Puerto Escondido, un voyage entre jungle, océan et cuisine indigène classée au patrimoine UNESCO.',
    tags: ['Aventure', 'Nature', 'Gastronomie', 'Plage'],
    days: [
      {
        day: 1,
        theme: 'Arrivée à Oaxaca',
        activities: [
          { time: '15h00', name: 'Arrivée aéroport Xoxocotlán', description: 'Taxi collectif vers le zócalo', type: 'transport' },
          { time: '17h30', name: 'Marché 20 de Noviembre', description: 'Tlayudas, chapulines et mole negro', type: 'food' },
          { time: '20h00', name: 'Mezcalería en el centro', description: 'Dégustation de mezcal artisanal', type: 'activity' },
        ],
      },
      {
        day: 2,
        theme: 'Monte Albán & artisanat',
        activities: [
          { time: '08h00', name: 'Site archéologique de Monte Albán', description: 'Cité zapotèque dominant la vallée', type: 'activity' },
          { time: '13h00', name: 'Pueblo de Teotitlán del Valle', description: 'Tissage traditionnel zapotèque', type: 'activity' },
          { time: '19h00', name: 'Clase de cocina oaxaqueña', description: 'Préparation du mole en 7 ingrédients', type: 'food' },
        ],
      },
      {
        day: 3,
        theme: 'Route vers la côte',
        activities: [
          { time: '07h00', name: 'Navette Oaxaca → Puerto Escondido', description: '5h de route sinueuse à travers la Sierra', type: 'transport' },
          { time: '13h00', name: 'Playa Zicatela', description: 'La "Pipeline mexicaine" — vagues légendaires', type: 'activity' },
          { time: '18h00', name: 'Coucher de soleil sur Playa Carrizalillo', description: 'Crique protégée aux eaux turquoise', type: 'free' },
          { time: '20h00', name: 'Ceviche au bord de l\'eau', description: 'Ceviche mixto et agua de Jamaica', type: 'food' },
        ],
      },
    ],
  },
]
