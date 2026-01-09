import { useState } from 'react';
import { Content } from '@/components/Content';
import { Header } from '@/components/Header';
import { Source } from '@/components/Source';
import { Stats } from '@/components/Stats';

export const App = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 왼쪽 - 그래프 패널 */}
            <aside className="lg:col-span-3">
              <Stats />
            </aside>

            {/* 중앙 - 메인 콘텐츠 (검색 + 피드) */}
            <section className="lg:col-span-6">
              <Content
                onSelectArticle={setSelectedArticle}
                selectedArticle={selectedArticle}
              />
            </section>

            {/* 오른쪽 - 출처 및 청크 패널 */}
            <aside className="lg:col-span-3">
              <Source selectedArticle={selectedArticle} />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};
