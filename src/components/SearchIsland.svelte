<script lang="ts">
  export let platforms: any[] = [];
  
  let query = '';
  
  // Fuzzy search reactivity
  $: filteredPlatforms = platforms.filter(p => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return p.name.toLowerCase().includes(lowerQuery) || 
           p.category.toLowerCase().includes(lowerQuery) ||
           p.description.toLowerCase().includes(lowerQuery) ||
           p.tags.some((t: string) => t.toLowerCase().includes(lowerQuery));
  });

  // Strict sorting / taxonomy grouping requested by user
  $: groupedPlatforms = filteredPlatforms.reduce((acc, platform) => {
    const cat = platform.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(platform);
    return acc;
  }, {} as Record<string, any[]>);

  // Hardcoded ordering for taxonomy UX hierarchy (Highest Priority first)
  const categoryOrder = [
    "Australian & Dayshift VA",
    "Global VA & Outsourcing",
    "E-commerce & Marketing",
    "BPO & Professional Services",
    "Technology & Specialized",
    "Job Boards & Resources"
  ];

  // Helper function to extract domain for favicon
  const getFavicon = (url: string) => {
    try {
      const u = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
    } catch {
      return '';
    }
  };

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const getSubheadline = (category: string) => {
    const map: Record<string, string> = {
      "Australian & Dayshift VA": "Premier agencies hiring for Australian and day-time schedules.",
      "Global VA & Outsourcing": "Large-scale remote staffing and virtual assistant networks.",
      "E-commerce & Marketing": "Digital growth, Amazon support, and social media roles.",
      "BPO & Professional Services": "Voice and non-voice support, finance, and healthcare.",
      "Technology & Specialized": "Data annotation, IT support, and specialized technical roles.",
      "Job Boards & Resources": "Curated communities and job boards for remote Filipinos."
    };
    return map[category] || "Verified remote work platforms.";
  };
</script>

<div class="mb-12">
  <!-- Search Apex & Quick Actions -->
  <div class="flex flex-col lg:flex-row items-center gap-6 justify-between max-w-[90rem] mx-auto">
    
    <!-- Primary Search Bar -->
    <div class="relative group w-full lg:w-2/3">
      <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-ink/30 group-focus-within:text-accent transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input 
        type="text" 
        bind:value={query}
        placeholder="Search 200+ companies..."
        class="block w-full pl-20 pr-8 py-5 rounded-2xl border-2 border-transparent bg-white shadow-card text-ink placeholder-ink/30 focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/10 transition-all duration-300 text-2xl font-medium tracking-tight"
      />
      
      {#if query && filteredPlatforms.length > 0}
        <div class="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-accent/80 tracking-[0.1em] uppercase">
          {filteredPlatforms.length} Matches
        </div>
      {/if}
    </div>

    <!-- Quick Actions -->
    <div class="flex items-center gap-4 w-full lg:w-auto shrink-0 justify-center">
      <button class="flex flex-col items-center justify-center p-3 w-16 h-16 rounded-full bg-white shadow-card border border-ink/5 hover:border-accent hover:text-accent transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-ink/70 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      </button>
      <button class="flex flex-col items-center justify-center p-3 w-16 h-16 rounded-full bg-white shadow-card border border-ink/5 hover:border-accent hover:text-accent transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-ink/70 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </button>
      <button class="flex flex-col items-center justify-center px-6 py-3 h-16 rounded-[2rem] bg-gradient-to-r from-accent to-orange-500 text-white font-extrabold tracking-widest uppercase text-sm shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all whitespace-nowrap">
        Unlock VIP
      </button>
    </div>
  </div>
</div>

{#if filteredPlatforms.length === 0}
  <div class="text-center py-32">
    <h3 class="text-3xl font-semibold tracking-tight text-ink/60">No platforms found for "<span class="text-ink">{query}</span>"</h3>
    <p class="text-ink/40 mt-4 text-xl">Try adjusting your filters or search terms.</p>
  </div>
{:else}
  <!-- The Masonry / Columns Grid -->
  <div class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 w-full">
    {#each categoryOrder as category}
      {#if groupedPlatforms[category] && groupedPlatforms[category].length > 0}
        {@const categorySites = groupedPlatforms[category]}
        {@const visibleSites = !!query ? categorySites : categorySites.slice(0, 15)}
        
        <article class="break-inside-avoid bg-white rounded-3xl p-6 shadow-sm border border-ink/10 hover:shadow-md transition-shadow">
          <!-- Category Header -->
          <a href="/category/{slugify(category)}" class="block text-center mb-4 group focus:outline-none">
            <h2 class="text-xl font-extrabold text-ink tracking-tight uppercase group-hover:text-accent transition-colors duration-200">
              {category}
            </h2>
            <p class="text-[0.65rem] text-ink/50 font-semibold tracking-[0.1em] mt-1 px-4 leading-relaxed uppercase group-hover:opacity-80 transition-opacity">
              {getSubheadline(category)}
            </p>
          </a>
          
          <hr class="border-ink/10 my-4" />

          <!-- High Density Numbered List -->
          <ol class="list-decimal list-inside space-y-1 text-sm font-semibold tracking-tight text-ink/40 marker:text-ink/30 marker:font-bold">
            {#each visibleSites as platform, index (platform.id)}
              <li class="relative overflow-hidden group/item">
                <!-- Wrapper for the row content to align properly next to the number -->
                <span class="inline-flex items-center gap-2 pl-2 flex-1 w-[85%] align-middle pt-1 pb-1">
                  <!-- Favicon -->
                  <img src={getFavicon(platform.url)} alt="" class="w-4 h-4 rounded-sm" loading="lazy" />
                  
                  <!-- Clickable Action Area -->
                  <a 
                    href={platform.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="text-ink hover:text-accent font-bold flex items-center gap-2 flex-1 min-w-0"
                  >
                    <!-- Invisible stretched link over the container -->
                    <span class="absolute inset-0 z-10"></span>
                    
                    <span class="truncate block max-w-[60%] shrink-0">{platform.name}</span>

                    <!-- Tags / Pills inline -->
                    {#if platform.tags.length > 0}
                      <div class="flex gap-1 overflow-hidden pointer-events-none relative z-20">
                        {#each platform.tags.slice(0, 2) as tag}
                          <span class="inline-flex whitespace-nowrap px-1.5 py-0.5 rounded text-[9px] font-extrabold tracking-wider border border-ink/10 uppercase {tag.includes('Exp') || tag.includes('Global') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-parchment text-ink/60'}">
                            {tag}
                          </span>
                        {/each}
                      </div>
                    {/if}
                  </a>
                </span>
              </li>
            {/each}
          </ol>

          <!-- The Dedicated Page Route Button -->
          {#if !query && categorySites.length > 15}
            <a 
              href="/category/{slugify(category)}"
              class="mt-6 w-full py-3 bg-gradient-to-b from-parchment/30 to-ink/5 rounded-xl border border-ink/10 text-xs font-bold tracking-[0.15em] text-ink/60 uppercase hover:text-ink hover:border-ink/30 transition-all flex items-center justify-center gap-2"
            >
              SEE ALL {categorySites.length} SITES
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          {/if}
        </article>
      {/if}
    {/each}
  </div>
{/if}
