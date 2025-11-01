import { MathItem, MathStandard, ItemBank, ExportOptions } from '@/types';

/**
 * Export item bank in various formats
 */
export class ExportManager {
  /**
   * Export item bank to JSON
   */
  static exportToJSON(itemBank: ItemBank, options: ExportOptions): string {
    let items = itemBank.items;
    let standards = itemBank.standards;

    if (options.filter) {
      // Filter items based on the filter options
      const filter = options.filter;

      if (filter.gradeLevels && filter.gradeLevels.length > 0) {
        const standardIds = standards
          .filter(s => filter.gradeLevels!.includes(s.gradeLevel))
          .map(s => s.id);
        items = items.filter(item => standardIds.includes(item.standardId));
      }

      if (filter.domains && filter.domains.length > 0) {
        const standardIds = standards
          .filter(s => filter.domains!.includes(s.domain))
          .map(s => s.id);
        items = items.filter(item => standardIds.includes(item.standardId));
      }

      if (filter.difficulties && filter.difficulties.length > 0) {
        items = items.filter(item => filter.difficulties!.includes(item.difficulty));
      }

      if (filter.itemTypes && filter.itemTypes.length > 0) {
        items = items.filter(item => filter.itemTypes!.includes(item.type));
      }

      if (filter.keywords && filter.keywords.length > 0) {
        items = items.filter(item =>
          filter.keywords!.some(keyword =>
            item.title.toLowerCase().includes(keyword.toLowerCase()) ||
            item.question.toLowerCase().includes(keyword.toLowerCase()) ||
            item.metadata.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
          )
        );
      }

      if (filter.calculatorAllowed !== undefined) {
        items = items.filter(item => item.metadata.calculatorAllowed === filter.calculatorAllowed);
      }

      if (filter.maxTime !== undefined) {
        items = items.filter(item => item.metadata.estimatedTimeMinutes <= filter.maxTime!);
      }

      // Filter standards to only include those used in filtered items
      const usedStandardIds = new Set(items.map(item => item.standardId));
      standards = standards.filter(standard => usedStandardIds.has(standard.id));
    }

    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '1.0',
        totalItems: items.length,
        totalStandards: standards.length,
        includeAnswers: options.includeAnswers,
        includeMetadata: options.includeMetadata
      },
      standards: options.includeMetadata ? standards : this.stripStandardMetadata(standards),
      items: options.includeMetadata ? items : this.stripItemMetadata(items, options.includeAnswers)
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Export items to CSV
   */
  static exportToCSV(items: MathItem[], options: ExportOptions): string {
    const headers = [
      'ID',
      'Standard ID',
      'Type',
      'Difficulty',
      'Title',
      'Question',
      'Correct Answer',
      'Explanation',
      'Estimated Time (minutes)',
      'Calculator Allowed',
      'Keywords'
    ];

    const csvRows = [headers.join(',')];

    items.forEach(item => {
      const row = [
        this.escapeCSV(item.id),
        this.escapeCSV(item.standardId),
        this.escapeCSV(item.type),
        this.escapeCSV(item.difficulty),
        this.escapeCSV(item.title),
        this.escapeCSV(item.question),
        this.escapeCSV(options.includeAnswers ? item.correctAnswer.toString() : 'REDACTED'),
        this.escapeCSV(item.explanation),
        item.metadata.estimatedTimeMinutes.toString(),
        item.metadata.calculatorAllowed.toString(),
        this.escapeCSV(item.metadata.keywords.join('; '))
      ];

      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  }

  /**
   * Export to QTI (Question and Test Interoperability) format
   */
  static exportToQTI(items: MathItem[], options: ExportOptions): string {
    const qtiItems = items.map(item => this.createQTIItem(item, options.includeAnswers));

    return `<?xml version="1.0" encoding="UTF-8"?>
<assessmentTest xmlns="http://www.imsglobal.org/xsd/imsqtiv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiv1p2 http://www.imsglobal.org/xsd/qti/qtiv1p2/imsqtiv1p2.xsd">
  <testPart identifier="mathTest" navigationMode="linear" submissionMode="individual">
    ${qtiItems.join('\n    ')}
  </testPart>
</assessmentTest>`;
  }

  /**
   * Export to Moodle XML format
   */
  static exportToMoodleXML(items: MathItem[], options: ExportOptions): string {
    const moodleItems = items.map(item => this.createMoodleItem(item, options.includeAnswers));

    return `<?xml version="1.0" encoding="UTF-8"?>
<quiz>
${moodleItems.join('\n')}
</quiz>`;
  }

  /**
   * Export standards to CSV
   */
  static exportStandardsToCSV(standards: MathStandard[]): string {
    const headers = [
      'ID',
      'Code',
      'Grade Level',
      'Domain',
      'Cluster',
      'Parent Category',
      'Description'
    ];

    const csvRows = [headers.join(',')];

    standards.forEach(standard => {
      const row = [
        this.escapeCSV(standard.id),
        this.escapeCSV(standard.code),
        this.escapeCSV(standard.gradeLevel),
        this.escapeCSV(standard.domain),
        this.escapeCSV(standard.cluster),
        this.escapeCSV(standard.parentCategory),
        this.escapeCSV(standard.description)
      ];

      csvRows.push(row.join(','));
    });

    return csvRows.join('\n');
  }

  /**
   * Create QTI item
   */
  private static createQTIItem(item: MathItem, includeAnswers: boolean): string {
    const itemId = `item_${item.id}`;

    if (item.type === 'multiple_choice') {
      return `
    <assessmentItem identifier="${itemId}" title="${this.escapeXML(item.title)}">
      <itemBody>
        ${this.escapeXML(item.question)}
      </itemBody>
      <responseDeclaration identifier="RESPONSE" baseType="identifier" cardinality="single">
        <correctResponse>${includeAnswers ? `<value>${item.correctAnswer}</value>` : ''}</correctResponse>
      </responseDeclaration>
      ${this.createQTIChoiceInteraction(item, includeAnswers)}
    </assessmentItem>`;
    }

    return `
    <assessmentItem identifier="${itemId}" title="${this.escapeXML(item.title)}">
      <itemBody>
        ${this.escapeXML(item.question)}
      </itemBody>
      ${includeAnswers ? `<responseDeclaration identifier="RESPONSE" baseType="string" cardinality="single"><correctResponse><value>${this.escapeXML(item.correctAnswer.toString())}</value></correctResponse></responseDeclaration>` : ''}
    </assessmentItem>`;
  }

  /**
   * Create QTI choice interaction
   */
  private static createQTIChoiceInteraction(item: MathItem, _includeAnswers: boolean): string {
    if (item.type !== 'multiple_choice' || !item.distractors) return '';

    const choices = [item.correctAnswer, ...(item.distractors || [])];
    const choiceElements = choices.map((choice) => {
      const identifier = `choice_${Math.random().toString(36).substr(2, 9)}`;
      return `<simpleChoice identifier="${identifier}" fixed="false">${this.escapeXML(choice.toString())}</simpleChoice>`;
    });

    return `<choiceInteraction responseIdentifier="RESPONSE" shuffle="true" maxChoices="1">
${choiceElements.join('\n        ')}
      </choiceInteraction>`;
  }

  /**
   * Create Moodle XML item
   */
  private static createMoodleItem(item: MathItem, includeAnswers: boolean): string {
    if (item.type === 'multiple_choice') {
      return `  <question type="multichoice">
    <name>
      <text>${this.escapeXML(item.title)}</text>
    </name>
    <questiontext format="html">
      <text><![CDATA[${this.escapeXML(item.question)}]]></text>
    </questiontext>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
    <correctfeedback>
      <text>${this.escapeXML(item.explanation)}</text>
    </correctfeedback>
    <shownumcorrect/>
    ${this.createMoodleAnswers(item, includeAnswers)}
  </question>`;
    }

    return `  <question type="shortanswer">
    <name>
      <text>${this.escapeXML(item.title)}</text>
    </name>
    <questiontext format="html">
      <text><![CDATA[${this.escapeXML(item.question)}]]></text>
    </questiontext>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <usecase>0</usecase>
    ${includeAnswers ? `<answer fraction="100" format="moodle_auto_format">
      <text>${this.escapeXML(item.correctAnswer.toString())}</text>
      <feedback><text>${this.escapeXML(item.explanation)}</text></feedback>
    </answer>` : ''}
  </question>`;
  }

  /**
   * Create Moodle answers
   */
  private static createMoodleAnswers(item: MathItem, includeAnswers: boolean): string {
    if (item.type !== 'multiple_choice' || !item.distractors) return '';

    const choices = [item.correctAnswer, ...(item.distractors || [])];
    return choices.map((choice) => {
      const fraction = includeAnswers && choice === item.correctAnswer ? '100' : '0';
      return `    <answer fraction="${fraction}" format="moodle_auto_format">
      <text>${this.escapeXML(choice.toString())}</text>
      <feedback><text>${choice === item.correctAnswer ? this.escapeXML(item.explanation) : 'Incorrect'}</text></feedback>
    </answer>`;
    }).join('\n');
  }

  /**
   * Strip standard metadata
   */
  private static stripStandardMetadata(standards: MathStandard[]): Partial<MathStandard>[] {
    return standards.map(({ id, code, gradeLevel, domain, cluster, description }) => ({
      id,
      code,
      gradeLevel,
      domain,
      cluster,
      description
    }));
  }

  /**
   * Strip item metadata
   */
  private static stripItemMetadata(items: MathItem[], includeAnswers: boolean): Partial<MathItem>[] {
    return items.map(item => {
      const stripped: Partial<MathItem> = {
        id: item.id,
        standardId: item.standardId,
        type: item.type,
        difficulty: item.difficulty,
        title: item.title,
        question: item.question,
        explanation: item.explanation,
        hints: item.hints
      };

      if (includeAnswers) {
        stripped.correctAnswer = item.correctAnswer;
        if (item.distractors) stripped.distractors = item.distractors;
      }

      return stripped;
    });
  }

  /**
   * Escape CSV values
   */
  private static escapeCSV(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  /**
   * Escape XML values
   */
  private static escapeXML(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Save export to file
   */
  static saveToFile(content: string, filePath: string): Promise<void> {
    return import('fs/promises').then(fs => fs.writeFile(filePath, content, 'utf-8'));
  }

  /**
   * Generate export filename
   */
  static generateFilename(format: string, includeDate: boolean = true): string {
    const date = includeDate ? new Date().toISOString().split('T')[0] : '';
    return `math_item_bank_${date}.${format}`;
  }
}