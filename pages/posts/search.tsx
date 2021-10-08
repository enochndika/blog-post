import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

import DefaultLayout from '@/layout/default';
import Container from '@/components/ui/container';

const Search = dynamic(() => import('@/modules/others/search'), {
  ssr: false,
});

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
