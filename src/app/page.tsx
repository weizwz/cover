import Head from './components/head'
import Main from './components/home'

export default function Home() {
  return (
    <div className='h-screen'>
      <Head className="max-w-360 m-auto"/>
      <Main />
    </div>
  )
}
