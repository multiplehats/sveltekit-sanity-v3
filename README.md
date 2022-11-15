# Sveltekit x Sanity Studio v3

Hi there 👋! This is a repo for my talk at the [Sanity.io Virtual Meetup - Autumn 2022](https://www.meetup.com/meetup-group-dvjyrjdv/events/289456759/).

## Features

### ✨ Embedding Sanity V3 in a Sveltekit app

When I was working on a new project that involved [Sveltekit](https://kit.svelte.dev/) and Sanity I got curious and wanted to know whether I could directly embed the Sanity Studio V3 (Release Candiate) into a SvelteKit app. I was living on the edge already, so I might as well embrace it 🌈

### 👀 Side-by-side Instant Content preview.

I also go over on how we use Sanity's Side-by-side Instant Content preview feature with Sveltekit. And how you can easily implement this in your own SvelteKit applications. The code ([createPreviewSubscriptionStore](https://github.com/multiplehats/sveltekit-sanityv3/blob/main/src/lib/config/sanity/sveltekit/previewSubscriptionStore.ts#L10)) is mostly inspired from [Sanity's toolkit for Next.js](https://github.com/sanity-io/next-sanity).

#### Learn more
- [Introduction to Sanity Studio v3](https://beta.sanity.io/docs/platform/studio/v2-to-v3)
- [Sanity Studio V3 Announcement](https://www.sanity.io/blog/sanity-studio-v3-developer-preview)

## Developing

Once you've created a project and installed dependencies with `pnpm install`. Make sure you have added all the environment variables (see env.example).

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building & Previewing

To build the project, run:

```bash
pnpm build
```

To preview the build, run:
```bash
pnpm preview
```