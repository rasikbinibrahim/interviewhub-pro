# T2303 · React Native FlatList Performance Optimization: `windowSize`, `getItemLayout`, `keyExtractor` & RecyclerListView

**Difficulty:** Hard  
**Companies Asked:** Meta, Uber, Amazon, Shopify, Coinbase  
**Interview Frequency:** ★★★★★  
**Category:** React Native  
**Concepts:** react-native, flatlist, performance, windowsize, getitemlayout, recyclerlistview  

## Question

What causes blank space flashing and UI frame drops during high-speed scrolling in React Native `FlatList` components, how do `getItemLayout`, `windowSize`, `removeClippedSubviews`, `initialNumToRender`, and `maxToRenderPerBatch` optimize list rendering, and when should `FlashList` (Shopify) or `RecyclerListView` replace `FlatList`?

## Expected Answer

1. **FlatList Virtualization Bottleneck**:
   - `FlatList` virtualizes large data sets by rendering items inside a visible viewport window and unmounting off-screen elements to conserve native memory.
   - High-speed scrolling causes JS thread lagging, resulting in blank un-rendered white spaces while the bridge catches up with layout measurements.
2. **Key Optimization Props**:
   - **`getItemLayout`**: Skips dynamic multi-pass layout height measurement calculations for fixed-height items ($O(1)$ index layout lookup!).
   - **`windowSize`**: Sets rendering window multiplier (default `21`: 10 viewports above + 1 viewport visible + 10 viewports below). Lowering `windowSize={5}` reduces memory and JS execution time.
   - **`removeClippedSubviews={true}`**: Unmounts off-screen native views on Android to save native memory.
3. **FlashList (Shopify) / RecyclerListView**:
   - Instead of unmounting and destroying view instances, `FlashList` **recycles existing native view cells** (like Android `RecyclerView` / iOS `UICollectionView`), achieving 5x performance improvement and 60 FPS scrolling on low-end devices.

## Deep Explanation

### FlatList Virtualization Window

```
[ Window Above (Offscreen) ]
───────────────────────────────
[ VISIBLE VIEWPORT SCREEN ]  <--- Rendered Items
───────────────────────────────
[ Window Below (Offscreen) ]
```

## Production Example

```jsx
import React, { useCallback } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const ITEM_HEIGHT = 70; // Fixed row height for getItemLayout optimization!

export function OptimizedProductList({ products }) {
  const renderItem = useCallback(({ item }) => (
    <View style={styles.row}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  // O(1) Layout Calculation: Eliminates dynamic measurement pass!
  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      // Performance Tuning Props
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5} // Reduced from default 21 to conserve memory!
      removeClippedSubviews={true}
      updateCellsBatchingPeriod={50}
    />
  );
}

const styles = StyleSheet.create({
  row: { height: ITEM_HEIGHT, padding: 16, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 16, fontWeight: 'bold' },
});
```

## Best Practices

- Always define `getItemLayout` for lists with uniform fixed item heights to bypass asynchronous dynamic layout measurement passes.
- Wrap `renderItem` components inside `React.memo` or use `useCallback` to prevent item re-renders when parent list state updates.

## Common Mistakes

- Passing inline anonymous functions `renderItem={({ item }) => <Item />}` or inline objects `itemStyle={{ margin: 10 }}`, creating new references on every scroll pass and triggering unnecessary re-renders.

## Follow-up Questions

1. How does Shopify's `FlashList` perform cell view recycling under the hood using `estimatedItemSize`?

## Related Topics

- React Native Architecture: Legacy Bridge vs New Architecture
- React Native Performance & Bridge Bottlenecks
