# Daniel & Salome Wedding Invitation

Static wedding invitation website ready for Vercel deployment.

## Project Structure

- `index.html` - main invitation page
- `style.css` - responsive luxury wedding styling
- `script.js` - reveal animations, gallery rotation, and WhatsApp RSVP
- `assets/images/main/IMAGE HERO TRAITER.PNG` - primary hero invitation image
- `assets/images/main/main-invitation-original.jpg` - original uploaded photo backup
- `assets/images/gallery/` - add future gallery photos here
- `assets/images/gallery/optimized/` - selected web-ready gallery images used by the carousel
- `assets/fonts/` - optional local font files
- `vercel.json` - simple Vercel static configuration

## Add Gallery Images

1. Place new images inside `assets/images/gallery/`.
2. Add each image path to the `galleryImages` array in `script.js`.

Example:

```js
{ src: "assets/images/gallery/photo-01.jpg", alt: "Daniel and Salome" }
```
