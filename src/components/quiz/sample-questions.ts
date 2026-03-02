import { MathItem } from '@/types';

// Sample MCQ items for MVP demo
// These will be replaced by real item bank data
export const sampleQuestions: MathItem[] = [
  {
    id: 'demo_1',
    standardId: 'std_1',
    subskillIds: ['sub_1'],
    type: 'multiple_choice',
    difficulty: 'developing',
    title: 'Solving Linear Equations',
    question: 'Solve for x: 3x + 7 = 22',
    correctAnswer: '5',
    distractors: ['3', '7', '15'],
    explanation:
      'Subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5. If you chose 15, you may have forgotten to divide by 3 after subtracting. If you chose 7, you may have confused the constant with the answer.',
    hints: ['First isolate the variable term', 'Subtract 7 from both sides'],
    metadata: {
      estimatedTimeMinutes: 1,
      calculatorAllowed: false,
      keywords: ['linear equations', 'solving'],
      realWorldContext: false,
      context: 'abstract',
      format: 'algebraic',
      depthOfKnowledge: 2,
      bloomsTaxonomy: 'apply',
      commonMisconceptions: [
        'Forgetting to divide by the coefficient after isolating',
        'Confusing the constant term with the solution',
      ],
      relatedStandards: [],
      generatedBy: 'human',
      reviewStatus: 'approved',
      author: 'system',
      created: new Date(),
      lastModified: new Date(),
    },
  },
  {
    id: 'demo_2',
    standardId: 'std_2',
    subskillIds: ['sub_2'],
    type: 'multiple_choice',
    difficulty: 'developing',
    title: 'Fraction Operations',
    question: 'What is 2/3 + 1/4?',
    correctAnswer: '11/12',
    distractors: ['3/7', '3/12', '8/12'],
    explanation:
      'Find a common denominator (12). Convert: 8/12 + 3/12 = 11/12. If you chose 3/7, you added numerators and denominators separately — a common mistake. If you chose 3/12, you may have only converted one fraction.',
    hints: [
      'Find the least common denominator',
      'The LCD of 3 and 4 is 12',
    ],
    metadata: {
      estimatedTimeMinutes: 2,
      calculatorAllowed: false,
      keywords: ['fractions', 'addition'],
      realWorldContext: false,
      context: 'abstract',
      format: 'numeric',
      depthOfKnowledge: 2,
      bloomsTaxonomy: 'apply',
      commonMisconceptions: [
        'Adding numerators and denominators separately (2+1)/(3+4)',
        'Only converting one fraction to common denominator',
      ],
      relatedStandards: [],
      generatedBy: 'human',
      reviewStatus: 'approved',
      author: 'system',
      created: new Date(),
      lastModified: new Date(),
    },
  },
  {
    id: 'demo_3',
    standardId: 'std_3',
    subskillIds: ['sub_3'],
    type: 'multiple_choice',
    difficulty: 'proficient',
    title: 'Area of Triangles',
    question:
      'A triangle has a base of 10 cm and a height of 6 cm. What is its area?',
    correctAnswer: '30 cm²',
    distractors: ['60 cm²', '16 cm²', '36 cm²'],
    explanation:
      'Area = (1/2) × base × height = (1/2) × 10 × 6 = 30 cm². If you chose 60, you forgot to multiply by 1/2 — that would be the area of the rectangle. If you chose 16, you may have added base + height instead of multiplying.',
    hints: [
      'Remember the formula for the area of a triangle',
      'A = (1/2) × b × h',
    ],
    metadata: {
      estimatedTimeMinutes: 1,
      calculatorAllowed: false,
      keywords: ['area', 'triangle', 'geometry'],
      realWorldContext: true,
      context: 'real-world',
      format: 'geometric',
      depthOfKnowledge: 2,
      bloomsTaxonomy: 'apply',
      commonMisconceptions: [
        'Forgetting to halve (using rectangle formula instead)',
        'Adding dimensions instead of multiplying',
      ],
      relatedStandards: [],
      generatedBy: 'human',
      reviewStatus: 'approved',
      author: 'system',
      created: new Date(),
      lastModified: new Date(),
    },
  },
  {
    id: 'demo_4',
    standardId: 'std_4',
    subskillIds: ['sub_4'],
    type: 'multiple_choice',
    difficulty: 'beginning',
    title: 'Order of Operations',
    question: 'What is 3 + 4 × 2?',
    correctAnswer: '11',
    distractors: ['14', '10', '24'],
    explanation:
      'Multiplication comes before addition (PEMDAS). 4 × 2 = 8, then 3 + 8 = 11. If you chose 14, you added 3 + 4 first then multiplied — remember, multiplication before addition!',
    hints: [
      'Remember PEMDAS/BODMAS',
      'Which operation should you do first?',
    ],
    metadata: {
      estimatedTimeMinutes: 1,
      calculatorAllowed: false,
      keywords: ['order of operations', 'PEMDAS'],
      realWorldContext: false,
      context: 'abstract',
      format: 'numeric',
      depthOfKnowledge: 1,
      bloomsTaxonomy: 'apply',
      commonMisconceptions: [
        'Computing left-to-right without respecting operation precedence',
      ],
      relatedStandards: [],
      generatedBy: 'human',
      reviewStatus: 'approved',
      author: 'system',
      created: new Date(),
      lastModified: new Date(),
    },
  },
  {
    id: 'demo_5',
    standardId: 'std_5',
    subskillIds: ['sub_5'],
    type: 'multiple_choice',
    difficulty: 'proficient',
    title: 'Percentage Calculations',
    question: 'A shirt originally costs $80 and is on sale for 25% off. What is the sale price?',
    correctAnswer: '$60',
    distractors: ['$55', '$65', '$20'],
    explanation:
      '25% of $80 = $20 discount. Sale price = $80 - $20 = $60. If you chose $20, that is the discount amount, not the sale price. If you chose $55, you may have calculated 25% incorrectly.',
    hints: [
      'First calculate the discount amount',
      '25% of 80 = 0.25 × 80',
    ],
    metadata: {
      estimatedTimeMinutes: 2,
      calculatorAllowed: true,
      keywords: ['percentages', 'discount'],
      realWorldContext: true,
      context: 'real-world',
      format: 'numeric',
      depthOfKnowledge: 2,
      bloomsTaxonomy: 'apply',
      commonMisconceptions: [
        'Reporting the discount amount instead of the final price',
        'Incorrect percentage calculation',
      ],
      relatedStandards: [],
      generatedBy: 'human',
      reviewStatus: 'approved',
      author: 'system',
      created: new Date(),
      lastModified: new Date(),
    },
  },
  {
    id: 'demo_6',
    standardId: 'std_6',
    subskillIds: ['sub_6'],
    type: 'multiple_choice',
    difficulty: 'developing',
    title: 'Negative Numbers',
    question: 'What is -8 + 3?',
    correctAnswer: '-5',
    distractors: ['-11', '5', '11'],
    explanation:
      'Starting at -8, move 3 steps to the right on the number line: -8, -7, -6, -5. If you chose -11, you subtracted instead of adding. If you chose 5, you may have ignored the negative sign.',
    hints: [
      'Think of a number line',
      'Adding a positive number moves you to the right',
    ],
    metadata: {
      estimatedTimeMinutes: 1,
      calculatorAllowed: false,
      keywords: ['negative numbers', 'integers', 'addition'],
      realWorldContext: false,
      context: 'abstract',
      format: 'numeric',
      depthOfKnowledge: 1,
      bloomsTaxonomy: 'understand',
      commonMisconceptions: [
        'Subtracting instead of adding when one number is negative',
        'Ignoring the negative sign',
      ],
      relatedStandards: [],
      generatedBy: 'human',
      reviewStatus: 'approved',
      author: 'system',
      created: new Date(),
      lastModified: new Date(),
    },
  },
  {
    id: 'demo_7',
    standardId: 'std_7',
    subskillIds: ['sub_7'],
    type: 'multiple_choice',
    difficulty: 'proficient',
    title: 'Ratio and Proportion',
    question:
      'If the ratio of boys to girls in a class is 3:5, and there are 24 students total, how many girls are there?',
    correctAnswer: '15',
    distractors: ['9', '12', '16'],
    explanation:
      'The ratio 3:5 means 3+5=8 parts total. Each part = 24÷8 = 3 students. Girls = 5 parts × 3 = 15. If you chose 9, you found the number of boys instead. If you chose 12, you may have split 24 in half.',
    hints: [
      'Add the ratio parts: 3+5=8 total parts',
      'Divide total students by total parts to find the value of one part',
    ],
    metadata: {
      estimatedTimeMinutes: 2,
      calculatorAllowed: false,
      keywords: ['ratio', 'proportion'],
      realWorldContext: true,
      context: 'real-world',
      format: 'numeric',
      depthOfKnowledge: 2,
      bloomsTaxonomy: 'apply',
      commonMisconceptions: [
        'Calculating boys instead of girls',
        'Dividing total by 2 instead of using ratio parts',
      ],
      relatedStandards: [],
      generatedBy: 'human',
      reviewStatus: 'approved',
      author: 'system',
      created: new Date(),
      lastModified: new Date(),
    },
  },
];

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function buildQuizOptions(item: MathItem): {
  options: string[];
  correctIndex: number;
} {
  const correctAnswer = String(item.correctAnswer);
  const distractors = (item.distractors || []).map(String).slice(0, 3);

  // Ensure we have exactly 3 distractors
  while (distractors.length < 3) {
    distractors.push(`Option ${distractors.length + 2}`);
  }

  const allOptions = [correctAnswer, ...distractors];
  const shuffled = shuffleArray(allOptions);
  const correctIndex = shuffled.indexOf(correctAnswer);

  return { options: shuffled, correctIndex };
}
