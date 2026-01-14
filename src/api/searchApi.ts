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

    // 실제 API 응답 구조에 맞게 변환
    // TODO: 백엔드 응답 구조 확인 후 조정 필요
    if (data.articles) {
      return data.articles;
    }

    // 임시: documents를 articles 형태로 변환
    if (data.documents) {
      return data.documents.map((doc, index) => ({
        id: String(index + 1),
        title: doc.content.substring(0, 50) + '...',
        category: '검색결과',
        source: (doc.metadata?.source as string) || '국회',
        date: new Date().toISOString().split('T')[0],
        summary: doc.content,
        tags: [],
      }));
    }

    return [];
  } catch (error: unknown) {
    console.error('검색 API 오류:', error);
    const errorMessage =
      error instanceof Error ? error.message : '검색에 실패했습니다.';
    throw new Error(errorMessage);
  }
}
