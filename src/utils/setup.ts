import { ValidationError } from '@nestjs/common';

export const getValidationErrorResponse = (
  validationErrors: ValidationError[],
  parentProperty = '',
): ValidationErrorResponse => {
  const errors: ValidationErrorResponse = [];

  const getValidationErrorsRecursively = (
    validationErrors: ValidationError[],
    parentProperty = '',
  ) => {
    for (const error of validationErrors) {
      const propertyPath = parentProperty
        ? `${parentProperty}.${error.property}`
        : error.property;

      if (error.constraints) {
        errors.push({
          property: propertyPath,
          errors: Object.values(error.constraints),
        });
      }

      if (error.children?.length) {
        getValidationErrorsRecursively(error.children, propertyPath);
      }
    }
  };

  getValidationErrorsRecursively(validationErrors, parentProperty);

  return errors;
};
