<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ posts } = data);
</script>

<svelte:head>
  <title>Sanity Virtual Meetup</title>
</svelte:head>

<div class="relative w-full bg-black min-h-screen px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
  <div class="relative mx-auto max-w-7xl">
    <div class="text-center">
      <div class="flex items-center justify-center w-full mb-5">
        <a href="https://chrisjayden.com" target="_blank" rel="noreferrer noopener" class="group block flex-shrink-0">
          <div class="flex items-center text-left">
            <div>
              <img class="inline-block h-9 w-9 rounded-full" src="/avatar.jpg" alt="Chris Jayden avatar" />
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-white group-hover:text-gray-100">Chris Jayden</p>
              <p class="text-xs font-medium text-gray-200 group-hover:text-white">Maker</p>
            </div>
          </div>
        </a>
      </div>
      <h1 class="text-3xl font-bold text-white sm:text-4xl">Sanity Virtual Meetup</h1>

      <p class="mx-auto mt-3 max-w-xl text-lg text-gray-500 sm:mt-4">
        Welcome to the virtual meetup for the Sanity community. This is my talk on how to build a SvelteKit app with
        Sanity V3.
      </p>
    </div>

    <div class="w-full  mt-12">
      {#if posts && posts.length > 0}
        <div class="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {#each posts as post}
            <a href="/posts/{post.slug}">
              <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div class="flex-shrink-0">
                 {#if post.coverImage}
                  <img
                    class="h-48 w-full object-cover"
                    src={urlForImage(post.coverImage).crop("focalpoint").width(826).height(384).url()}
                    alt=""
                  />
                 {/if}
                </div>
                <div class="flex flex-1 flex-col justify-between bg-white p-6">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-indigo-600">Article</p>
                    <div class="mt-2 block">
                      <p class="text-xl font-semibold text-gray-900">
                        {post.title}
                      </p>

                      <p class="mt-3 text-base text-gray-500">
                        {post.postContent.slice(0, 100)}...
                      </p>
                    </div>
                  </div>
                  <div class="mt-6 flex items-center">
                    <div class="flex-shrink-0">
                      <span class="sr-only">Author Image</span>
                        {#if post.author}
                          <img
                            class="h-10 w-10 rounded-full"
                            src={urlForImage(post.author.picture).crop("focalpoint").width(256).height(256).url()}
                            alt=""
                          />
                        {/if}
                    </div>
                    {#if post.author}
                      <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <div class="flex space-x-1 text-sm text-gray-500">
                          <time datetime="2020-03-16">
                            {new Date(post.date).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="flex items-center justify-center">
          <span class="inline-flex rounded-full bg-dark-800 px-4 py-2 text-base font-semibold leading-5 text-gray-400">
            No posts found
          </span>
        </div>
      {/if}
    </div>
  </div>
</div>
