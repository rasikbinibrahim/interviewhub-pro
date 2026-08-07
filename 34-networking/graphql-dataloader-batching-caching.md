# T3418 · GraphQL DataLoader Pattern & $N+1$ Database Query Resolution

**Difficulty:** Hard  
**Companies Asked:** Meta, Netflix, Google, Amazon  
**Category:** Networking  
**Concepts:** graphql, dataloader, n-plus-1-problem, batching  

## Question

How does Facebook's **DataLoader** pattern batch individual field resolver queries into a single SQL/API call within a single event loop tick to solve the $N+1$ Query Problem?

```javascript
// DataLoader batches array of IDs into single batch function!
const userLoader = new DataLoader(async (userIds) => {
  const users = await db.users.findMany({ where: { id: { in: userIds } } });
  return userIds.map(id => users.find(u => u.id === id));
});

// Resolvers call loader.load(id) - executed as 1 batched query!
```
