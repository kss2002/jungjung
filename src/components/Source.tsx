import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Link2, Quote, ChevronRight, Database } from 'lucide-react';

interface SourcePanelProps {
  selectedArticle: string | null;
}

const sourceData: Record<
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

export function Source({ selectedArticle }: SourcePanelProps) {
  const data = selectedArticle ? sourceData[selectedArticle] : null;

  if (!data) {
    return (
      <Card className="border-border h-full">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[400px] text-center">
          <Database className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground text-sm">
            자료를 선택하면 출처와 근거 청크가
            <br />
            표시됩니다
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* 출처 섹션 */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            출처 및 참고 자료
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.references.map((ref, index) => (
            <a
              key={index}
              href={ref.url}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors group"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground group-hover:text-primary">
                  {ref.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {ref.type}
                </Badge>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </div>
            </a>
          ))}
        </CardContent>
      </Card>

      {/* 청크 섹션 */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <Quote className="h-4 w-4 text-primary" />
            근거 청크 (RAG)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[380px] pr-2">
            <div className="space-y-3">
              {data.chunks.map((chunk) => (
                <div
                  key={chunk.id}
                  className="p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      청크 #{chunk.id}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${chunk.relevance * 0.4}px` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {chunk.relevance}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-2">
                    {chunk.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    출처: {chunk.source}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
