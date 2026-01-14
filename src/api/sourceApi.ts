import { api } from '@/lib/axios';
import type { SourceDetail, SearchDocument } from '@/types/api';

/**
 * 특정 article의 출처 및 청크 정보 조회
 * Source.tsx에서 사용
 *
 * 주의: 현재 swagger에는 개별 문서 상세 엔드포인트가 없으므로
 * articleId를 쿼리로 검색하여 관련 문서 가져오기
 */
export async function getSourceDetail(
  articleId: string
): Promise<SourceDetail> {
  try {
    const response = await api.get('/api/search', {
      params: {
        q: `id:${articleId}`,
        limit: 5,
        use_hyde: false,
        enable_viz: false,
      },
    });

    const data = response.data;

    // TODO: 실제 백엔드 응답 구조에 맞게 변환
    // 현재는 documents를 chunks로 변환
    const chunks =
      data.documents?.map((doc: SearchDocument, index: number) => ({
        id: index + 1,
        content: doc.content || '',
        relevance: doc.relevance || 90,
        source: (doc.metadata?.source as string) || '국회 자료',
      })) || [];

    return {
      title: data.query || '문서 제목',
      chunks,
      references: [
        { title: '국회 의안정보시스템', url: '#', type: '공식' },
        { title: '관련 법안 자료', url: '#', type: '참고' },
      ],
    };
  } catch (error: unknown) {
    console.error('출처 데이터 조회 오류:', error);
    const errorMessage =
      error instanceof Error ? error.message : '출처 조회에 실패했습니다.';
    throw new Error(errorMessage);
  }
}
