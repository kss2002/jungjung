import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Sparkles,
  Clock,
  ExternalLink,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchArticles } from '@/api/searchApi';
import type { Article } from '@/types/api';
import { mockArticles } from '@/../data/articles';

interface MainContentProps {
  onSelectArticle: (id: string | null) => void;
  selectedArticle: string | null;
}

export function Content({
  onSelectArticle,
  selectedArticle,
}: MainContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    loadInitialArticles();
  }, []);

  const loadInitialArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await searchArticles('최신 국회 자료', { limit: 5 });
      setArticles(data.length > 0 ? data : mockArticles);
    } catch (err) {
      console.error('초기 데이터 로드 실패:', err);
      setError('데이터를 불러오는데 실패했습니다.');
      setArticles(mockArticles);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await searchArticles(searchQuery, { limit: 10 });
      setArticles(data.length > 0 ? data : mockArticles);
    } catch (err) {
      console.error('검색 실패:', err);
      setError('검색에 실패했습니다. 다시 시도해주세요.');
      setArticles(mockArticles);
    } finally {
      setIsLoading(false);
    }
  };

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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={isLoading}
              className="pl-10 pr-24 h-12 bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              size="sm"
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-1" />
              )}
              AI 검색
            </Button>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent"
              onClick={() => {
                setSearchQuery('최신 법안');
                handleSearch();
              }}
            >
              최신 법안
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent"
              onClick={() => {
                setSearchQuery('예산안');
                handleSearch();
              }}
            >
              예산안
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-accent"
              onClick={() => {
                setSearchQuery('인기 키워드');
                handleSearch();
              }}
            >
              인기 키워드
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 에러 메시지 */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* 피드 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          최신 국회 자료
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{isLoading ? '검색 중...' : '방금 업데이트됨'}</span>
        </div>
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* 피드 리스트 */}
      {!isLoading && (
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
      )}
    </div>
  );
}
