export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-primary">정정당당</p>
            </div>
            <p className="hidden sm:inline-block text-sm text-muted-foreground border-l border-border pl-3">
              AI 기반 국회 자료 플랫폼
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
