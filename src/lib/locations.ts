export interface Location {
  location: string
  imageSrc: string
  locationName: string
  address: string
  mapUrl: string
  phoneNumber: string
  horarios?: string
  active: boolean
}

/**
 * Devuelve solo las sedes con active === true (visibles en la app).
 */
export function getActiveLocations (): Location[] {
  return locations.filter((loc) => loc.active)
}

/**
 * Busca una sede por su slug (campo `location`), activa o inactiva.
 * Útil para rutas como /sede/[slug] donde se muestran todas las sedes.
 */
export function getLocationBySlug (slug: string): Location | undefined {
  return locations.find((loc) => loc.location === slug)
}

/**
 * Busca una sede activa por su slug. Devuelve undefined si no existe o está inactiva.
 * Útil para rutas donde solo deben mostrarse sedes activas (ej. /horarios/[sede]).
 */
export function getActiveLocationBySlug (slug: string): Location | undefined {
  return getActiveLocations().find((loc) => loc.location === slug)
}

export const locations: Location[] = [
  {
    location: 'office',
    imageSrc: '/images/clic_officepark.png',
    locationName: 'Pilar - Office',
    address: 'Av. 12 de Octubre 2961, Pilar',
    mapUrl: 'https://maps.app.goo.gl/qqpVPALUWsdH14Zx5',
    phoneNumber: '+54 9 11 2689-4398',
    horarios: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6A317rUg_caHPZuzuFTjj6ieE8lmMflSu044aVaItr09FpjfDeGE9niybzQ7TqrvQ7HhASTXWMYra/pubhtml?gid=954425039&single=true',
    active: true
  },
  {
    location: 'pilara',
    imageSrc: '/images/clic_pilara.png',
    locationName: 'PILARÁ',
    address: 'Paseo Estación Pilará',
    mapUrl: 'https://maps.app.goo.gl/tiyUmw2py2m7Fegs6',
    phoneNumber: '+54 9 11 2650-9533',
    active: true
  },
  {
    location: 'nordelta',
    imageSrc: '/images/clic_nordelta.jpg',
    locationName: 'Nordelta',
    address: 'Av. del Puerto 955, Nordelta',
    mapUrl: 'https://maps.app.goo.gl/KMzyLXX7gCPC7Bqw8',
    phoneNumber: '+54 9 11 2519-0076',
    active: true
  },
  {
    location: 'escobar',
    imageSrc: '/images/clic_escobar.png',
    locationName: 'ESCOBAR',
    address: 'Int. O. Larghi 1390, Escobar',
    mapUrl: 'https://maps.app.goo.gl/zfEAiiW8xAr2nRve6',
    phoneNumber: '+54 9 11 3336-6571',
    active: true
  },
  {
    location: 'soho',
    imageSrc: '/images/clic_soho.jpg',
    locationName: 'Palermo Soho',
    address: 'Fray Justo Sta. María de Oro 2150, CABA',
    mapUrl: 'https://maps.app.goo.gl/TtK218sy38U6P52Y6',
    phoneNumber: '+54 9 11 5457-3847',
    active: true
  },
  {
    location: 'hollywood',
    imageSrc: '/images/clic_hollywood.jpg',
    locationName: 'Palermo Hollywood',
    address: 'Av. Dorrego 1789, CABA',
    mapUrl: 'https://maps.app.goo.gl/xzvAYTnRhuE386Gs6',
    phoneNumber: '+54 9 11 3284-9318',
    active: true
  },
  {
    location: 'belgrano',
    imageSrc: '/images/clic_belgrano.jpg',
    locationName: 'Belgrano C',
    address: 'Av. del Libertador 5990, CABA',
    mapUrl: 'https://maps.app.goo.gl/CWJRj2SMZRkLkDp19',
    phoneNumber: '+54 9 11 6657-8230',
    active: true
  },
  {
    location: 'olivos',
    imageSrc: '/images/clic_olivos.jpg',
    locationName: 'Olivos',
    address: 'Av. del Libertador 2451, Olivos',
    mapUrl: 'https://maps.app.goo.gl/sGHvGie1aXEkPHUe9',
    phoneNumber: '+54 9 11 5881-1377',
    active: true
  },
  {
    location: 'nunez',
    imageSrc: '/images/nunez.jpg',
    locationName: 'Nuñez',
    address: 'Av. del Libertador 7274, CABA',
    mapUrl: 'https://maps.app.goo.gl/ZzPA3RAcWdVb6Qbr9',
    phoneNumber: '+54 9 11 3228-3985',
    active: true
  }
  ,
  {
    location: 'prueba',
    imageSrc: '/images/nunez.jpg',
    locationName: 'Nuñez',
    address: 'Av. del Libertador 7274',
    mapUrl: 'https://maps.app.goo.gl/ZzPA3RAcWdVb6Qbr9',
    phoneNumber: '+54 9 11 3228-3985',
    active: false
  }
]
