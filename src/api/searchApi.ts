import { api } from '@/lib/axios';
import type { SearchParams, SearchResponse, Article } from '@/types/api';

/**
 * /api/search 엔드포인트 호출
 * Content.tsx에서 사용
 */
export async function searchArticles(
  query: string,
  options?: Partial<SearchParams>
): Promise<Article[]> {
  try {
    const response = await api.get<SearchResponse>('/api/search', {
      params: {
        q: query,
        limit: options?.limit ?? 5,
        use_hyde: options?.use_hyde ?? true,
        enable_viz: options?.enable_viz ?? true,
      },
    });

    const data = response.data;

    // RAG 모드: documents가 있는 경우
    if (data.documents && data.documents.length > 0) {
      return data.documents.map((doc, index) => ({
        id: String(index + 1),
        title: doc.content.substring(0, 50) + '...',
        category: data.route === 'rag' ? 'RAG 검색' : '검색결과',
        source: (doc.metadata?.source as string) || '국회',
        date: new Date().toISOString().split('T')[0],
        summary: doc.content,
        tags: [],
      }));
    }

    // LLM 모드: answer가 있는 경우 (일반 응답)
    if (data.answer) {
      return [{
        id: '1',
        title: `AI 답변: ${query}`,
        category: data.route === 'LLM' ? 'AI 답변' : '검색결과',
        source: 'AI Assistant',
        date: new Date().toISOString().split('T')[0],
        summary: data.answer,
        tags: ['AI', '답변'],
      }];
    }

    // articles가 있는 경우 (기존 로직)
    if (data.articles) {
      return data.articles;
    }

    return [];
  } catch (error: unknown) {
    console.error('검색 API 오류:', error);
    const errorMessage =
      error instanceof Error ? error.message : '검색에 실패했습니다.';
    throw new Error(errorMessage);
  }
}
