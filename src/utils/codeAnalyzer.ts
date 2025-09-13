import { AnalysisResult, CodeAnalysis } from '@/components/AnalysisResults';

export function analyzeCode(code: string): CodeAnalysis {
  const lines = code.split('\n');
  const issues: AnalysisResult[] = [];
  const suggestions: string[] = [];

  // Basic syntax and pattern analysis
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmedLine = line.trim();

    // Check for console.log statements
    if (trimmedLine.includes('console.log')) {
      issues.push({
        type: 'warning',
        message: 'Console.log statement found - consider removing for production',
        line: lineNumber,
        severity: 'low'
      });
    }

    // Check for var usage
    if (trimmedLine.includes('var ')) {
      issues.push({
        type: 'suggestion',
        message: 'Consider using "let" or "const" instead of "var"',
        line: lineNumber,
        severity: 'medium'
      });
    }

    // Check for == instead of ===
    if (trimmedLine.includes('==') && !trimmedLine.includes('===')) {
      issues.push({
        type: 'warning',
        message: 'Use strict equality (===) instead of loose equality (==)',
        line: lineNumber,
        severity: 'medium'
      });
    }

    // Check for missing semicolons (simple check)
    if (trimmedLine.length > 0 && 
        !trimmedLine.endsWith(';') && 
        !trimmedLine.endsWith('{') && 
        !trimmedLine.endsWith('}') &&
        !trimmedLine.startsWith('//') &&
        !trimmedLine.startsWith('*') &&
        !trimmedLine.includes('if') &&
        !trimmedLine.includes('else') &&
        !trimmedLine.includes('for') &&
        !trimmedLine.includes('while') &&
        !trimmedLine.includes('function')) {
      issues.push({
        type: 'info',
        message: 'Missing semicolon',
        line: lineNumber,
        severity: 'low'
      });
    }

    // Check for empty catch blocks
    if (trimmedLine.includes('catch') && lines[index + 1]?.trim() === '}') {
      issues.push({
        type: 'error',
        message: 'Empty catch block - handle errors properly',
        line: lineNumber,
        severity: 'high'
      });
    }
  });

  // Function analysis
  const functionMatches = code.match(/function\s+\w+\s*\([^)]*\)/g) || [];
  const arrowFunctionMatches = code.match(/(?:const|let|var)\s+\w+\s*=\s*\([^)]*\)\s*=>/g) || [];
  const totalFunctions = functionMatches.length + arrowFunctionMatches.length;

  // Complexity analysis (simplified)
  const complexityKeywords = ['if', 'else', 'for', 'while', 'switch', 'case', 'catch'];
  let complexity = 1; // Base complexity
  complexityKeywords.forEach(keyword => {
    const matches = code.match(new RegExp(`\\b${keyword}\\b`, 'g'));
    if (matches) complexity += matches.length;
  });

  // Maintainability assessment
  let maintainability = 'Good';
  if (complexity > 10) maintainability = 'Poor';
  else if (complexity > 5) maintainability = 'Fair';

  // Generate suggestions
  if (totalFunctions === 0) {
    suggestions.push('Consider breaking code into smaller, reusable functions');
  }

  if (complexity > 7) {
    suggestions.push('High complexity detected - consider refactoring into smaller functions');
  }

  if (lines.length > 50) {
    suggestions.push('Large file detected - consider splitting into modules');
  }

  const uncommentedLines = lines.filter(line => 
    line.trim().length > 0 && !line.trim().startsWith('//')
  ).length;

  const commentRatio = (lines.length - uncommentedLines) / lines.length;
  if (commentRatio < 0.1 && lines.length > 20) {
    suggestions.push('Add more comments to improve code documentation');
  }

  return {
    issues,
    metrics: {
      complexity,
      maintainability,
      functions: totalFunctions,
      lines: lines.length
    },
    suggestions
  };
}