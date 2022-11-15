<script lang="ts">
  import { sanityUser } from "$lib/config/sanity";

  export let embedded = false;

  $: ({ data } = sanityUser());
</script>

{#if !embedded}
  <div class="bg-gray-900  px-4 py-2 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-row items-center justify-between">
        <div class="flex items-center">
          {#if $data?.profileImage}
            <img class="inline-block mr-3 h-8 w-8 rounded-full" src={$data.profileImage} alt="" />
          {/if}

          <p class="truncate text-sm font-medium text-white">
            <span class="hidden sm:inline font-bold">Hi {$data?.name ? $data.name : "there"}!</span>
            <span> This page is a draft.</span>
            <span class="hidden md:inline hover:underline">
              <a rel="external" href="/api/exit-preview">Exit?</a>
            </span>
          </p>
        </div>

        <div class="w-auto flex-shrink-0  sm:mt-0 ">
          <a
            rel="external"
            href="/api/exit-preview"
            class="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-black"
          >
            Exit
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}
