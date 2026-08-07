# T6011 · High-Level System Design: Scalable Social Media News Feed (Meta / Twitter)

**Difficulty:** Hard  
**Companies Asked:** Meta, Twitter/X, LinkedIn, TikTok  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, news-feed, virtual-list, media-caching  

## Question

How do you design a high-throughput **Social Media News Feed** supporting infinite scrolling virtualized feeds, media asset prefetching, optimistic likes/comments, and viewport visibility tracking?

## Key Architectural Layers

1. **Virtual Windowing**: DOM recycling (`react-window` / `FlashList`) keeping active DOM node count $<50$ regardless of total scrolled post count.
2. **Media Asset Prefetcher**: Pre-buffer upcoming video stream chunks (`m4s`) and pre-decode images (`Image.decode()`) when posts come within 2 viewports of view.
3. **Viewport Tracker**: `IntersectionObserver` reporting impression durations for news feed rank algorithms.
