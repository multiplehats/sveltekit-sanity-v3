<script lang="ts">
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ posts } = data);
</script>

<svelte:head>
  <title>Goatnbike</title>
</svelte:head>

<div class="main relative w-full bg-dark-400 min-h-screen px-4 pt-4 pb-20 sm:px-6 lg:px-8 lg:pt-12 lg:pb-28">
  <div class="relative mx-auto max-w-7xl">
    <div class="text-center">
      <div class="flex items-center justify-center w-full mb-5">
        <a href="https://www.goatnbike.com" target="_blank" rel="noreferrer noopener" class="group block flex-shrink-0">
          <div class="flex items-center text-left">
            <div>
              <img class="inline-block h-9 w-9 rounded-full rounded-logo" src="/logo.svg" alt="Goatnbike logo" />
            </div>
          </div>
        </a>
      </div>
      <h1 class="text-3xl font-bold text-brand sm:text-4xl">MTB adventures in Oppdal, Norway - all year !</h1>

      <p class="mx-auto mt-3 max-w-xl text-lg text-gray-500 sm:mt-4">
          <a
            href="https://www.instagram.com/goatnbike/"
            title=""
            role="button"
            class="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-brand transition-all duration-200 border border-transparent hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
          <i class="gg-instagram"></i>
          </a>
      </p>
    </div>

    <div class="w-full  mt-12">
      {#if posts && posts.length > 0}
        <div class="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {#each posts as post}
            <a href="/posts/{post.slug}">
              <div class="flex flex-col overflow-hidden rounded-m shadow-lg">
                <div class="flex-shrink-0">
                 {#if post.coverImage}
                  <img
                    class="h-58 w-full object-cover"
                    src={urlForImage(post.coverImage).crop("focalpoint").width(826).url()}
                    alt=""
                  />
                 {/if}
                </div>
                <div class="flex flex-1 flex-col justify-between bg-white p-6">
                  <div class="flex-1">
                    <div class="mt-2 block">
                      <h2 class="text-xl font-semibold text-brand">
                        {post.title}
                      </h2>

                      <p class="mt-3 text-base text-brand">
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

<style>

 .rounded-logo {
  width:10rem;
  height: auto;
 }


.main {
    background: linear-gradient(0deg, rgba(45,62,96,1) 50%, rgba(255,255,255,1) 95%);
  }

  .gg-instagram {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    border: 2px solid transparent;
    box-shadow: 0 0 0 2px;
    border-radius: 4px;
    width: 20px;
    height: 20px
}
.gg-instagram::after,
.gg-instagram::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute
}
.gg-instagram::after {
    border: 2px solid;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    top: 3px
}
.gg-instagram::before {
    border-radius: 3px;
    width: 2px;
    height: 2px;
    background: currentColor;
    right: 1px;
    top: 1px
}
h1,h2, text-base {
  font-family: 'Inclusive Sans', sans-serif;
}


  </style>
