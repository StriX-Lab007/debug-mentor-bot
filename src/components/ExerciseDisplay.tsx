import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Code, Target, TestTube, Trophy } from 'lucide-react';

export interface Exercise {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  functionStub: string;
  testCases: Array<{
    input: any[];
    expected: any;
    description: string;
  }>;
  hints: string[];
}

interface ExerciseDisplayProps {
  exercise: Exercise | null;
  isLoading: boolean;
}

export function ExerciseDisplay({ exercise, isLoading }: ExerciseDisplayProps) {
  const [userCode, setUserCode] = useState('');
  const [showHints, setShowHints] = useState(false);

  if (isLoading) {
    return (
      <Card className="bg-gradient-card border-code-border shadow-card">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-sm text-muted-foreground">Generating exercise...</span>
          </div>
        </div>
      </Card>
    );
  }

  if (!exercise) {
    return (
      <Card className="bg-gradient-card border-code-border shadow-card">
        <div className="p-6 text-center text-muted-foreground">
          <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Generate an exercise to start practicing</p>
        </div>
      </Card>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-syntax-string/20 text-syntax-string border-syntax-string/30';
      case 'medium':
        return 'bg-syntax-warning/20 text-syntax-warning border-syntax-warning/30';
      case 'hard':
        return 'bg-syntax-error/20 text-syntax-error border-syntax-error/30';
      default:
        return 'bg-syntax-function/20 text-syntax-function border-syntax-function/30';
    }
  };

  return (
    <Card className="bg-gradient-card border-code-border shadow-card">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{exercise.title}</h3>
              <Badge variant="outline" className={getDifficultyColor(exercise.difficulty)}>
                {exercise.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{exercise.description}</p>
          </div>
        </div>

        {/* Function Stub */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-syntax-function" />
            <span className="text-sm font-medium text-foreground">Function Template</span>
          </div>
          <div className="bg-code-bg border border-code-border rounded-lg p-3">
            <pre className="text-sm font-mono text-foreground">{exercise.functionStub}</pre>
          </div>
        </div>

        {/* Test Cases */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TestTube className="w-4 h-4 text-syntax-keyword" />
            <span className="text-sm font-medium text-foreground">Test Cases</span>
          </div>
          <div className="space-y-2">
            {exercise.testCases.map((testCase, index) => (
              <div key={index} className="bg-code-bg border border-code-border rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">{testCase.description}</div>
                <div className="text-sm font-mono">
                  <span className="text-syntax-function">Input:</span>{' '}
                  <span className="text-syntax-string">{JSON.stringify(testCase.input)}</span>
                </div>
                <div className="text-sm font-mono">
                  <span className="text-syntax-function">Expected:</span>{' '}
                  <span className="text-syntax-keyword">{JSON.stringify(testCase.expected)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Your Solution</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUserCode(exercise.functionStub)}
              className="text-xs"
            >
              Reset
            </Button>
          </div>
          <Textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="font-mono text-sm bg-code-bg border-code-border min-h-[150px] resize-none"
            placeholder="Write your solution here..."
          />
        </div>

        {/* Hints */}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHints(!showHints)}
            className="mb-3"
          >
            {showHints ? 'Hide' : 'Show'} Hints ({exercise.hints.length})
          </Button>
          {showHints && (
            <div className="space-y-2">
              {exercise.hints.map((hint, index) => (
                <div key={index} className="bg-code-bg border border-code-border rounded-lg p-3">
                  <div className="text-sm text-foreground">
                    <span className="text-syntax-warning font-medium">Hint {index + 1}:</span> {hint}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}