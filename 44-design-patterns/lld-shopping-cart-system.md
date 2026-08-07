# T4402 · Low-Level Design (LLD): Extensible Shopping Cart & Promotion Engine

**Difficulty:** Hard  
**Companies Asked:** Amazon, Stripe, Shopify, Meta, Walmart  
**Interview Frequency:** ★★★★☆  
**Category:** Low-Level Design  
**Concepts:** low-level-design, lld, object-oriented-design, strategy-pattern, decorator-pattern  

## Question

Design an extensible Low-Level Shopping Cart & Promotion Engine in TypeScript that handles multiple item types, configurable discount strategies (percentage off, flat discount, Buy 1 Get 1 Free), stacked promotions, and tax calculations while adhering to SOLID principles.

## Expected Answer

1. **Object-Oriented Architecture**:
   - `CartItem`: Encapsulates product metadata, quantity, and unit price.
   - `DiscountStrategy` Interface: Strategy pattern interface computing discounts against a cart.
   - `Cart`: Manages item additions, removals, strategy applications, subtotal calculation, and final total output.
2. **SOLID Principles Applied**:
   - **Single Responsibility Principle (SRP)**: Cart calculates total; Discount Strategy calculates discounts; Tax Engine calculates taxes.
   - **Open/Closed Principle (OCP)**: New promotion types (e.g. tiered spend discounts) can be added by implementing new `DiscountStrategy` classes without modifying the `Cart` class.

## Deep Explanation

### Class Diagram / Architecture Blueprint

```
+------------------+         +--------------------------+
|       Cart       | <>----->|       CartItem           |
+------------------+         +--------------------------+
| - items: Item[]  |         | - id, name, price, qty   |
| - discounts[]    |         +--------------------------+
| + calculateTotal()|
+--------+---------+
         | 1..*
         v
+--------------------------+
| <<interface>>            |
|    DiscountStrategy      |
+--------------------------+
| + applyDiscount(cart)    |
+------------+-------------+
             ^
   +---------+---------+--------------------+
   |                   |                    |
+--+-------------+ +---+------------+ +-----+--------------+
| PercentageDisc | | FlatAmountDisc | | BuyOneGetOneDisc   |
+----------------+ +----------------+ +--------------------+
```

## Production Example

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
}

export class CartItem {
  constructor(public product: Product, public quantity: number) {}

  get subtotal(): number {
    return this.product.price * this.quantity;
  }
}

export interface DiscountStrategy {
  description: string;
  calculateDiscount(items: CartItem[]): number;
}

export class PercentageDiscountStrategy implements DiscountStrategy {
  constructor(public description: string, private percentage: number, private targetProductId?: string) {}

  calculateDiscount(items: CartItem[]): number {
    let eligibleSubtotal = 0;
    for (const item of items) {
      if (!this.targetProductId || item.product.id === this.targetProductId) {
        eligibleSubtotal += item.subtotal;
      }
    }
    return eligibleSubtotal * (this.percentage / 100);
  }
}

export class BuyOneGetOneFreeStrategy implements DiscountStrategy {
  constructor(public description: string, private targetProductId: string) {}

  calculateDiscount(items: CartItem[]): number {
    const item = items.find((i) => i.product.id === this.targetProductId);
    if (!item || item.quantity < 2) return 0;
    const freeCount = Math.floor(item.quantity / 2);
    return freeCount * item.product.price;
  }
}

export class ShoppingCart {
  private items: Map<string, CartItem> = new Map();
  private discountStrategies: DiscountStrategy[] = [];
  private taxRate: number = 0.08; // 8% tax

  addItem(product: Product, quantity: number = 1): void {
    const existing = this.items.get(product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.set(product.id, new CartItem(product, quantity));
    }
  }

  addDiscountStrategy(strategy: DiscountStrategy): void {
    this.discountStrategies.push(strategy);
  }

  get rawSubtotal(): number {
    return Array.from(this.items.values()).reduce((sum, item) => sum + item.subtotal, 0);
  }

  get totalDiscount(): number {
    const itemList = Array.from(this.items.values());
    return this.discountStrategies.reduce((total, strategy) => {
      return total + strategy.calculateDiscount(itemList);
    }, 0);
  }

  get checkoutTotal(): { subtotal: number; discount: number; tax: number; grandTotal: number } {
    const subtotal = this.rawSubtotal;
    const discount = Math.min(this.totalDiscount, subtotal); // Prevent negative total
    const taxableSubtotal = subtotal - discount;
    const tax = taxableSubtotal * this.taxRate;
    const grandTotal = taxableSubtotal + tax;

    return {
      subtotal,
      discount,
      tax: Number(tax.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2)),
    };
  }
}
```

## Best Practices

- Always represent currency in integer cents (e.g., `$10.50` stored as `1050`) in production financial systems to avoid floating point precision inaccuracies (`0.1 + 0.2 !== 0.3`).
- Cap total cumulative discounts to not exceed the subtotal amount.

## Common Mistakes

- Using floating point numbers directly for financial transactions without explicit rounding or integer cent representations.
- Hardcoding discount conditional logic (`if type == 'BOGO'`) inside the `Cart` class, violating the Open/Closed Principle.

## Follow-up Questions

1. How would you handle coupon precedence and non-stackable discount rules?
2. How would you design a persistence layer for restoring abandoned user shopping carts across devices?

## Related Topics

- Essential Design Patterns in Frontend (Observer, Strategy, Factory)
- SOLID Principles Applied to Component & Utility Architecture
