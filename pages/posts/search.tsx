import DefaultLayout from '../../components/layout/default';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Container from '../../components/ui/container';
import dynamic from 'next/dynamic';

const Search = dynamic(
  () => import('../../helpers/search').then((mod) => mod.Search),
  { ssr: false },
);

export default function SearchPage() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('Pages.post.search.title')}</title>
      </Head>
      <Container>
        <Search />
      </Container>
    </>
  );
}

SearchPage.Layout = DefaultLayout;
