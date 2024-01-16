import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MetaProps } from '@/types/commonTypes'

const MetaData: FC<MetaProps> = ({ title, desc }) => {
  const router = useRouter()
  const route = `https://thewiggleapp.com${router.pathname !== '/' ? `${router.pathname}/` : router.pathname}`

  return (
    <Head>
      <title>{`${title} - Wiggle`}</title>
      { desc && <meta name='description' content={desc} /> }
      <link rel='canonical' href={route} />
      <link rel='alternate' hrefLang='x-default' href={route} />
    </Head>
  )
}

export default MetaData