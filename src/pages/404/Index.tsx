import { Helmet } from 'react-helmet-async'
import NotFound from '../../components/General/NotFound'

export default function Index() {
  return (
    <div className='h-screen w-100 flex flex-column align-items-center'>
      <Helmet>
        <title>404 Not Found</title>
        <meta name="description" content="The page you are looking for does not exist" />
      </Helmet>
      <NotFound title='404 Not Found' description='The page you are looking for does not exist' />
    </div>
  )
}
