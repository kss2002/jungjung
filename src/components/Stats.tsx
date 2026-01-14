import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Users,
  FileText,
  Activity,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getStats } from '@/api/statsApi';
import type { StatsData } from '@/types/api';
import { mockBarData, mockPieData } from '@/../data/stats';

const COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
];

export function Stats() {
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getStats();
      setStatsData(data);
    } catch (err) {
      console.error('통계 데이터 로드 실패:', err);
      setError('통계를 불러올 수 없습니다.');
      // 에러 시 목업 데이터 사용
      setStatsData({
        todayCount: 24,
        participantCount: 156,
        partyActivity: mockBarData,
        documentTypes: mockPieData,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="border-border">
          <CardContent className="p-8 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // 에러 상태
  if (error && !statsData) {
    return (
      <div className="space-y-4">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 요약 카드들 */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">오늘 발의</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {statsData?.todayCount || 0}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">참여 의원</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">
              {statsData?.participantCount || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 정당별 활동 현황 */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            정당별 활동 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={statsData?.partyActivity || mockBarData}
              layout="vertical"
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                tick={{ fontSize: 11, fill: 'var(--color-muted-foreground)' }}
                axisLine={false}
                tickLine={false}
              />
              <Bar
                dataKey="value"
                fill="var(--color-primary)"
                radius={[0, 4, 4, 0]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 자료 유형 분포 */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            자료 유형 분포
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={statsData?.documentTypes || mockPieData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {(statsData?.documentTypes || mockPieData).map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {(statsData?.documentTypes || mockPieData).map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name}
                </span>
                <span className="text-xs font-medium text-foreground ml-auto">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
