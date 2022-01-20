import Head from 'next/head';
import  { getContentList, getPage, getModifiedPage } from '/lib/api';
import markdownToHtml from '/lib/markdownToHtml';
import Layout from '/components/layout';
import Page from '/components/page';

export default function Index({ contentList, page, data }) {
  return (
    <>
      <Head>
        <title>Ground Zero - SuperteamDAO</title>
        <meta name="description" content="Learn basics of the crypto ecosystem for free!" />
        <link rel="icon" href="/images/logo.ico" />
      </Head>
      <Layout contentList={contentList}>
        <div className="container mx-auto px-5 py-10 min-h-100">
          <Page data={data} page={page} />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const contentList = getContentList();
  const {data, content} = getPage({
    path: "about",
    topic: "ground-zero"
  });
  const tempPage = await markdownToHtml(content || '');
  const page = await getModifiedPage(tempPage);
  return {
    props: { contentList, page, data },
  }
}
