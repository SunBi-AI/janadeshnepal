/**
 * Utility functions for handling localized content
 */

/**
 * Gets a localized field from an object based on the current locale
 * @param data - The object containing localized fields
 * @param fieldName - The base field name (without _en or _np suffix)
 * @param locale - The current locale ('en' or 'np')
 * @returns The localized field value
 */
export function getLocalizedField<T extends Record<string, any>>(
  data: T,
  fieldName: string,
  locale: 'en' | 'np'
): string {
  const key = `${fieldName}_${locale}` as keyof T;
  return (data[key] as string) || '';
}

/**
 * Gets multiple localized fields from an object
 * @param data - The object containing localized fields
 * @param fieldNames - Array of base field names
 * @param locale - The current locale
 * @returns Object with localized values
 */
export function getLocalizedFields<T extends Record<string, any>>(
  data: T,
  fieldNames: string[],
  locale: 'en' | 'np'
): Record<string, string> {
  return fieldNames.reduce((acc, fieldName) => {
    acc[fieldName] = getLocalizedField(data, fieldName, locale);
    return acc;
  }, {} as Record<string, string>);
}
