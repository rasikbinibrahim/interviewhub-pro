# T6014 · High-Level System Design: Video Streaming Platform (YouTube / Netflix)

**Difficulty:** Hard  
**Companies Asked:** Netflix, YouTube, Meta, Amazon  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, video-streaming, hls, dash, mse  

## Question

How do you design a high-performance **Video Streaming Web Client** supporting HLS/DASH adaptive bitrate streaming, video chunk buffering via Media Source Extensions (MSE), custom video player controls, and playback analytics telemetry?

## Key Architecture

1. **Adaptive Bitrate Streaming (ABR)**: Monitor bandwidth and buffer health to dynamically switch manifest bitrates (360p ➔ 1080p ➔ 4K).
2. **Media Source Extensions (MSE)**: Append downloaded video/audio byte chunks into `SourceBuffer` objects.
3. **Custom Video Player Controls**: Custom UI overlays with full spatial keyboard navigation support.
