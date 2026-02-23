export interface Location {
  location: string
  imageSrc: string
  locationName: string
  address: string
  mapUrl: string
  phoneNumber: string
  horarios?: string
}

export const locations: Location[] = [
  {
    location: 'office',
    imageSrc: '/images/clic_officepark.png',
    locationName: 'PILAR',
    address: 'Office Park',
    mapUrl: 'https://maps.app.goo.gl/qqpVPALUWsdH14Zx5',
    phoneNumber: '+54 9 11 2689-4398',
    horarios: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6A317rUg_caHPZuzuFTjj6ieE8lmMflSu044aVaItr09FpjfDeGE9niybzQ7TqrvQ7HhASTXWMYra/pubhtml?gid=954425039&single=true'
  },
  {
    location: 'pilara',
    imageSrc: '/images/clic_pilara.png',
    locationName: 'PILARÁ',
    address: 'Estación Pilará',
    mapUrl: 'https://maps.app.goo.gl/tiyUmw2py2m7Fegs6',
    phoneNumber: '+54 9 11 2650-9533'
  },
  {
    location: 'norldelta',
    imageSrc: '/images/clic_nordelta.jpg',
    locationName: 'Nordelta',
    address: 'Av. del Puerto 955',
    mapUrl: 'https://maps.app.goo.gl/KMzyLXX7gCPC7Bqw8',
    phoneNumber: '+54 9 11 2519-0076'
  },
  {
    location: 'escobar',
    imageSrc: '/images/clic_escobar.png',
    locationName: 'ESCOBAR',
    address: 'WorkClub',
    mapUrl: 'https://maps.app.goo.gl/zfEAiiW8xAr2nRve6',
    phoneNumber: '+54 9 11 3336-6571'
  },
  {
    location: 'soho',
    imageSrc: '/images/clic_soho.jpg',
    locationName: 'Palermo Soho',
    address: 'Fray Justo Sta. María de Oro 2150, CABA',
    mapUrl: 'https://maps.app.goo.gl/TtK218sy38U6P52Y6',
    phoneNumber: '+54 9 11 5457-3847'
  },
  {
    location: 'hollywood',
    imageSrc: '/images/clic_hollywood.jpg',
    locationName: 'Palermo Hollywood',
    address: 'Av. Dorrego 1789',
    mapUrl: 'https://maps.app.goo.gl/xzvAYTnRhuE386Gs6',
    phoneNumber: '+54 9 11 3284-9318'
  },
  {
    location: 'belgrano',
    imageSrc: '/images/clic_belgrano.jpg',
    locationName: 'Belgrano C',
    address: 'Av. del Libertador 5990',
    mapUrl: 'https://maps.app.goo.gl/CWJRj2SMZRkLkDp19',
    phoneNumber: '+54 9 11 6657-8230'
  },
  {
    location: 'olivos',
    imageSrc: '/images/clic_olivos.jpg',
    locationName: 'Olivos',
    address: 'Av. del Libertador 2451',
    mapUrl: 'https://maps.app.goo.gl/sGHvGie1aXEkPHUe9',
    phoneNumber: '+54 9 11 5881-1377'
  },
  {
    location: 'nunez',
    imageSrc: '/images/nunez.jpg',
    locationName: 'Nuñez',
    address: 'Av. del Libertador 7274',
    mapUrl: 'https://maps.app.goo.gl/ZzPA3RAcWdVb6Qbr9',
    phoneNumber: '+54 9 11 3228-3985'
  }
]
