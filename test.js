const obj = {
  author: {
    username: 'sergey123',
    image: 'https://cv6.litres.ru/pub/c/cover_max1500/66830367.jpg',
    following: false,
  },
  body: '12345',
  createdAt: '2023-10-14T16:22:21.991Z',
  description: '12345',
  favorited: true,
  favoritesCount: 1,
  slug: '12345-67sfns',
  tagList: [],
  title: '12345',
  updatedAt: '2023-10-14T16:23:12.480Z',
}

// const nearticlewUser = {
//   // author: {
//   //   username: user.userName,
//   //   image: user.image,
//   //   following: false,
//   // },
//   body: data.body,
//   // createdAt: new Date().toISOString(),
//   description: data.description,
//   // favorited: true,
//   // favoritesCount: 0,
//   // slug: '123432432423423445-67sfns',
//   tags: tags,
//   title: data.title,
//   // updatedAt: new Date().toISOString(),
// }
// // slug: '12345-67sfns',

// const Main = ({ history }) => {
//   const [pathname, setPathname] = useState(null)
//   useEffect(() => {
//     const savedPath = localStorage.getItem('path')
//     if (savedPath) {
//       console.log(savedPath)
//       history.push(savedPath)
//     } else {
//       localStorage.setItem('path', history.location.pathname)
//       setPathname(history.location.pathname)
//     }
//   }, [])
//   useEffect(() => {
//     localStorage.setItem('path', history.location.pathname)
//   }, [history.location.pathnameathname])
//   // if (history.location.pathname !== his) {
//   //   return <Redirect to={history.location.pathname} />
//   // }
