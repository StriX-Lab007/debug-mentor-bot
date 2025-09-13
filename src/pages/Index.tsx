import { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { AnalysisResults, CodeAnalysis } from '@/components/AnalysisResults';
import { ExerciseDisplay, Exercise } from '@/components/ExerciseDisplay';
import { analyzeCode } from '@/utils/codeAnalyzer';
import { generateExercise } from '@/utils/exerciseGenerator';
import { Code2, Brain, Zap } from 'lucide-react';

const Index = () => {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAnalyze = async (code: string) => {
    setIsAnalyzing(true);
    // Simulate API delay for better UX
    setTimeout(() => {
      const result = analyzeCode(code);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleGenerateExercise = async (difficulty: 'easy' | 'medium' | 'hard') => {
    setIsGenerating(true);
    // Simulate API delay for better UX
    setTimeout(() => {
      const newExercise = generateExercise(difficulty);
      setExercise(newExercise);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Code Assistant
              </h1>
              <p className="text-sm text-muted-foreground">
                Analyze your code and practice with intelligent exercises
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Code Editor */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Code Analysis</h2>
            </div>
            <CodeEditor 
              onAnalyze={handleAnalyze}
              onGenerateExercise={handleGenerateExercise}
            />
            <AnalysisResults 
              analysis={analysis}
              isLoading={isAnalyzing}
            />
          </div>

          {/* Right Column - Exercise Display */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Practice Exercises</h2>
            </div>
            <ExerciseDisplay 
              exercise={exercise}
              isLoading={isGenerating}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>AI-Powered Code Learning Assistant • Built with React, TypeScript & Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;