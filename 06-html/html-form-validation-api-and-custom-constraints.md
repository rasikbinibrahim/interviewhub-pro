# QHTML004 · HTML Form Validation API and Custom Constraints

**Difficulty:** Medium  
**Experience Level:** Mid (2-5 YOE)  
**Companies:** Amazon, Shopify, Stripe  
**Interview Frequency:** ★★★★☆  
**Category:** HTML  
**Concepts:** Constraint Validation API, HTML5 form attributes, ValidityState, checkValidity  

## Expected Answer

The HTML5 Constraint Validation API enables browser-native form validation using attributes (required, pattern, min, max, minlength, type) combined with JavaScript methods like checkValidity(), reportValidity(), and setCustomValidity().

## Deep Explanation

When a form is submitted, the browser checks each control against its validity criteria, exposed via element.validity (ValidityState object with properties like valueMissing, patternMismatch, customError). Calling setCustomValidity("message") marks the field invalid and displays native tooltips.

## Production Example

Relying exclusively on client-side JS validation libraries without native fallback attributes creates redundant code bundles and delays basic form validation feedback during slow network script downloads.

## Best Practices

- Combine native HTML5 attributes with JavaScript event listeners for custom validation UI
- Always pair client-side validation with robust backend validation

## Trade-offs

- Browser-native validation tooltips vary in design across operating systems
- Custom validation rules require JS integration via setCustomValidity

## Common Mistakes

- Forgetting to clear custom validity errors with setCustomValidity("") prior to re-validation
- Disabling native validation globally via novalidate without replacing accessibility attributes

## Follow-up Questions

1. How do you style valid and invalid input states using modern CSS pseudo-classes?
2. What is the role of the :user-invalid pseudo-class?

## Related Topics

- Accessible Forms
- HTML
