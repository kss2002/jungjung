// 목업 데이터 - Source.tsx에서 사용되던 sourceData
export const mockSourceData: Record<
  string,
  {
    title: string;
    chunks: {
      id: number;
      content: string;
      relevance: number;
      source: string;
    }[];
    references: { title: string; url: string; type: string }[];
  }
> = {
  '1': {
    title: '2026년도 제1회 추가경정예산안 국회 제출',
    chunks: [
      {
        id: 1,
        content:
          '정부는 2026년 1월 9일 국회에 2026년도 제1회 추가경정예산안을 제출하였다. 이번 추경 규모는 총 15조원으로...',
        relevance: 98,
        source: '기획재정위원회 보도자료',
      },
      {
        id: 2,
        content:
          '추경예산의 주요 편성 내역은 민생안정 지원 8조원, 경제활성화 4조원, 재해복구 3조원으로 구성되어 있다...',
        relevance: 95,
        source: '예산정책처 분석보고서',
      },
      {
        id: 3,
        content:
          '이번 추경은 최근 경기 둔화에 대응하고 서민경제를 지원하기 위한 목적으로 편성되었으며...',
        relevance: 87,
        source: '국회 본회의 회의록',
      },
    ],
    references: [
      { title: '기획재정부 보도자료', url: '#', type: '공식' },
      { title: '국회 의안정보시스템', url: '#', type: '공식' },
      { title: '예산정책처 분석', url: '#', type: '분석' },
    ],
  },
  '2': {
    title: '인공지능 산업 진흥 및 윤리에 관한 법률안',
    chunks: [
      {
        id: 1,
        content:
          '본 법률안은 인공지능 기술의 건전한 발전과 국민의 권익 보호를 위하여 인공지능 산업 진흥 및 윤리에 관한 기본적인 사항을 정함을 목적으로 한다...',
        relevance: 99,
        source: '의안원문',
      },
      {
        id: 2,
        content:
          'AI 윤리원칙에는 인간 존엄성 존중, 프라이버시 보호, 다양성 존중, 투명성 보장, 책임성 확보 등이 포함된다...',
        relevance: 92,
        source: '법안 검토보고서',
      },
    ],
    references: [
      { title: '의안정보시스템 원문', url: '#', type: '공식' },
      { title: '과기정통부 정책자료', url: '#', type: '참고' },
    ],
  },
};
