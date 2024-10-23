export const clients = [...new Array(10)].map((client, index) => ({
    href: `/${index + 1}.avif`,
  }))
  export const products = [
    {
      title: 'Moonbeam',
      link: 'https://gomoonbeam.com',
      thumbnail: '/p1.avif',
    },
    {
      title: 'Cursor',
      link: 'https://cursor.so',
      thumbnail: '/p2.avif',
    },
    {
      title: 'Rogue',
      link: 'https://userogue.com',
      thumbnail: '/p3.avif',
    },]