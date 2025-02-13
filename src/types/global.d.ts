type ValidationErrorResponse = Array<{ property: string; errors: string[] }>;

// dto
interface ClassConstructor {
  new (...args: any[]): {};
}
