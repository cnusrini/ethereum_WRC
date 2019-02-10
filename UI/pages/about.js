import Link from 'next/link'
import Layout from '../components/Layout'

export default () => (

    <Layout>
      <p>This is the about page</p>
      <Link href="/" style={{ fontSize: 20 }}>
        <button>Back to Home Page</button>
      </Link>
    </Layout>
  
)
