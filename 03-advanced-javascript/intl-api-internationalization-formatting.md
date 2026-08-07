# T334 · ECMAScript `Intl` API: Internationalized Numbers, Dates & Relative Time Formatting

**Difficulty:** Easy  
**Companies Asked:** Google, Meta, Amazon, Microsoft  
**Category:** Advanced JavaScript  
**Concepts:** intl, internationalization, i18n, formatting  

## Question

How do `Intl.NumberFormat`, `Intl.DateTimeFormat`, and `Intl.RelativeTimeFormat` localize currencies, numbers, dates, and relative timestamps (`"2 hours ago"`) natively?

```javascript
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
console.log(currencyFormatter.format(1234.5)); // "$1,234.50"

const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(relativeTime.format(-1, 'day')); // "yesterday"
```
