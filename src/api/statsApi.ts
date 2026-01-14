import { api } from '@/lib/axios';
import type { StatsData } from '@/types/api';

/**
 * 통계 데이터 조회 API
 * Stats.tsx에서 사용
 *
 * 주의: 현재 swagger에는 통계 전용 엔드포인트가 없으므로
 * /api/search를 활용하거나, 백엔드에 새 엔드포인트 추가 필요
 */
export async function getStats(): Promise<StatsData> {
  try {
    // 방법 1: 통계용 쿼리로 검색 API 활용
    const response = await api.get('/api/search', {
      params: {
        q: '통계',
        limit: 1,
      },
    });

    // TODO: 실제 백엔드 응답에서 통계 데이터 추출
    // 현재는 목업 데이터 구조로 반환
    console.log('Stats API response:', response.data);

    return {
      todayCount: 24,
      participantCount: 156,
      partyActivity: [
        { name: '더불어민주당', value: 42 },
        { name: '국민의힘', value: 38 },
        { name: '조국혁신당', value: 12 },
        { name: '기타', value: 8 },
      ],
      documentTypes: [
        { name: '법안', value: 45 },
        { name: '예산', value: 25 },
        { name: '청원', value: 20 },
        { name: '기타', value: 10 },
      ],
    };
  } catch (error: unknown) {
    console.error('통계 데이터 조회 오류:', error);
    const errorMessage =
      error instanceof Error ? error.message : '통계 조회에 실패했습니다.';
    throw new Error(errorMessage);
  }
}
