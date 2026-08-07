# T6012 · High-Level System Design: Scalable Client-Side Image Processing & Upload Pipeline

**Difficulty:** Hard  
**Companies Asked:** Meta, Google, Amazon, Pinterest  
**Category:** Frontend System Design  
**Concepts:** hld, system-design, image-upload, canvas, web-workers, s3-presigned-urls  

## Question

How do you design a high-performance **Client-Side Image Upload & Crop Pipeline** featuring Canvas image cropping, Web Worker compression (`WebP`/`AVIF`), chunked resumable S3 uploads (`tus` protocol), and instant local preview URLs (`URL.createObjectURL`)?

## Key Architectural Pipeline

1. **Local Preview Generation**: Instantly generate preview blob via `URL.createObjectURL(file)` (0ms delay).
2. **Offscreen Canvas & Web Worker Compression**: Resize high-resolution camera photos (e.g. 12MB) in Web Workers to $<500\text{KB}$ WebP blobs before network upload.
3. **Resumable S3 Presigned Uploads**: Multipart presigned URL uploads with `tus` protocol support for network retry recovery.
