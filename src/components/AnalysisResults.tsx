import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';

export interface AnalysisResult {
  type: 'error' | 'warning' | 'info' | 'suggestion';
  message: string;
  line?: number;
  severity: 'high' | 'medium' | 'low';
}

export interface CodeAnalysis {
  issues: AnalysisResult[];
  metrics: {
    complexity: number;
    maintainability: string;
    functions: number;
    lines: number;
  };
  suggestions: string[];
}

interface AnalysisResultsProps {
  analysis: CodeAnalysis | null;
  isLoading: boolean;
}

export function AnalysisResults({ analysis, isLoading }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <Card className="bg-gradient-card border-code-border shadow-card">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-sm text-muted-foreground">Analyzing code...</span>
          </div>
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="bg-gradient-card border-code-border shadow-card">
        <div className="p-6 text-center text-muted-foreground">
          <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Click "Analyze Code" to get insights about your code</p>
        </div>
      </Card>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-syntax-error" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-syntax-warning" />;
      case 'suggestion':
        return <Zap className="w-4 h-4 text-primary" />;
      default:
        return <Info className="w-4 h-4 text-syntax-function" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-syntax-error/20 text-syntax-error border-syntax-error/30';
      case 'medium':
        return 'bg-syntax-warning/20 text-syntax-warning border-syntax-warning/30';
      default:
        return 'bg-syntax-function/20 text-syntax-function border-syntax-function/30';
    }
  };

  return (
    <Card className="bg-gradient-card border-code-border shadow-card">
      <div className="p-6 space-y-6">
        {/* Metrics */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Code Metrics</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-code-bg rounded-lg p-3 border border-code-border">
              <div className="text-2xl font-bold text-primary">{analysis.metrics.complexity}</div>
              <div className="text-xs text-muted-foreground">Complexity</div>
            </div>
            <div className="bg-code-bg rounded-lg p-3 border border-code-border">
              <div className="text-2xl font-bold text-syntax-string">{analysis.metrics.functions}</div>
              <div className="text-xs text-muted-foreground">Functions</div>
            </div>
            <div className="bg-code-bg rounded-lg p-3 border border-code-border">
              <div className="text-2xl font-bold text-syntax-function">{analysis.metrics.lines}</div>
              <div className="text-xs text-muted-foreground">Lines</div>
            </div>
            <div className="bg-code-bg rounded-lg p-3 border border-code-border">
              <div className="text-sm font-bold text-syntax-keyword">{analysis.metrics.maintainability}</div>
              <div className="text-xs text-muted-foreground">Maintainability</div>
            </div>
          </div>
        </div>

        {/* Issues */}
        {analysis.issues.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Issues Found</h3>
            <div className="space-y-2">
              {analysis.issues.map((issue, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-code-bg rounded-lg border border-code-border"
                >
                  {getIcon(issue.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                        {issue.severity}
                      </Badge>
                      {issue.line && (
                        <Badge variant="outline" className="text-xs">
                          Line {issue.line}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-foreground">{issue.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {analysis.suggestions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Suggestions</h3>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-code-bg rounded-lg border border-code-border"
                >
                  <CheckCircle className="w-4 h-4 text-syntax-string mt-0.5" />
                  <p className="text-sm text-foreground">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}