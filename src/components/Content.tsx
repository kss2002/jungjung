import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, Clock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MainContentProps {
  onSelectArticle: (id: string | null) => void;
  selectedArticle: string | null;
}

const articles = [
  {
    id: '1',
    title: '2026년도 제1회 추가경정예산안 국회 제출',
    category: '예산',
    source: '기획재정위원회',
    date: '2026.01.09',
    summary:
      '정부가 2026년도 제1회 추경예산안을 국회에 제출했습니다. 총 규모는 15조원이며, 민생안정 및 경제활성화에 중점을 두고 있습니다.',
    tags: ['추경', '예산안', '민생'],
  },
  {
    id: '2',
    title: '인공지능 산업 진흥 및 윤리에 관한 법률안',
    category: '법안',
    source: '과학기술정보방송통신위원회',
    date: '2026.01.08',
    summary:
      'AI 산업 발전을 위한 지원체계와 함께 AI 윤리 기준을 법제화하는 내용을 담고 있습니다.',
    tags: ['AI', '인공지능', '윤리'],
  },
  {
    id: '3',
    title: '청년 주거안정 지원에 관한 특별법 일부개정안',
    category: '법안',
    source: '국토교통위원회',
    date: '2026.01.08',
    summary:
      '청년층의 주거비 부담 완화를 위해 공공임대주택 공급 확대 및 전세자금 대출 지원을 강화하는 내용입니다.',
    tags: ['청년', '주거', '전세'],
  },
  {
    id: '4',
    title: '국정감사 증인 출석 요구의 건',
    category: '청원',
    source: '법제사법위원회',
    date: '2026.01.07',
    summary: '2025년도 국정감사 관련 증인 출석 요구가 의결되었습니다.',
    tags: ['국정감사', '증인'],
  },
  {
    id: '5',
    title: '기후위기 대응을 위한 탄소중립 기본법 개정안',
    category: '법안',
    source: '환경노동위원회',
    date: '2026.01.07',
    summary:
      '2050 탄소중립 목표 달성을 위한 중간 단계 목표를 강화하고, 기업의 탄소배출 감축 의무를 확대하는 내용입니다.',
    tags: ['탄소중립', '기후', '환경'],
  },
];

export function Content({
  onSelectArticle,
  selectedArticle,
}: MainContentProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* 검색 영역 */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="국회 자료를 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-24 h-12 bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              AI 검색
            </Button>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent"
            >
              최신 법안
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent"
            >
              예산안
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent"
            >
              인기 키워드
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 피드 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          최신 국회 자료
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>방금 업데이트됨</span>
        </div>
      </div>

      {/* 피드 리스트 */}
      <div className="space-y-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            className={cn(
              'border-border cursor-pointer transition-all hover:border-primary/50 hover:shadow-sm',
              selectedArticle === article.id && 'border-primary bg-accent/30'
            )}
            onClick={() => onSelectArticle(article.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="text-xs border-primary/30 text-primary"
                    >
                      {article.category}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {article.source}
                    </p>
                  </div>
                  <h3 className="font-medium text-foreground leading-tight mb-2 text-balance">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs text-muted-foreground">
                      {article.date}
                    </span>
                    <div className="flex gap-1.5 ml-auto">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs px-2 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
