import { Exercise } from '@/components/ExerciseDisplay';

const exercises = {
  easy: [
    {
      title: 'Sum of Two Numbers',
      description: 'Write a function that takes two numbers and returns their sum.',
      difficulty: 'easy' as const,
      functionStub: `function sum(a, b) {
  // Your code here
  return 0;
}`,
      testCases: [
        {
          input: [2, 3],
          expected: 5,
          description: 'Adding two positive numbers'
        },
        {
          input: [-1, 1],
          expected: 0,
          description: 'Adding negative and positive'
        },
        {
          input: [0, 0],
          expected: 0,
          description: 'Adding zeros'
        }
      ],
      hints: [
        'Use the + operator to add two numbers',
        'Return the result of a + b'
      ]
    },
    {
      title: 'Find Maximum',
      description: 'Write a function that finds the maximum number in an array.',
      difficulty: 'easy' as const,
      functionStub: `function findMax(numbers) {
  // Your code here
  return 0;
}`,
      testCases: [
        {
          input: [[1, 5, 3, 9, 2]],
          expected: 9,
          description: 'Find max in mixed numbers'
        },
        {
          input: [[-1, -5, -3]],
          expected: -1,
          description: 'Find max in negative numbers'
        }
      ],
      hints: [
        'Use Math.max() with spread operator',
        'Or use a loop to compare each number'
      ]
    }
  ],
  medium: [
    {
      title: 'Palindrome Checker',
      description: 'Write a function that checks if a string is a palindrome (reads the same forwards and backwards).',
      difficulty: 'medium' as const,
      functionStub: `function isPalindrome(str) {
  // Your code here
  return false;
}`,
      testCases: [
        {
          input: ['racecar'],
          expected: true,
          description: 'Simple palindrome'
        },
        {
          input: ['hello'],
          expected: false,
          description: 'Not a palindrome'
        },
        {
          input: ['A man a plan a canal Panama'],
          expected: true,
          description: 'Palindrome with spaces and caps'
        }
      ],
      hints: [
        'Remove spaces and convert to lowercase first',
        'Compare the string with its reverse',
        'Use split(), reverse(), and join() methods'
      ]
    },
    {
      title: 'FizzBuzz',
      description: 'Return an array where numbers divisible by 3 are "Fizz", by 5 are "Buzz", by both are "FizzBuzz".',
      difficulty: 'medium' as const,
      functionStub: `function fizzBuzz(n) {
  // Return array for numbers 1 to n
  return [];
}`,
      testCases: [
        {
          input: [15],
          expected: [1,2,'Fizz',4,'Buzz','Fizz',7,8,'Fizz','Buzz',11,'Fizz',13,14,'FizzBuzz'],
          description: 'FizzBuzz up to 15'
        }
      ],
      hints: [
        'Use the modulo operator (%) to check divisibility',
        'Check for divisibility by both 3 and 5 first',
        'Use a loop from 1 to n'
      ]
    }
  ],
  hard: [
    {
      title: 'Binary Tree Traversal',
      description: 'Implement in-order traversal of a binary tree.',
      difficulty: 'hard' as const,
      functionStub: `function inorderTraversal(root) {
  // root = { val: number, left: TreeNode, right: TreeNode }
  // Return array of values in in-order
  return [];
}`,
      testCases: [
        {
          input: [{ val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } }],
          expected: [1, 2, 3],
          description: 'Simple binary tree'
        }
      ],
      hints: [
        'In-order: left subtree, root, right subtree',
        'Use recursion or a stack for iteration',
        'Base case: if node is null, return'
      ]
    },
    {
      title: 'Longest Common Subsequence',
      description: 'Find the length of the longest common subsequence between two strings.',
      difficulty: 'hard' as const,
      functionStub: `function longestCommonSubsequence(text1, text2) {
  // Your code here
  return 0;
}`,
      testCases: [
        {
          input: ['abcde', 'ace'],
          expected: 3,
          description: 'LCS of "abcde" and "ace"'
        },
        {
          input: ['abc', 'abc'],
          expected: 3,
          description: 'Identical strings'
        }
      ],
      hints: [
        'Use dynamic programming with a 2D array',
        'If characters match, add 1 to diagonal value',
        'Otherwise, take max of left or top cell'
      ]
    }
  ]
};

export function generateExercise(difficulty: 'easy' | 'medium' | 'hard'): Exercise {
  const exerciseList = exercises[difficulty];
  const randomIndex = Math.floor(Math.random() * exerciseList.length);
  return exerciseList[randomIndex];
}