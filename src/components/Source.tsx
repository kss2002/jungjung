import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText,
  Link2,
  Quote,
  ChevronRight,
  Database,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { getSourceDetail } from '@/api/sourceApi';
import type { SourceDetail } from '@/types/api';
import { mockSourceData } from '@/../data/sources';

interface SourcePanelProps {
  selectedArticle: string | null;
}

export function Source({ selectedArticle }: SourcePanelProps) {
  const [data, setData] = useState<SourceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedArticle) {
      setData(null);
      return;
    }

    loadSourceDetail(selectedArticle);
  }, [selectedArticle]);

  const loadSourceDetail = async (articleId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const sourceDetail = await getSourceDetail(articleId);
      setData(sourceDetail);
    } catch (err) {
      console.error('출처 데이터 로드 실패:', err);
      setError('출처 정보를 불러올 수 없습니다.');
      // 에러 시 목업 데이터 사용
      if (mockSourceData[articleId]) {
        setData(mockSourceData[articleId]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 선택된 article이 없을 때
  if (!selectedArticle) {
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

  // 로딩 상태
  if (isLoading) {
    return (
      <Card className="border-border h-full">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-sm text-muted-foreground">출처 정보 로딩 중...</p>
        </CardContent>
      </Card>
    );
  }

  // 에러 상태
  if (error && !data) {
    return (
      <Card className="border-border h-full">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[400px] text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

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
