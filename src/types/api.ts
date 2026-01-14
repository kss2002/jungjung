// API 타입 정의 (swagger.json 기반)

// ===== 공통 타입 =====
export interface ApiError {
  message: string;
  detail?: unknown;
}

// ===== /api/search 관련 타입 =====
export interface SearchParams {
  q: string;
  limit?: number;
  use_hyde?: boolean;
  enable_viz?: boolean;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  source: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface SearchDocument {
  content: string;
  metadata?: Record<string, unknown>;
  relevance?: number;
}

export interface SearchResponse {
  query: string;
  route: 'rag' | 'general';
  answer?: string;
  documents?: SearchDocument[];
  visualization?: unknown;
  articles?: Article[]; // 실제 응답 구조에 맞게 조정 필요
}

// ===== 통계 관련 타입 =====
export interface StatsData {
  todayCount: number;
  participantCount: number;
  partyActivity: { name: string; value: number }[];
  documentTypes: { name: string; value: number }[];
}

// ===== 출처/청크 관련 타입 =====
export interface Chunk {
  id: number;
  content: string;
  relevance: number;
  source: string;
}

export interface Reference {
  title: string;
  url: string;
  type: string;
}

export interface SourceDetail {
  title: string;
  chunks: Chunk[];
  references: Reference[];
}
