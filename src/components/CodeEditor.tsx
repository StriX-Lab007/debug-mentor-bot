import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Play, Bug, BookOpen, Sparkles } from 'lucide-react';

interface CodeEditorProps {
  onAnalyze: (code: string) => void;
  onGenerateExercise: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

export function CodeEditor({ onAnalyze, onGenerateExercise }: CodeEditorProps) {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);

  const handleAnalyze = () => {
    onAnalyze(code);
  };

  return (
    <Card className="bg-gradient-card border-code-border shadow-card">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-syntax-warning"></div>
            <div className="w-3 h-3 rounded-full bg-syntax-string"></div>
            <span className="ml-4 text-sm text-muted-foreground font-mono">code-editor.js</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleAnalyze}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              size="sm"
            >
              <Bug className="w-4 h-4 mr-2" />
              Analyze Code
            </Button>
          </div>
        </div>

        <div className="relative">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm bg-code-bg border-code-border min-h-[300px] resize-none focus:ring-primary"
            placeholder="// Paste your code here for analysis..."
          />
          <div className="absolute top-2 right-2 text-xs text-muted-foreground">
            Lines: {code.split('\n').length}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => onGenerateExercise('easy')}
            variant="secondary"
            size="sm"
            className="hover:bg-gradient-accent"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Easy Exercise
          </Button>
          <Button
            onClick={() => onGenerateExercise('medium')}
            variant="secondary"
            size="sm"
            className="hover:bg-gradient-accent"
          >
            <Play className="w-4 h-4 mr-2" />
            Medium Exercise
          </Button>
          <Button
            onClick={() => onGenerateExercise('hard')}
            variant="secondary"
            size="sm"
            className="hover:bg-gradient-accent"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Hard Exercise
          </Button>
        </div>
      </div>
    </Card>
  );
}